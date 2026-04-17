import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComp } from './main-comp';

describe('MainComp', () => {
  let component: MainComp;
  let fixture: ComponentFixture<MainComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
