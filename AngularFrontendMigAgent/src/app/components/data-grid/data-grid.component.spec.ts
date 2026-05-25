import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DataGridComponent } from './data-grid.component';

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGridComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should generate rows on init', () => {
    expect(component.rows.length).toBeGreaterThan(0);
  });

  it('should handle rapid filtering of 500+ rows without crashing', fakeAsync(() => {
    const filterInputs = ['User', '10', 'dept', 'admin', 'test', 'heavy'];
    filterInputs.forEach(input => {
      component.filterText = input;
      fixture.detectChanges();
      tick(100);
      const groups = component.getGroupKeys();
      expect(Array.isArray(groups)).toBeTrue();
    });
  }));

  it('should manage heavy selection state across large datasets', () => {
    component.rows.forEach((row, index) => {
      if (index % 2 === 0) component.toggleSelection(row.id);
    });
    expect(component.selectedRows.size).toBeGreaterThan(0);
  });
});
