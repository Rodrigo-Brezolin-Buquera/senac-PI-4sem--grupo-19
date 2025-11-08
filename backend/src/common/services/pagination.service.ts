import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

export type PaginationParams = {
  take: number;
  skip: number;
  order: {
    [fieldName: string]: 'ASC' | 'DESC';
  };
};

@Injectable()
export class PaginationService {
  getPagination(data: PaginationDto): PaginationParams {
    const page = data.page || 1;
    const limit = data.limit || 10;
    const orders = data.order ? data.order.split(',') : [];
    const order = orders.reduce((acc, curr) => {
      const [column, direction] = curr.split(':');
      return { ...acc, [column]: direction };
    }, {});
    return {
      take: limit,
      skip: (page - 1) * limit,
      order,
    };
  }
}
