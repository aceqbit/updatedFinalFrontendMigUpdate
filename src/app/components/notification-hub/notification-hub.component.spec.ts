import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NotificationHubComponent } from './notification-hub.component';

describe('NotificationHubComponent', () => {
  let component: NotificationHubComponent;
  let fixture: ComponentFixture<NotificationHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationHubComponent],
      imports: [FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(NotificationHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
