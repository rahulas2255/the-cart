import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {


  allPrudcts:any = []

  constructor(private api:ApiService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this.api.getWishlistAPI().subscribe((res:any)=>{
      this.allPrudcts = res
      console.log(this.allPrudcts);
      this.api.getWishlistCount()
    })
  }
  removeItem(id:any){
    this.api.removeWishlistItem(id).subscribe((res:any)=>{
      this.getWishlist()
    })
  }
  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      // proceed to cart
      product.quantity = 1
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.success(res)
          this.api.getCartCount()
          this.removeItem(product._id)
        },
        error:(reason:any)=>{
          this.toaster.warning(reason.error)
        }
      })
    }else{
      this.toaster.info("Plesase Login!!")
    }
  }
}
