import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  desc:string[];
  success:any;

  
  constructor(private _route:ActivatedRoute, private _shopping:ShoppingService, private _router:Router) { }
  
  ngOnInit(): void {
    this.success='false'
    this._route.queryParams.subscribe(params =>{
      this.success =(params['success'])
      if(this.success==='true'){
        document.getElementById("successButton").click()
        this._router.navigate(['shopping/product/1'])
      }

    })


    this._route.params.subscribe(data => {
      this.product_id = Number(data['pid'])
      // this.success = String(data['success'])
      // console.log("SUccess  = ", data)
    })

    
    
    this._shopping.retrieveProduct(this.product_id).subscribe(result => {
      this.prod = result.data

      this.prod.description = String(result.data.description).split('\r\n') //split up
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
