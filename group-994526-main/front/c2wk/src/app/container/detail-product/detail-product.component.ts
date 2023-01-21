import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/_interfaces/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit
 {
   @Input() productItem: IProduct = {
    id_product: 0,
    name: '',
    price: 0,
    description: '',
    image: '',
    CategoryId: 0,
    UserIdUser: 0,
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  };

  constructor(private activated: ActivatedRoute,
    private ProductService: ProductService) {

  }

  ngOnInit(): void {

       const product_id = +(this.activated.snapshot.paramMap.get('id') ?? 0);

     this.ProductService.getProduct(product_id).subscribe((data) => {
       this.productItem = data;
     });
  }
}
