import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SubService } from './shared/sub.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/home">Home</a> -
      <a routerLink="/do-not-do-this">Do Not Do This</a> -
      <a routerLink="/do-this-one">Do This One</a> -
      <a routerLink="/do-this-two">Do This Two</a> -
      <a routerLink="/do-this-three">Do This Three</a> -
      <a routerLink="/template-only">Template Only</a>
    </nav>

    <router-outlet />

    @if (subService.shouldLog()) {
      <p>
        Active subscriptions to dataStream$: {{ subService.activeSubscriptions() }}
      </p>
    }
  `,
  styles: [],
})
export class AppComponent {
  /**
   * In this component, this service is used to show the number of active subscriptions to the dataStream$.
   */
  readonly subService = inject(SubService);
}
