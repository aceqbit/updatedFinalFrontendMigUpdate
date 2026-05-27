import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ResourceMonitorComponent } from './resource-monitor.component';

describe('ResourceMonitorComponent', () => {
  let component: ResourceMonitorComponent;
  let fixture: ComponentFixture<ResourceMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceMonitorComponent, FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ResourceMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
