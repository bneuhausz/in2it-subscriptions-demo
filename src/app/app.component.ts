import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/do-not-do-this">Do Not Do This</a>
      <a routerLink="/do-this-one">Do This One</a>
    </nav>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
}
