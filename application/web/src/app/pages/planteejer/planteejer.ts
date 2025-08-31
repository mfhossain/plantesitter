import { Component } from '@angular/core';
import { PlanteejerHero } from './sections/planteejer-hero/planteejer-hero';
import { PlanteejerBenefits } from './sections/planteejer-benefits/planteejer-benefits';
import { PlanteejerSteps } from './sections/planteejer-steps/planteejer-steps';
import { PlanteejerCta } from './sections/planteejer-cta/planteejer-cta';

@Component({
  selector: 'app-planteejer',
  standalone: true,
  imports: [
    PlanteejerHero,
    PlanteejerBenefits,
    PlanteejerSteps,
    PlanteejerCta
  ],
  templateUrl: './planteejer.html',
  styleUrls: ['./planteejer.scss']
})
export class Planteejer { }
