import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  preLoader: boolean;

  constructor(private route: ActivatedRoute) {
    this.preLoader = true;
    this.fetchData().then(() => {
      this.preLoader = false;
    });
  }

  private fetchData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}
