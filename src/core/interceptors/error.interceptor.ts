import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toastservice.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError(error => { 
      if(error){
        switch (error.status) {
          case 400:
            
              if (error.error.errors) { 
                const modelStateErrors = [];
                for (const key in error.error.errors) { 
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key]);
                  }
                  
                }
                throw modelStateErrors.flat();
              }
             else {
              toast.error(error.error+ ' ' +error.status);
            }
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          case 401:
            toast.error('Unauthorized');
            break;
          default:
            toast.error('Something unexpected went wrong');
            break;
        }
      }
      throw error;
    })
  );
};
