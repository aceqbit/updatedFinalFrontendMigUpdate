import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutManagerComponent } from './components/layout-manager/layout-manager.component';
import { WorkflowDesignerComponent } from './components/workflow-designer/workflow-designer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventSchedulerComponent } from './components/event-scheduler/event-scheduler.component';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { AdvancedFormStepperComponent } from './components/advanced-form-stepper/advanced-form-stepper.component';
import { TreeViewLargeComponent } from './components/tree-view-large/tree-view-large.component';
import { StickyNotesComponent } from './components/sticky-notes/sticky-notes.component';
import { NotificationHubComponent } from './components/notification-hub/notification-hub.component';
import { ResourceMonitorComponent } from './components/resource-monitor/resource-monitor.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { DashboardWidgetsComponent } from './components/dashboard-widgets/dashboard-widgets.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { AutoCompleteComplexComponent } from './components/autocomplete-complex/autocomplete-complex.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LayoutManagerComponent,
    DashboardWidgetsComponent,
    WorkflowDesignerComponent,
    CalendarComponent,
    DateRangePickerComponent,
    EventSchedulerComponent,
    DataGridComponent,
    AutoCompleteComplexComponent,
    FileExplorerComponent,
    AdvancedFormStepperComponent,
    TreeViewLargeComponent,
    StickyNotesComponent,
    NotificationHubComponent,
    ResourceMonitorComponent,
    SettingsPanelComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeSection: string = 'dashboard';

  sections = [
    { id: 'dashboard', label: 'Main Dashboard', icon: '📊' },
    { id: 'workflow', label: 'Workflow Designer', icon: '🔗' },
    { id: 'calendar', label: 'Enterprise Calendar', icon: '📅' },
    { id: 'scheduler', label: 'Event Scheduler', icon: '⏱️' },
    { id: 'grid', label: 'Advanced Data Grid', icon: '🔠' },
    { id: 'explorer', label: 'File Explorer', icon: '📁' },
    { id: 'stepper', label: 'Provisioning Wizard', icon: '⚡' },
    { id: 'tree', label: 'Taxonomy Tree', icon: '🌳' },
    { id: 'notes', label: 'Sticky Board', icon: '📌' },
    { id: 'notifications', label: 'Alert Hub', icon: '🔔' },
    { id: 'monitor', label: 'Resource Monitor', icon: '💻' },
    { id: 'settings', label: 'System Settings', icon: '⚙️' },
  ];

  setSection(id: string) {
    this.activeSection = id;
  }
}
