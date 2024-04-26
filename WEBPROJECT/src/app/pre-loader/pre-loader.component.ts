import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pre-loader',
  templateUrl: './pre-loader.component.html',
  styleUrls: ['./pre-loader.component.css']
})
export class PreLoaderComponent {
  preloader: boolean;

  constructor(private route: ActivatedRoute) {
    this.preloader = true;
    this.fetchData().then(() => {
      this.preloader = false;
    });
  }

  private fetchData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}
