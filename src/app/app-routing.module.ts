import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { FormationComponent } from './formation/formation.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  { path: 'users', component: UsersComponent ,canActivate: [AuthGuardService],},
  { path: 'formations', component: FormationComponent ,canActivate: [AuthGuardService],},

  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
