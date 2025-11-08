import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class IdDto {
  @IsNotEmpty({ message: 'O ID é obrigatório.' })
  @Transform(({ value }) => {
    const parsed = typeof value === 'string' ? parseInt(value, 10) : value;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isNaN(parsed) ? value : parsed;
  })
  @IsNumber({}, { message: 'O campo "id" deve ser um número válido.' })
  id: number;
}
