export interface IProducts {
  id: number,
  product_name: string,
  product_price: number,
  product_image: string
}

export interface IProductsAPIResponse {
  status: string;
  data: IProducts[],
  message: string
}
