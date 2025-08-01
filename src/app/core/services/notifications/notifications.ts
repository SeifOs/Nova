import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  private readonly toastrService = inject(ToastrService);

  showSuccess(msg: string, title: string) {
    this.toastrService.success(msg, title, {
      progressBar: true,
    });
  }

  showError(msg: string, title: string) {
    this.toastrService.error(msg, title, {
      progressBar: true,
    });
  }
}
