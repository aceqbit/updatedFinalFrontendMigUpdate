import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { LayoutManagerComponent } from './components/layout-manager/layout-manager.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { WorkflowDesignerComponent } from './components/workflow-designer/workflow-designer.component';
import { StickyNotesComponent } from './components/sticky-notes/sticky-notes.component';
import { EventSchedulerComponent } from './components/event-scheduler/event-scheduler.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { AutoCompleteComplexComponent } from './components/autocomplete-complex/autocomplete-complex.component';
import { DashboardWidgetsComponent } from './components/dashboard-widgets/dashboard-widgets.component';
import { AdvancedFormStepperComponent } from './components/advanced-form-stepper/advanced-form-stepper.component';
import { TreeViewLargeComponent } from './components/tree-view-large/tree-view-large.component';
import { NotificationHubComponent } from './components/notification-hub/notification-hub.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { AsyncAutocompleteLabComponent } from './components/async-autocomplete-lab/async-autocomplete-lab.component';
import { ChipsInputLabComponent } from './components/chips-input-lab/chips-input-lab.component';
import { FileDropzoneLabComponent } from './components/file-dropzone-lab/file-dropzone-lab.component';
import { ContextMenuOverlaysLabComponent } from './components/context-menu-overlays-lab/context-menu-overlays-lab.component';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { ResourceMonitorComponent } from './components/resource-monitor/resource-monitor.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutManagerComponent,
    CalendarComponent,
    WorkflowDesignerComponent,
    StickyNotesComponent,
    EventSchedulerComponent,
    DateRangePickerComponent,
    AutoCompleteComplexComponent,
    DashboardWidgetsComponent,
    AdvancedFormStepperComponent,
    TreeViewLargeComponent,
    NotificationHubComponent,
    SettingsPanelComponent,
    AsyncAutocompleteLabComponent,
    ChipsInputLabComponent,
    FileDropzoneLabComponent,
    ContextMenuOverlaysLabComponent,
    DataGridComponent,
    FileExplorerComponent,
    ResourceMonitorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
