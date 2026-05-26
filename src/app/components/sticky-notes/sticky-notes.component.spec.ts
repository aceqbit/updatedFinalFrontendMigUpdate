import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StickyNotesComponent } from './sticky-notes.component';

describe('StickyNotesComponent', () => {
  let component: StickyNotesComponent;
  let fixture: ComponentFixture<StickyNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickyNotesComponent],
      imports: [FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(StickyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
