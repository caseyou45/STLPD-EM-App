import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = false;

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  isLoadingValue() {
    return this.isLoading;
  }
}
