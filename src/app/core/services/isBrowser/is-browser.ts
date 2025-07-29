import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IsBrowser {
  private readonly iD = inject(PLATFORM_ID);

  isBrowser(): boolean {
    if (isPlatformBrowser(this.iD)) {
      return true;
    } else {
      return false;
    }
  }
}
