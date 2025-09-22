import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface CarouselSlide {
  title: string;
  description: string;
  imageSrc: string;
}

@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-carousel.html',
  styleUrls: ['./home-carousel.scss']
})
export class HomeCarousel implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}
  slides: CarouselSlide[] = [
    {
      title: 'Bekymret for dine planter, mens du er på ferie?',
      description: '',
      imageSrc: 'assets/images/closeup-shot-tropical-plants-with-beautiful-sea.jpg'
    },
    {
      title: 'Har du brug for en pålidelig plantepasser i nærheden?',
      description: '',
      imageSrc: 'assets/images/woman-changing-pots-her-plants-home-quarantine.jpg'
    },
    {
      title: 'Vil du passe planter og tjene lidt ekstra?',
      description: '',
      imageSrc: 'assets/images/woman-taking-photograph-potted-plant-mobile-phone.jpg'
    }
  ];

  currentIndex = 0;
  private autoIntervalId: any;
  private readonly autoMs = 6000;
  private touchStartX: number | null = null;
  private touchDeltaX: number = 0;
  private readonly swipeThresholdPx = 50;

  ngOnInit(): void {
    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
  }

  goTo(index: number): void {
    if (index < 0) {
      index = this.slides.length - 1;
    }
    if (index >= this.slides.length) {
      index = 0;
    }
    this.currentIndex = index;
    this.cdr.detectChanges();
  }

  next(): void {
    this.goTo(this.currentIndex + 1);
  }

  prev(): void {
    this.goTo(this.currentIndex - 1);
  }

  private startAutoRotate(): void {
    this.stopAutoRotate();
    this.autoIntervalId = setInterval(() => this.next(), this.autoMs);
  }

  private stopAutoRotate(): void {
    if (this.autoIntervalId) {
      clearInterval(this.autoIntervalId);
      this.autoIntervalId = undefined;
    }
  }

  onTouchStart(evt: TouchEvent): void {
    this.stopAutoRotate();
    this.touchStartX = evt.touches[0]?.clientX ?? null;
    this.touchDeltaX = 0;
  }

  onTouchMove(evt: TouchEvent): void {
    if (this.touchStartX == null) return;
    const currentX = evt.touches[0]?.clientX ?? this.touchStartX;
    this.touchDeltaX = currentX - this.touchStartX;
  }

  onTouchEnd(_: TouchEvent): void {
    if (this.touchStartX == null) {
      this.startAutoRotate();
      return;
    }
    const delta = this.touchDeltaX;
    this.touchStartX = null;
    this.touchDeltaX = 0;
    if (Math.abs(delta) > this.swipeThresholdPx) {
      if (delta < 0) {
        this.next();
      } else {
        this.prev();
      }
    }
    this.startAutoRotate();
  }
}


