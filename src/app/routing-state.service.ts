import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

@Injectable()
export class RoutingStateService {
  public history = [];

  constructor(
    private router: Router
  ) {
  }

  loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        // console.log(urlAfterRedirects);
        // console.log(urlAfterRedirects.split('/'));
        this.history = urlAfterRedirects.split('/');
      });
  }

  getHistory(): string[] {
    return this.history;
  }

  getPreviousUrl(): string {
    // console.log(this.history);
    const previousIndex = this.history.length - 2;
    const previousRoute = this.history.filter((index, item) => index > 0 && index <= previousIndex)
      .map(item => `/${item}`).join('');
    return previousRoute || '/app';
  }
}
