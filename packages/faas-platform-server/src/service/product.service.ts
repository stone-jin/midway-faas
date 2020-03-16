import fs from 'fs';
import path from 'path';
import os from 'os';

export class ProductService {
  static instance: ProductService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductService();
    }
    return this.instance;
  }

  fileName = 'product.json';

  filePath = () => {
    return path.join(os.homedir(), '.midway-faas', this.fileName);
  }

  getProductList = () => {
    const result = JSON.parse(fs.readFileSync(this.filePath()).toString()).product;
    return result;
  }

  addProduct = (item: any) => {
    const result = this.getProductList();
    result.product.push(item);
    fs.writeFileSync(this.filePath(), JSON.stringify(result));
  }
}
