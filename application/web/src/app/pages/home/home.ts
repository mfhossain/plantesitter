import { Component } from '@angular/core';
import { HomeHero } from './sections/home-hero/home-hero';
import { HomeMobileJobs } from './sections/home-mobile-jobs/home-mobile-jobs';
import { HomeCta } from './sections/home-cta/home-cta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHero, HomeMobileJobs, HomeCta],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {}
