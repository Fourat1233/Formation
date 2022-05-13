import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomValidators } from '../core/providers/CustomValidators';
import { ApiService } from '../core/service/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    username: new FormControl('test', [ Validators.required, Validators.minLength(4)]),
    email: new FormControl('test' ,[ Validators.required, Validators.email]),
    password: new FormControl('',[ Validators.required]),
    role: new FormControl([],[ Validators.required])
 }
  );
  Roles: any = ["admin","mod","user"];
  constructor(private apiService : ApiService, private router: Router,   private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.signUpForm.valueChanges.subscribe(x => {
      console.log('form value changed')
      console.log(x)
  })
   
  }


  submitRegister (){
    // console.log("submiting user ",this.signUpForm.value);
    
     this.apiService.register(this.signUpForm.value).subscribe((res)=>{
    
      this.snackBar.open(' signup successful');
      this.apiService.sendCredential(this.signUpForm.value.username, this.signUpForm.value.password).subscribe(
        data => {
         // this.token.saveToken(data.token);
          localStorage.setItem('account', JSON.stringify(data));
          localStorage.setItem('token', data.accessToken);
          this.snackBar.open('Connected Sucessfully ');
            this.apiService.setLoggedin();
            this.router.navigate(['/formateurs']);
        },
        error => {
          console.log(error);
          this.snackBar.open('Failed to connect');
        },

      );
      },
      error => {
        console.log(error);
        this.snackBar.open('Failed to signup');
      },
     );
    

  }


  
}
