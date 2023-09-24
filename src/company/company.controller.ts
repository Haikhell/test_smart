import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Company } from '../models/company.model';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Post('/create')
  async createCompany(@Body() dataCompany: CreateCompanyDto): Promise<Company> {
    return this.companyService.createCompany(dataCompany);
  }
}
