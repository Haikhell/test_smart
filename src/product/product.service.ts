import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Company, CompanyDocument, User } from 'src/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductEntity } from './entities/product';

@Injectable()
export class ProductService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  public async getProducts(user: User): Promise<any> {
    const key = this.configService.get('API_SECRET_KEY');
    const url = `${this.configService.get('API_URL')}/products`;

    const company = await this.companyModel.findById(user.company);

    const category = company.category;

    const res = await this.httpService.axiosRef.get(
      `${url}/${category}?offset=0`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    const needQuery = Math.ceil(res.data.total / 5);

    const arrayQuery = [];

    for (let i = 1; i < needQuery; i++) {
      arrayQuery.push(
        this.httpService.axiosRef.get(`${url}/${category}?offset=${i * 5}`, {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        }),
      );
    }

    const resultAllRequest = await Promise.all(arrayQuery);

    const arrayProducts = [];

    resultAllRequest.forEach((el) => arrayProducts.push(...el.data.products));

    return arrayProducts.map((el) => new ProductEntity(el, user.fee, category));
  }
}
