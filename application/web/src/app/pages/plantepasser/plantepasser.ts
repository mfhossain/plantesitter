import { Component } from '@angular/core';
import { PlantepasserHero } from './sections/plantepasser-hero/plantepasser-hero';
import { PlantepasserBenefits } from './sections/plantepasser-benefits/plantepasser-benefits';
import { PlantepasserSteps } from './sections/plantepasser-steps/plantepasser-steps';
import { PlantepasserFeatures } from './sections/plantepasser-features/plantepasser-features';
import { PlantepasserCta } from './sections/plantepasser-cta/plantepasser-cta';

@Component({
  selector: 'app-plantepasser',
  standalone: true,
  imports: [
    PlantepasserHero,
    PlantepasserBenefits,
    PlantepasserSteps,
    PlantepasserFeatures,
    PlantepasserCta
  ],
  templateUrl: './plantepasser.html',
  styleUrls: ['./plantepasser.scss']
})
export class Plantepasser { }
