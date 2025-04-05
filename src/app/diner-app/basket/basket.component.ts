import { Location } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/_common/confirm-dialog.service';
import { BasketItem, Item, OrderInitiated, SelectedOption, ShoppingBasket, TableListItem, TableScan } from 'src/app/_models/app.models';
import { ApiService } from 'src/app/_services/api.service';
import { BasketService } from 'src/app/_services/basket.service';
import { LocalStorageService } from 'src/app/_services/storage/local-storage.service';
import { SessionStorageService } from 'src/app/_services/storage/session-storage.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  basket_items: BasketItem[] = [];
  totalAmount: number;
  basketItems: BasketItem[];
  table?: TableScan|any;
  order_initiated?: OrderInitiated;
  order_remarks = '';

  constructor(
    private sessionStorage: SessionStorageService,
    private basketService: BasketService,
    public loc: Location,
    private api: ApiService,
    private dialog: ConfirmDialogService,
    private router: Router
  ) {
    // Initialize basket from session storage
    this.basket_items = this.sessionStorage.getItem<BasketItem[]>('Basket') || [];
    this.basketService.Basket = signal<ShoppingBasket>({
      items: this.basket_items,
      totalAmount: this.basketService.calculateTotalAmount(this.basket_items),
    });
    this.basketItems = this.basketService.Basket().items;
    this.totalAmount = this.basketService.Basket().totalAmount;
    this.table = this.sessionStorage.getItem<TableScan>('Table');
  }

  // Adds an item to the basket
  addItem(item: BasketItem) {
    this.basketService.addItem({
      itemId: item.itemId,
      itemName: item.itemName,
      basePrice: item.basePrice,
      totalPrice: item.totalPrice,
      quantity: 1,
      options: item.options,
    });
    this.updateCart();
  }

  // Removes an item from the basket
  removeItem(itemId: string, options: SelectedOption[] = []) {
    this.basketService.removeItem(itemId, options);
    this.updateCart();
    if (this.basketItems.length === 0) {
      this.loc.back(); // Navigate back if the basket is empty
    }
  }

  // Updates basketItems and totalAmount after adding/removing items
  updateCart() {
    this.basketItems = this.basketService.Basket().items;
    this.totalAmount = this.basketService.Basket().totalAmount;
  }

  // Initiates an order
  initiateOrder() {
    let ref = this.dialog.openModal({
      title: 'Confirm Order',
      message: 'Are you sure you want to place this order?',
    }).subscribe((response: any) => {
      if (response?.action === 'yes') {
        const orderPayload = {
          restaurant: this.table?.restaurant.id,
          table: this.table?.id,
          items: this.basketItems.map((item) => ({
            item: item.itemId,
            quantity: item.quantity,
            options: item.options.map((opt) => ({
              optionName: opt.optionName,
              choice: opt.choice,
              cost: opt.cost,
            })),
          })),
          order_remarks: this.order_remarks,
        };

        // API call to initiate the order
        this.api.postPatch('orders/initiate/', orderPayload, 'post').subscribe(
          (response: any) => {
            if (response.status === 200) {
              this.order_initiated = response.data;
              if (this.order_initiated?.order_details.no_unavailable_items === 0) {
                this.submitOrder(); // Automatically submit if no unavailable items
              }
            } else {
              alert(response.message);
            }
          },
          (error) => {
            console.error(error);
            alert(error.message);
          }
        );
      }
    });
  }

  // Submits the order to the server
  submitOrder() {
    const payload = {
      order: this.order_initiated?.order_details.id,
    };

    this.api.postPatch('orders/submit/', payload, 'put').subscribe(
      (response: any) => {
        this.dialog.closeModal();
        this.router.navigate(['/diner', 'order-complete']); // Navigate to the order-complete page
        console.log(response);
      },
      (error) => {
        console.error(error);
        this.dialog.closeModal();
        alert(error.message);
      }
    );
  }
  showItemTotal(item: BasketItem) {
   return item.options.some(option => option.cost > 0)
   }
}
