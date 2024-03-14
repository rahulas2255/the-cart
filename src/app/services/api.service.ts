import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchTerm = new BehaviorSubject("")
  cartCount = new BehaviorSubject(0)
  wishlistCount = new BehaviorSubject(0)
  SERVER_URL = "https://the-cart-server.onrender.com"

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
  }
  getAllProductsAPI(){
    return this.http.get(`${this.SERVER_URL}/all-products`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }
  viewProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/view-product/${id}`)
  }

  appendTokenToHeader(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return {headers}
  }

  addtowishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-wishlist`,product,this.appendTokenToHeader())
  }
  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/get-wishlist`,this.appendTokenToHeader())
  }
  getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }
  removeWishlistItem(id:any){
    return this.http.delete(`${this.SERVER_URL}/wishlist-remove/${id}`,this.appendTokenToHeader())
  }
  addToCartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-cart`,product,this.appendTokenToHeader())
  }
  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/get-cart`,this.appendTokenToHeader())

  }

  getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }
  // remove cart
  removeCartItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/remove-cart/${id}`,this.appendTokenToHeader())

  }
  // increment item
  incrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-increment/${id}`,this.appendTokenToHeader())
  }
  // decrement item
  decrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-decrement/${id}`,this.appendTokenToHeader())
  }
  // emptyCart
  emptyCartAPI(){
    return this.http.delete(`${this.SERVER_URL}/empty-cart`,this.appendTokenToHeader())
  }
  isLoggedin(){
    return !!sessionStorage.getItem("token")
  }
}
