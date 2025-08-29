import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCta } from './home-cta';

describe('HomeCta', () => {
  let component: HomeCta;
  let fixture: ComponentFixture<HomeCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
