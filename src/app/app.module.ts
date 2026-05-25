import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
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
    ContextMenuOverlaysLabComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
