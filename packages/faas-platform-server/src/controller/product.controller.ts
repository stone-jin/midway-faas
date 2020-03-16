import Router from 'koa-router';
import fs from 'fs';
import cp from 'child_process';
import { ProductService } from '../service/product.service';
import { fail, success } from '../common/AjaxResult';

const productRoute = new Router({ prefix: '/api/product' });

productRoute.get('/list', async (ctx, next) => {
  ctx.body = {
    code: 200,
    data: ProductService.getInstance().getProductList()
  };
});

productRoute.post('/create', async (ctx, next) => {
  const { appName, name, description, path: filePath } = ctx.request.body;
  ctx.body = await new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
    const result = fs.readdirSync(filePath);
    if (result.length > 0) {
      return resolve({
        code: 500,
        data: 'fail'
      });
    }
    cp.exec(`f create --path ${filePath} --template faas-standard`, (error, stdout) => {
      console.log('====f create');
      if (error) {
        return resolve({
          code: 500,
          data: 'fail'
        });
      }
      ProductService.getInstance().addProduct({
        name,
        appName,
        description,
        path: filePath
      });
      resolve({
        code: 200,
        data: 'success'
      });
    });
  });
});

productRoute.post('/deploy', async (ctx, next) => {
  const { filePath } = ctx.request.body;
  ctx.body = await new Promise((resolve, reject) => {
    cp.exec(`cd ${filePath} && f deploy`, (error, stdout) => {
      if (error) {
        resolve(fail('error', 'error'));
      } else {
        resolve(success(stdout));
      }
    });
  });
});

export { productRoute };
