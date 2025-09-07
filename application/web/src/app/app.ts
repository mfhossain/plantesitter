import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { CookieConsentBanner } from './shared/cookie-consent-banner/cookie-consent-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CookieConsentBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('plantesitter');
}
