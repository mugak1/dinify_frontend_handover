import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogService } from 'src/app/_common/confirm-dialog.service';
import { OrderedItem, OrdersListItem } from 'src/app/_models/app.models';
import { ApiService } from 'src/app/_services/api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MessageService } from 'src/app/_services/message.service';
import { DinerAppModule } from 'src/app/diner-app/diner-app.module';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
restaurant?: any;
order_statuses=['pending','preparing','cancelled']
list?:OrdersListItem[]=[];
order?:OrdersListItem;
current_order_status:string='';
showModal=false;
PaymentForm!:FormGroup;
view_menu:boolean=false;
edit_menu=false;
tabs=['active','closed','all']
active_tab=this.tabs[0];
require_otp=false;
data='';
is_saving=false;
  /**
   *
   */
  constructor(private auth:AuthenticationService, private api:ApiService,private route:ActivatedRoute, private dialog:ConfirmDialogService, private fb:FormBuilder, private message:MessageService) {
   
    if(auth.currentRestaurantRole?.restaurant_id){
      this.restaurant=auth.currentRestaurantRole?.restaurant_id;
      this.current_order_status=this.order_statuses[0]
      this.loadOrders(this.restaurant)
    }else  if(this.route.parent?.snapshot.params['id']){
      this.restaurant=this.route.parent?.snapshot.params['id'];
      this.current_order_status=this.order_statuses[0]
      this.loadOrders(this.restaurant)
    }
    
  }
  SetTab(ac:number){
    this.active_tab=this.tabs[ac];
    this.api.get<any>(null,'restaurant-setup/orders/',{restaurant:this.restaurant,status:this.active_tab}).subscribe((x)=>{
      this.list=[];
      this.order=null as any;
      this.list=x?.data?.records as OrdersListItem[];
      if(this.list?.length>0){
       
         this.order=this.list[0];
       
       
      }
      
   //this.menu_item=x?.data?.records[0];
       
     })
  }
  loadOrders(restaurant:string,selected_id?:boolean){  
    this.api.get<any>(null,'restaurant-setup/orders/',{restaurant:this.restaurant}).subscribe((x)=>{
     this.list=x?.data?.records as OrdersListItem[];
     if(this.list?.length>0){
      if(selected_id){
        this.order= this.list.find(o=>o.id==this.order?.id)
      }else{
        this.order=this.list[0];
      }
      
     }
     
  //this.menu_item=x?.data?.records[0];
      
    })

 }
 ViewMenu(){
  this.view_menu=true;
  this.showModal=true;  
 }
 CLoseMenu(){
  this.view_menu=false;
  this.edit_menu=true;
  this.PaymentForm!=null;
 }
 EditMenu(){
  this.edit_menu=true;
  this.showModal=true;
 }
 changeStatus(status:string,id?:any){
 let ref = this.dialog.openModal({
    title:'Track Order',
    message:'Are you sure you want to set Order #'+this.order?.order_number+' to <strong>'+status.toUpperCase()+'</strong> ?',
    
  }).subscribe((x:any)=>{
   
    if(x?.action=='yes'){     console.log("modal sub",x); 
  /*     if(this.order?.items?.length as number>1){

      }else{ */
/**/          this.api.postPatch('orders/update-item/',{item_id:id?id:this.order?.items[0].id,status:status},'put').subscribe({
          next: ()=>{
      this.loadOrders(this.restaurant);
      this.dialog.closeModal();
      ref.unsubscribe();
          }
        }); 
         
          //console.log(x)
        } 
      //}
  })


 }
 AcceptOrder(id?:any){
  let ref = this.dialog.openModal({
     title:'Accept Order',
     message:'Are you sure you want to <strong>ACCEPT</strong> Order No.'+this.order?.order_number+' ?',
   })?.subscribe((x:any)=>{
     console.log("modal sub",x);
     if(x?.action=='yes'){     
 /**/          this.api.postPatch('orders/prepare/',{order:id},'put').subscribe({
           next: ()=>{
       this.loadOrders(this.restaurant);
       
       this.dialog.closeModal();
       ref.unsubscribe();
           }
         }); 
          
           //console.log(x)
         } 
     
   })
   
 
  }
 closeModal(){
  this.showModal=false;
  this.view_menu=false;
  this.PaymentForm!=null;
  this.edit_menu=false;
}
InitiateManualPayment(id:any){
  this.PaymentForm= this.InitPaymentForm(id);
  this.showModal=true;
}
InitPaymentForm(id:any){
  return this.fb.group({
    
      order: id,
      payment_mode: ["momo"],
      platform: "web",
      payment_form: "full",
      msisdn: [''],
      amount: [],
      manual_payment:[true],
      otp:[''],
      manual_payment_details:this.fb.group({
        telecom:[''],
        transaction_id:['']
      })
  })
}
Save(){
  this.is_saving=true;
  if(!this.require_otp&&this.data==''){
    this.sendOtp("msisdn",this.auth.userValue?.profile.phone_number,null);
  }else{
this.PaymentForm.get('otp')?.setValue(this.data)
  this.api.postPatch('finances/initiate-order-payment/',this.PaymentForm.value,'post').subscribe((x:any)=>{
        this.message.add(x?.message);
        this.showModal=false;
    /*   let res=x?.data;
      if(x.status==200){
       window.location.href=res.redirect_url; 
      } */
     // 
    console.log(x);
    })
  }
} 
SaveNewItem(item:any){
  let ref = this.dialog.openModal({
    title:'Order Change',
    message:'Are you sure you want to <strong>Add</strong> '+item?.itemName+' to order '+this.order?.order_number +' ?',
  })?.subscribe((x:any)=>{
    if(x?.action=='yes'){
      this.api.postPatch('orders/add-items/',{order:this.order?.id,items:[item]},'post','',{},false,'v2').subscribe({
        next: ()=>{
    this.loadOrders(this.restaurant,true);
    
    this.dialog.closeModal();
    ref.unsubscribe();
    this.CLoseMenu();
    
        }
      });
      //this.dialog.closeModal();
    }
    if(x?.action=='no'){
      console.log(x);
      this.dialog.closeModal();
      ref.unsubscribe();
    }
  })
}
isToday(date_:any){
  // Get today's date
  const today = new Date();
  let dateToCheck= new Date(date_);

  // Compare the components of the dateToCheck with today's date
  const isSameDate =
      dateToCheck.getDate() === today.getDate() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getFullYear() === today.getFullYear();

  // Return true if the dateToCheck is today, otherwise return false
  return isSameDate;
};
DeleteItem(item:OrderedItem){
  let ref = this.dialog.openModal({
    title:'Delete',
    has_reason:true,
    submitButtonText:'Delete',
    cancelButtonText:'Cancel',
    message:'Are you sure you want to <strong>Delete</strong> '+item?.item.name+' from Order #'+this.order?.order_number +'? <br> Please the reason for deleteing is required',
  })?.subscribe((x:any)=>{
    if(x?.action=='yes'){
      this.api.Delete('orders/add-items/',{item:item.id,reason:x?.reason},'v2').subscribe({
        next: ()=>{
    this.loadOrders(this.restaurant,true);
    
    this.dialog.closeModal();
    ref.unsubscribe();
        }
      });
      //this.dialog.closeModal();
    }
    if(x?.action=='no'){
      console.log(x);
      this.dialog.closeModal();
      ref.unsubscribe();
    }

    
  });


}
ChangeOrder(o:any){
  let ord=o.value;
  console.log(ord)
  switch(ord){
  case 'n-o':{
this.list=this.list?.sort((a:OrdersListItem,b:OrdersListItem)=>{ return +new Date(a.time_created)- +new Date(b.time_created);})
    break;
  }
  case 'o-n':{
    this.list=this.list?.sort((a:OrdersListItem,b:OrdersListItem)=>{ return +new Date(b.time_created)- +new Date(a.time_created);})
        break;
      }
      case 't-a':{
        this.list=this.list?.sort((a:OrdersListItem,b:OrdersListItem)=>{ return a.table_details.table_number-b.table_details.table_number})
            break;
          } 
          case 't-d':{
            this.list=this.list?.sort((a:OrdersListItem,b:OrdersListItem)=>{ return b.table_details.table_number-a.table_details.table_number;})
                break;
              }
  default:{
break;
  }
}
}
sendOtp(identification:any,identifier:any,purpose:any){
  this.api.postPatch('users/auth/resend-otp/',{"identification": identification, "identifier": identifier,"purpose": purpose},'post').subscribe(x=>{
    this.require_otp=true 
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    //  localStorage.setItem('user', JSON.stringify((response.data)));
    //  this.userSubject.next(response.data as any)
     
  });
}

}


