export class CreateProductDto {
  readonly ref: string;
  readonly name: string;
  readonly description: string;
  cost: number;
  count: number;
  readonly date: string;
  img?: string = null;
}
