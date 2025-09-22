import { Component } from '@angular/core';
import { HomeCarousel } from './sections/home-carousel/home-carousel';
import { HomeFindPlantepasser } from './sections/home-find-plantepasser/home-find-plantepasser';
import { HomeTrygPasning } from './sections/home-tryg-pasning/home-tryg-pasning';
import { HomeFerieUdenBekymringer } from './sections/home-ferie-uden-bekymringer/home-ferie-uden-bekymringer';
import { HomeRedLiv } from './sections/home-red-liv/home-red-liv';
import { HomeMobileJobs } from './sections/home-mobile-jobs/home-mobile-jobs';
import { HomeCta } from './sections/home-cta/home-cta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeCarousel, 
    HomeFindPlantepasser, 
    HomeTrygPasning, 
    HomeFerieUdenBekymringer, 
    HomeRedLiv, 
    HomeMobileJobs, 
    HomeCta
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {}
