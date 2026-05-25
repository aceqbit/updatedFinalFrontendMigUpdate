import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoCompleteComplexComponent } from './autocomplete-complex.component';

describe('AutoCompleteComplexComponent', () => {
  let component: AutoCompleteComplexComponent;
  let fixture: ComponentFixture<AutoCompleteComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCompleteComplexComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AutoCompleteComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
