import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { EmployeeListComponent } from "./pages/employee-list/employee-list.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { PageNotfoundComponent } from "./pages/page-notfound/page-notfound.component";
import { ProductDetailsComponent } from "./pages/product-details/product-details.component";
import { RegistrationFormComponent } from "./pages/forms/registration-form/registration-form.component";
import { LoginFormComponent } from "./pages/forms/login-form/login-form.component";
import { authGuard } from "./guards/auth.guard";
import { ForgotPasswordComponent } from "./pages/forms/forgot-password/forgot-password.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "employees",
    component: EmployeeListComponent,
    canActivate:[authGuard], data: {role: 'admin'}
  },
  {
    path: "products",
    component: ProductsComponent,
    canActivate:[authGuard],data: {role: 'user'}
  },
  {
    path: "products/:id",
    component: ProductDetailsComponent,
    canActivate:[authGuard],data: {role: 'user'}
  },
  {
    path: "contacts",
    component: ContactsComponent,
  },
  {
    path: "registration",
    component: RegistrationFormComponent,
    canActivate:[authGuard]
  },
  {
    path: "login",
    component: LoginFormComponent,
    canActivate:[authGuard]
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    canActivate:[authGuard]
  },
  {
    path: "**",
    component: PageNotfoundComponent,
  },
];
