import { LoadingService } from './shared/services/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLoading = false;

  constructor(public loadingService: LoadingService) {
    this.loadingService.getIsLoading().subscribe((x) => {
      this.showLoading = x;
    });
  }
}
