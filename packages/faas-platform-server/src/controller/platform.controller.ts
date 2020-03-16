import Router from 'koa-router';
import fs from 'fs';
import yaml from 'yaml';
import os from 'os';
import path from 'path';
import { success, fail } from '../common/AjaxResult';

const platFormRoute = new Router({ prefix: '/api/platform' });

platFormRoute.get('/list', async (ctx, next) => {
  ctx.body = success([{ id: 'fake-list-0', owner: '付小小', title: '阿里云', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png', status: 'active', percent: 60, logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', href: 'https://ant.design', updatedAt: 1584365710686, createdAt: 1584365710686, subDescription: '那是一种内在的东西， 他们到达不了，也无法触及的', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', activeUser: 156010, newUser: 1806, star: 191, like: 119, message: 16, content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', members: [{ avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽', id: 'member1' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', name: '王昭君', id: 'member2' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', name: '董娜娜', id: 'member3' }] }, { id: 'fake-list-1', owner: '曲丽丽', title: '腾讯云', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png', status: 'exception', percent: 94, logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', href: 'https://ant.design', updatedAt: 1584358510686, createdAt: 1584358510686, subDescription: '希望是一个好东西，也许是最好的，好东西是不会消亡的', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', activeUser: 179276, newUser: 1067, star: 109, like: 163, message: 20, content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', members: [{ avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽', id: 'member1' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', name: '王昭君', id: 'member2' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', name: '董娜娜', id: 'member3' }] }, { id: 'fake-list-2', owner: '林东东', title: '淘宝小程序云', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', cover: 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png', status: 'normal', percent: 77, logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', href: 'https://ant.design', updatedAt: 1584351310686, createdAt: 1584351310686, subDescription: '生命就像一盒巧克力，结果往往出人意料', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', activeUser: 104027, newUser: 1962, star: 192, like: 191, message: 19, content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', members: [{ avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽', id: 'member1' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', name: '王昭君', id: 'member2' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', name: '董娜娜', id: 'member3' }] }, { id: 'fake-list-3', owner: '周星星', title: 'Ginkgo Fn云', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', cover: 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png', status: 'active', percent: 91, logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', href: 'https://ant.design', updatedAt: 1584344110686, createdAt: 1584344110686, subDescription: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', activeUser: 158334, newUser: 1848, star: 154, like: 102, message: 14, content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', members: [{ avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽', id: 'member1' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', name: '王昭君', id: 'member2' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', name: '董娜娜', id: 'member3' }] }, { id: 'fake-list-4', owner: '吴加好', title: 'Giaga云', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', cover: 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png', status: 'exception', percent: 88, logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', href: 'https://ant.design', updatedAt: 1584336910686, createdAt: 1584336910686, subDescription: '那时候我只会想自己想要什么，从不想自己拥有什么', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', activeUser: 178240, newUser: 1424, star: 125, like: 108, message: 14, content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', members: [{ avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽', id: 'member1' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', name: '王昭君', id: 'member2' }, { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', name: '董娜娜', id: 'member3' }] }]);
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
