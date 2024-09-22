import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService =  inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'] as string;
  const userRole = authService.getUserRole();
  let path = "";
  path = (route.routeConfig?.path)? route.routeConfig?.path:'';
  const validationPaths:string[] =['login','registration','forgot-password'];
  //authService.isUserLoggedIn() && userRole === requiredRole
  if (authService.isUserLoggedIn() && path){
    if(validationPaths.includes(path)){
      router.navigateByUrl('/home');
      return false;
    }
    return true;
  }else{
    if(validationPaths.includes(path)){
      return true;
    }
    router.navigateByUrl('/login');
    return false;
  }
};
