import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingService } from '../services/shopping.service';
import { product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product_id:number;
  prod:product = new product;
  qty:number=1;

  
  constructor(private _route:ActivatedRoute, private _shopping:ShoppingService) { }
  
  ngOnInit(): void {
    this._route.params.subscribe(data => {
      this.product_id = Number(data['pid'])
    })
    
    
    this._shopping.retrieveProduct(this.product_id).subscribe(result => {
      this.prod = result.data
      
      console.log("Result  = ",this.prod)  // this works
    })

  
  }


  increaseQty(){
    this.qty++;
    if (this.qty>3){
      this.qty=3
    }
  }

  decreaseQty(){
    if (this.qty>1){
    this.qty--;
    }
    
  }


  buyNow(){
    console.log()
    //this._shopping.buyNow(this.product_id, this.qty)
  }
}
