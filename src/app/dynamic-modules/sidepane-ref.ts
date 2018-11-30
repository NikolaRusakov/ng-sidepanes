import { Observable, Subject } from 'rxjs';

export class SidepaneRef {
  constructor() {
  }

  close(result?: any) {
    this._afterClosed.next(result);
  }

  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();
}
