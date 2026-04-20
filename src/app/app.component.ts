import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from './_services/message.service';
import { ConfirmDialogService } from './_common/confirm-dialog.service';
import { ConfirmDialogComponent } from './_common/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements AfterViewInit {
  title = 'dinify_frontend';
  @ViewChild("modalcontent", { read: ViewContainerRef }) contentRef!: ViewContainerRef;
  constructor(public messageService: MessageService,private dialog:ConfirmDialogService,private _diagRouter: Router){
    console.log('[DIAG] Initial location:', {
      pathname: window.location.pathname,
      href: window.location.href,
      hash: window.location.hash,
    });
    this._diagRouter.events.subscribe(e => {
      console.log('[DIAG] Router:', e.constructor.name, JSON.stringify({
        url: (e as any).url,
        urlAfterRedirects: (e as any).urlAfterRedirects,
        reason: (e as any).reason,
        state: (e as any).state?.url,
        navigationTrigger: (e as any).navigationTrigger,
        code: (e as any).code,
      }, null, 0));
    });
  }

  ngAfterViewInit(){
    
      this.dialog.showModal?.subscribe(x=>{
      //  console.log(this.dialog?.data)
     // console.log("dialog service ",x)
      if(x){
       // console.log("dialog service ",x)
    
    const componentRef = this.contentRef.createComponent(ConfirmDialogComponent)
      componentRef.instance.data=this.dialog.data;
      this.contentRef.insert(componentRef.hostView);
    
      }else{
        this.contentRef?.clear();
      }
    }) 
  }

}
