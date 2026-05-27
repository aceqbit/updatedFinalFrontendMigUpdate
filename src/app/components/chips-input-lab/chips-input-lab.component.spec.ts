import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ChipsInputLabComponent } from './chips-input-lab.component';

describe('ChipsInputLabComponent', () => {
  let component: ChipsInputLabComponent;
  let fixture: ComponentFixture<ChipsInputLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipsInputLabComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsInputLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});