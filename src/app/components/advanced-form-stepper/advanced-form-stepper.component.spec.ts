import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdvancedFormStepperComponent } from './advanced-form-stepper.component';

describe('AdvancedFormStepperComponent', () => {
  let component: AdvancedFormStepperComponent;
  let fixture: ComponentFixture<AdvancedFormStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AdvancedFormStepperComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AdvancedFormStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
