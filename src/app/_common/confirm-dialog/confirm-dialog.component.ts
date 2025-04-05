import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ConfirmaDialogData } from 'src/app/_models/app.models';
import { ConfirmDialogService } from '../confirm-dialog.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  showModal=false;
  data:ConfirmaDialogData|null=null;
result!:string;
reason='';
has_reason?:boolean;

  constructor(private confirmService:ConfirmDialogService) {
    this.confirmService.showModal?.subscribe(x=>{
      if(x){
        this.data=this.confirmService.data;
        this.has_reason=this.confirmService.data?.has_reason
        this.data?.callback?.next(this.result);
        this.showModal=true;
      }else{
        this.showModal=false;
      }
    })
    
    
  }
  Cancel(){
    this.confirmService.closeModal();
    this.confirmService.resultSub.next({action:'no',reason:this.reason});
    console.log('no is clicked')
  }
  toggleModal() {
   console.log('yes is clicked')
    this.result='yes';
    this.confirmService.resultSub.next({action:'yes',reason:this.reason});
/* this.data?.callback?.next(this.result);

this.data?.callback?.subscribe(x=>{
  console.log(x) 
})*/
   // this.confirmService.closeModal()
}
ngAfterViewInit(){
this.confirmService.DialogRef=this;
}
Reject(){
  console.log('reject is clicked')
  this.result='reject';
    this.confirmService.resultSub.next({action:'reject',reason:this.reason});
}

}
