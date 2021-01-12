import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  public getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  public Open() {
    this.isLoading.next(true);
  }

  public Close() {
    this.isLoading.next(false);
  }
}
