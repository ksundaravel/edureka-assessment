import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: any = '';

  constructor(private productService: ProductsService, private route: ActivatedRoute){}
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.productService.getProductsById(id).subscribe((res)=> {
        this.product = res;
        console.log(this.product);
      },
      (error) => {
        console.error('error caught in component:',error);
      })
    }
  }
}
