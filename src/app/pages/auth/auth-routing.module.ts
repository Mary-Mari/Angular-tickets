import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth.component";
import { RegistrationComponent } from "../registration/registration.component"; // Импортируем компонент регистрации


const routes: Routes = [
  { path: '', component: AuthComponent },
  { path:'registration', component: RegistrationComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
