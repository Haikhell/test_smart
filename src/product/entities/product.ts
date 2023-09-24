import { Exclude } from 'class-transformer';
import console from 'console';

export class ProductEntity {
  id: string;
  name: string;
  price: number;

  @Exclude()
  secret: string;

  constructor(
    partial: Partial<ProductEntity>,
    userPrice: number,
    userCompany: string,
  ) {
    console.log(partial);

    partial.price = partial.price + (partial.price / 100) * userPrice;

    const values = partial.name.split(' ');

    values[0] = userCompany;

    partial.name = values.join(' ');

    Object.assign(this, partial);
  }
}
