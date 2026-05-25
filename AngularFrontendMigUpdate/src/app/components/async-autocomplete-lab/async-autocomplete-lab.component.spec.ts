import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncAutocompleteLabComponent } from './async-autocomplete-lab.component';

describe('AsyncAutocompleteLabComponent', () => {
  let component: AsyncAutocompleteLabComponent;
  let fixture: ComponentFixture<AsyncAutocompleteLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncAutocompleteLabComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncAutocompleteLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});