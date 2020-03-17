import Router from 'koa-router';
import fs from 'fs';
import yaml from 'yaml';
import os from 'os';
import path from 'path';
import { success, fail } from '../common/AjaxResult';

const platFormRoute = new Router({ prefix: '/api/platform' });

platFormRoute.get('/list', async (ctx, next) => {
  ctx.body = success([
    { id: 'aliyun', title: '阿里云', logo: 'https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png', href: 'https://www.aliyun.com/', subDescription: '那是一种内在的东西， 他们到达不了，也无法触及的', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', activeUser: 156010, newUser: 1806, star: 191, like: 119, message: 16, content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。' },
    { id: 'tencent', title: '腾讯云', logo: 'https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/02b7b7658a17ffb46abe6f6bb8c01177_121_121.jpg', href: 'https://cloud.tencent.com/', message: 20, content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', subDescription: '那是一种内在的东西， 他们到达不了，也无法触及的', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。' }
  ]);
});

/**
 * @description: 获取平台的配置
 * @author: jinbing.jb@alibaba-inc.com
 */
platFormRoute.get('/config', async (ctx, next) => {
  const { platform } = ctx.query;
  switch (platform) {
    case 'aliyun': {
      const result = fs.readFileSync(path.join(os.homedir(), '.fcli/config.yaml')).toString();
      const jResult = yaml.parse(result);
      return ctx.body = success(jResult);
    }
  }
  ctx.body = fail({}, `there is no config with platform: ${platform}`);
});

/**
 * @description: 更新
 * @author: jinbing.jb@alibaba-inc.com
 */
platFormRoute.post('/config/update', async (ctx, next) => {
  const { platform, data } = ctx.request.body;
  if (!platform || !data) {
    return ctx.body = fail({}, 'invalid params.');
  }
  switch (platform) {
    case 'aliyun': {
      const yResult = yaml.stringify(data);
      fs.writeFileSync(path.join(os.homedir(), '.fcli/config.yaml'), yResult);
    }
  }
  ctx.body = success('success');
});

export { platFormRoute };
