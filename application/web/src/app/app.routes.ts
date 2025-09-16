import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Planteejer } from './pages/planteejer/planteejer';
import { Plantepasser } from './pages/plantepasser/plantepasser';
import { Dev } from './pages/dev/dev';
import { Subscribe } from './pages/subscribe/subscribe';
import { CookiesPolicy } from './pages/cookies-policy/cookies-policy';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { TermsConditions } from './pages/terms-conditions/terms-conditions';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'planteejer', component: Planteejer },
  { path: 'plantepasser', component: Plantepasser },
  { path: 'dev', component: Dev },
  { path: 'subscribe', component: Subscribe },
  { path: 'cookies-policy', component: CookiesPolicy },
  { path: 'policy', component: PrivacyPolicy },
  { path: 'terms-conditions', component: TermsConditions },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];
