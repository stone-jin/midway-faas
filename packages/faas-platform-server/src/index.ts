import koa from 'koa';
import cors from 'koa-cors';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { platFormRoute } from './controller/platform.controller';
import { productRoute } from './controller/product.controller';

const app = new koa();

app.use(cors());

app.use(bodyParser());

function initPath() {
  if (!fs.existsSync(path.join(os.homedir(), '.midway-faas'))) {
    fs.mkdirSync(path.join(os.homedir(), '.midway-faas'));
  }
  if (!fs.existsSync(path.join(os.homedir(), '.midway-faas', 'product.json'))) {
    fs.writeFileSync(path.join(os.homedir(), '.midway-faas', 'product.json'), JSON.stringify({
      product: []
    }));
  }
}

initPath();

app.use(platFormRoute.routes());

app.use(productRoute.routes());

app.listen(8002);
