import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const jwtAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  if (token) {
    const reqwithHeader = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      headers: req.headers.append('X-Authentication-Token',token)
    });
    return next(reqwithHeader);
  }else{
    return next(req);
  }
};
