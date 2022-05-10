import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';



import { ApiService } from './Service/api.service';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { LoginComponent } from './login/login.component';
import { HttpConfigInterceptor } from './core/interceptor/httpconfig.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { JwtHelperService, JwtModule, JwtModuleOptions, JWT_OPTIONS  } from '@auth0/angular-jwt';

const JWT_Module_Options: JwtModuleOptions = ({
  config: {
    tokenGetter: jwtTokenGetter
  }});


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    DialogBoxComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    JwtModule.forRoot(JWT_Module_Options),


  

  ],
  providers: [ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function jwtTokenGetter() {
  return  localStorage.getItem('token');
}

