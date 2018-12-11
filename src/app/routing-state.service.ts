import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class RoutingStateService {
  history = [];

  constructor() {
  }

  getPreviousUrl(): string {
    const previousIndex = this.history.length - 2;
    const previousRoute = this.history.filter((index, item) => index > 0 && index <= previousIndex)
      .map(item => `/${item}`).join('');
    return previousRoute || '/';
  }
}
