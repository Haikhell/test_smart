import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../models';
import { CreateCompanyDto } from './dto/createCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  public async createCompany({
    name,
    category,
  }: CreateCompanyDto): Promise<Company> {
    try {
      const company = await this.companyModel.create({
        name,
        category,
      });

      return company;
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }
}
