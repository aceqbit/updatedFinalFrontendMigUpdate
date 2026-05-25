import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsInputLabComponent } from './chips-input-lab.component';

describe('ChipsInputLabComponent', () => {
  let component: ChipsInputLabComponent;
  let fixture: ComponentFixture<ChipsInputLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsInputLabComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsInputLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});