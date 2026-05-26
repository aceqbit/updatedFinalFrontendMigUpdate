import { FormsModule } from '@angular/forms';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { NotificationHubComponent } from './components/notification-hub/notification-hub.component';
import { StickyNotesComponent } from './components/sticky-notes/sticky-notes.component';
import { AdvancedFormStepperComponent } from './components/advanced-form-stepper/advanced-form-stepper.component';
import { ContextMenuOverlaysLabComponent } from './components/context-menu-overlays-lab/context-menu-overlays-lab.component';
import { FileDropzoneLabComponent } from './components/file-dropzone-lab/file-dropzone-lab.component';
import { ChipsInputLabComponent } from './components/chips-input-lab/chips-input-lab.component';
import { AsyncAutocompleteLabComponent } from './components/async-autocomplete-lab/async-autocomplete-lab.component';
import { EventSchedulerComponent } from './components/event-scheduler/event-scheduler.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { WorkflowDesignerComponent } from './components/workflow-designer/workflow-designer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DashboardWidgetsComponent } from './components/dashboard-widgets/dashboard-widgets.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, DashboardWidgetsComponent, WorkflowDesignerComponent, CalendarComponent, DateRangePickerComponent, EventSchedulerComponent, AsyncAutocompleteLabComponent, ChipsInputLabComponent, FileDropzoneLabComponent, ContextMenuOverlaysLabComponent, AdvancedFormStepperComponent, StickyNotesComponent, NotificationHubComponent, SettingsPanelComponent],
      imports: [FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default activeSection', () => {
    expect(component.activeSection).toBe('dashboard');
  });
});
