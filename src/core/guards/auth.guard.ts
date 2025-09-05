import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toastservice.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountservice = inject(AccountService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  if (accountservice.currentUser()) { return true; }
  else { 
    toastService.error('You shall not pass!!!');
    router.navigateByUrl('/'); 
    return false;
  }
};


