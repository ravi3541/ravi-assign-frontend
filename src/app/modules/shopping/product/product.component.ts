import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService } from '../services/shopping.service';
import { product } from '../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product_id: number;
  product_details: product = new product();
  qty: number = 1;
  desc: string[];
  success: any;
  transaction_subscription: Subscription;
  product_subscription:Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _shopping: ShoppingService,
    private _router: Router
  ) {}

  ngOnInit(): void {

    this.success = 'false';
    this.transaction_subscription = this._route.queryParams.subscribe((params) => {
      this.success = params['success'];
      if (this.success === 'true') {
        document.getElementById('successButton').click();
        this._router.navigate(['shopping/product/1']);
      }
    });


    this.product_subscription = this._route.params.subscribe((data) => {
      this.product_id = Number(data['pid']);
    });

    this._shopping.retrieveProduct(this.product_id).subscribe((result) => {
      this.product_details = result.data;

      this.product_details.description = String(result.data.description).split('\r\n'); //split up
    });
  }

  ngOnDestroy() {
    if(this.product_subscription) this.product_subscription.unsubscribe()

    if(this.transaction_subscription) this.transaction_subscription.unsubscribe()
  }

  increaseQty() {
    this.qty++;
    if (this.qty > 3) {
      this.qty = 3;
    }
  }

  decreaseQty() {
    if (this.qty > 1) {
      this.qty--;
    }
  }

 
}
