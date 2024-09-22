import { Component } from '@angular/core';
import { IProducts, IProductsAPIResponse } from '../../models/iproducts';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  msg: string= '';
  errorMsg: string = '';
  productList$!: Observable<IProductsAPIResponse>;
  productList:IProducts[] = []

  constructor(private productService: ProductsService){}
  ngOnInit(){
    this.productList$ =  this.productService.getAllProducts();
    this.productList$.subscribe((res)=> {
      if(res.status==="success"){
        this.errorMsg= '';
        this.msg = res.message;
        this.productList = res.data;
      }else{
        this.msg='';
        this.errorMsg = "No success message received from API";
      }
    },
    (error) => {
      this.msg='';
      console.error('error caught in component')
      this.errorMsg = error;
    })
  }
}
