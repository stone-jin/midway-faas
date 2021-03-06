import {
  FCCustomDomainSpec,
  FCFunctionSpec,
  FCFunctionsStructure,
  FCFunctionStructure,
  FCSpec,
  HTTPEventType,
} from './interface';
import { SpecBuilder } from '../builder';
import {
  ProviderStructure,
  HTTPEvent,
  ScheduleEvent,
  LogEvent,
  OSEvent,
} from '../interface';

export class FCSpecBuilder extends SpecBuilder {
  toJSON() {
    const providerData: ProviderStructure = this.getProvider();
    const serviceData = this.getService();
    const functionsData: FCFunctionsStructure = this.getFunctions();
    const serviceName = serviceData.name;

    const template: FCSpec = {
      ROSTemplateFormatVersion: '2015-09-01',
      Transform: 'Aliyun::Serverless-2018-04-03',
      Resources: {
        [`${serviceName}`]: {
          Type: 'Aliyun::Serverless::Service',
          Properties: {
            Description: serviceData.description,
            Role: providerData.role,
          },
        },
      },
    };

    const httpEventRouters = {};

    for (const funName in functionsData) {
      const funSpec: FCFunctionStructure = functionsData[funName];
      const handler = funSpec.handler || 'index.handler';
      const functionTemplate: FCFunctionSpec = {
        Type: 'Aliyun::Serverless::Function',
        Properties: {
          Description: funSpec.description || '',
          Initializer:
            funSpec.initializer ||
            handler
              .split('.')
              .slice(0, -1)
              .join('.') + '.initializer',
          Handler: handler,
          Runtime: funSpec.runtime || providerData.runtime || 'nodejs8',
          CodeUri: funSpec.codeUri || '.',
          Timeout: funSpec.timeout || providerData.timeout || 30,
          InitializationTimeout: funSpec.initTimeout || 3,
          MemorySize: funSpec.memorySize || providerData.memorySize || 512,
        },
        Events: {},
      };

      for (const event of funSpec['events']) {
        if (event['http']) {
          const evt = event['http'] as HTTPEvent;
          functionTemplate.Events['http-' + funName] = {
            Type: 'HTTP',
            Properties: {
              AuthType: 'ANONYMOUS', // 先写死
              Methods: convertMethods(evt.method),
            },
          };

          httpEventRouters[evt.path] = {
            serviceName,
            functionName: funSpec.name || funName,
          };
        }

        if (event['schedule']) {
          const evt = event['schedule'] as ScheduleEvent;
          functionTemplate.Events['schedule'] = {
            Type: 'Timer',
            Properties: {
              CronExpression:
                evt.type === 'every' ? `@every ${evt.value}` : evt.value,
              Enable: true,
              Payload: evt.payload,
            },
          };
        }

        if (event['log']) {
          const evt = event['log'] as LogEvent;
          functionTemplate.Events['log'] = {
            Type: 'Log',
            Properties: {
              SourceConfig: {
                Logstore: evt.source,
              },
              JobConfig: {
                MaxRetryTime: evt.retryTime || 1,
                TriggerInterval: evt.interval || 30,
              },
              LogConfig: {
                Project: evt.project,
                Logstore: evt.log,
              },
              Enable: true,
              InvocationRole: evt.role,
              Qualifier: evt.version,
            },
          };
        }

        const osEvent = event['os'] || event['oss'] || event['cos'];

        if (osEvent) {
          const evt = osEvent as OSEvent;
          functionTemplate.Events['oss'] = {
            Type: 'OSS',
            Properties: {
              BucketName: evt.bucket,
              Events: [].concat(evt.events),
              Filter: {
                Key: {
                  Prefix: evt.filterPrefix,
                  Suffix: evt.filterSuffix,
                },
              },
              Enable: true,
              InvocationRole: evt.role,
              Qualifier: evt.version,
            },
          };
        }
      }

      template.Resources[serviceName][
        funSpec.name || funName
      ] = functionTemplate;
    }

    if (
      this.originData['custom'] &&
      this.originData['custom']['customDomain']
    ) {
      const domainInfo: {
        domainName: string;
        stage?: string;
      } = this.originData['custom']['customDomain'];
      template.Resources[domainInfo.domainName] = {
        Type: 'Aliyun::Serverless::CustomDomain',
        Properties: {
          Protocol: 'HTTP',
          RouteConfig: {
            routes: httpEventRouters,
          },
        },
      } as FCCustomDomainSpec;
    }

    return template;
  }
}

function convertMethods(methods: string | string[]): HTTPEventType[] {
  if (typeof methods === 'string') {
    if (methods === 'any') {
      return ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'];
    }

    methods = [methods];
  }

  return methods.map(method => {
    return method.toUpperCase();
  }) as HTTPEventType[];
}
