import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../../_services/authentication.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-telephone-input';
import { ApiResponse, LoginResponse, OTPResponse } from 'src/app/_models/app.models';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  countdown = 30; // Countdown starts at 30 seconds
  timer: any;
  loginForm!: FormGroup;
  @ViewChild("inputPTO") inputPTO?: NgModel;
  loading = false;
  submitted = false;
  error = '';
  data = '';
  require_otp=false;
  @Input() as_diner:boolean=false;
  @Output() LoginResp= new EventEmitter<any>();

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
 // TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  number_format = PhoneNumberFormat.National
  preferredCountries: CountryISO[] = [
    CountryISO.Uganda,
    CountryISO.Kenya
  ];
  log_in!: LoginResponse;
  fieldTextType: boolean=false;

  isSubmittingOtp=false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private message:MessageService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.userValue&&!this.as_diner) {
         // this.router.navigate(['/']);
      } 
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.authenticationService.resetStorage();
      this.submitted = true;
this.loading=true;
this.isSubmittingOtp=(this.data)?true:false;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
        this.loading=false;
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f['username'].value, this.f['password'].value,this.as_diner?'diner':null)
          .pipe(first())
          .subscribe({
              next: (val:ApiResponse<LoginResponse>) => {
                this.loading = false;
                this.log_in= val.data as unknown as LoginResponse
                if(!this.as_diner){
               if(this.log_in.prompt_password_change){
              //  this.router.navigate(['/auth/change-password']);

                this.router.navigate(["lock-otp-exp", this.f['username'].value, btoa(this.f['password'].value),`${this.log_in.profile.first_name} ${this.log_in.profile.last_name}`])
               }else  if (this.log_in.require_otp){
this.require_otp=true;
this.startCountdown();

                }else{
                if(this.log_in.profile.restaurant_roles.length==1){
this.authenticationService.setCurrentRestaurantRole(this.log_in.profile.restaurant_roles[0]);
                   // get return url from query parameters or default to home page
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/rest-app'/* +log_in.profile.restaurant_roles[0].restaurant_id */;
                  this.router.navigateByUrl(returnUrl);  
                }else if(this.log_in.profile.roles.includes('dinify_admin')){

                    // get return url from query parameters or default to home page
                   const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/mgt-app';
                   this.router.navigateByUrl(returnUrl);  
                 }
                 this.isSubmittingOtp=false;
                }

              }
              if(this.as_diner){
                this.LoginResp.emit(true);
              }
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
                  
              }
          });
  }

  SubmitOTP(){
    this.isSubmittingOtp=(this.data)?true:false;
    this.authenticationService.setOtp(this.authenticationService.userValue?.profile.id,this.data).pipe(first()).subscribe({
        next:(val:ApiResponse<OTPResponse>)=>{
      //      console.log(val)
let log_otp=val.data as unknown as OTPResponse;
if(log_otp.valid){
let u = this.authenticationService.UpdateUser(log_otp);
if(u.profile.restaurant_roles.length==1){
    this.authenticationService.setCurrentRestaurantRole(u.profile.restaurant_roles[0]);
                       // get return url from query parameters or default to home page
                      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/rest-app'/* +log_in.profile.restaurant_roles[0].restaurant_id */;
                      this.router.navigateByUrl(returnUrl);  
                    }else if(u.profile.roles.includes('dinify_admin')){
    
                        // get return url from query parameters or default to home page
                       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/mgt-app';
                       this.router.navigateByUrl(returnUrl);  
                     }
                     this.isSubmittingOtp=false;
                    
}else{
  this.isSubmittingOtp=false;
    this.error='The OTP provided is invalid'
    this.message.add(this.error)
    this.authenticationService.logout();
    this.authenticationService.resetStorage();
    this.loginForm.reset();
    this.require_otp=false;
    
}
        },
        error: error => {
            this.error = error;
            alert(error)
        }
    })
  }
  onInputChange($event:any){

    this.loginForm.get('username')?.setValue(String($event.phoneNumber).replace('+','').replace(/\s/g, ""));
     }
     startCountdown(): void {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000); // Decrease the countdown every second
    }
    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType
  }
    resendOTP(): void {
      this.countdown = 30; // Reset the countdown
      this.startCountdown();
      this.authenticationService.resendOtp('id',this.log_in.profile.id).subscribe((x:any)=>{
        this.message.addMessage({message: x.message, severity: 'info', summary: 'Info'});
        setTimeout(() => {
          this.message.clear();
        }, 2000);
      })
      // You can add your OTP resend logic here (e.g., API call)
    }
}
