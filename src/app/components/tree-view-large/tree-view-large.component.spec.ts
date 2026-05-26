import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeViewLargeComponent } from './tree-view-large.component';

describe('TreeViewLargeComponent', () => {
  let component: TreeViewLargeComponent;
  let fixture: ComponentFixture<TreeViewLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeViewLargeComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TreeViewLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
