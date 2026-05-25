import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DashboardWidgetsComponent,
} from '../dashboard-widgets/dashboard-widgets.component';
import {
  CalendarComponent,
} from '../calendar/calendar.component';
import {
  AdvancedFormStepperComponent,
} from '../advanced-form-stepper/advanced-form-stepper.component';

interface Widget {
  id: string;
  title: string;
  type: 'chart' | 'list' | 'stats' | 'map';
  width: number;
  height: number;
  color: string;
  dataPoints: any[];
}

@Component({
    selector: 'app-layout-manager',
    templateUrl: './layout-manager.component.html',
    styleUrls: ['./layout-manager.component.css']
})
export class LayoutManagerComponent implements OnInit {
  widgets: Widget[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.generateHeavyLayout();
  }

  generateHeavyLayout() {
    const types: ('chart' | 'list' | 'stats' | 'map')[] = ['chart', 'list', 'stats', 'map'];
    const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#818cf8', '#a78bfa', '#f472b6'];

    for (let i = 0; i < 12; i++) {
      this.widgets.push({
        id: `widget-${i}`,
        title: `Dashboard Panel ${i + 1}`,
        type: types[i % types.length],
        width: 300 + (Math.random() * 200),
        height: 200 + (Math.random() * 150),
        color: colors[i % colors.length],
        dataPoints: Array.from({ length: 50 }, (_, j) => ({
          label: `Point ${j}`,
          value: Math.random() * 1000
        }))
      });
    }
  }

  removeWidget(id: string) {
    this.widgets = this.widgets.filter(w => w.id !== id);
  }

  getWidgetSizeClass(w: Widget): string {
    if (w.width > 400) return 'large';
    if (w.width < 350) return 'small';
    return 'medium';
  }
}
