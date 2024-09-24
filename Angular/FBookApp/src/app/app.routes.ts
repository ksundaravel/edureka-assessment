import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { PageNotfoundComponent } from "./pages/page-notfound/page-notfound.component";
import { ProductDetailsComponent } from "./pages/product-details/product-details.component";
import { RegistrationFormComponent } from "./pages/forms/registration-form/registration-form.component";
import { LoginFormComponent } from "./pages/forms/login-form/login-form.component";
import { authGuard } from "./guards/auth.guard";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { UsersComponent } from "./pages/users/users.component";
import { MyProfileComponent } from "./pages/my-profile/my-profile.component";
import { NetworkComponent } from "./pages/network/network.component";
import { FriendsComponent } from "./pages/friends/friends.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate:[authGuard], data: {role: ['admin','user']}
  },
  {
    path: "users",
    component: UsersComponent,
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
    path: "my-profile",
    component: MyProfileComponent,
    canActivate:[authGuard], data: {role: ['admin','user']}
  },
  {
    path: "network",
    component: NetworkComponent,
    canActivate:[authGuard], data: {role: ['user']}
  },
  {
    path: "friends",
    component: FriendsComponent,
    canActivate:[authGuard], data: {role: ['user']}
  },
  {
    path: "**",
    component: PageNotfoundComponent,
  },
];
