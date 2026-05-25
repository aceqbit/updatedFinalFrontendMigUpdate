import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {
  startDate: Date | null = null;
  endDate: Date | null = null;
  hoverDate: Date | null = null;
  
  presets = [
    { label: 'Today', days: 0 },
    { label: 'Yesterday', days: -1 },
    { label: 'Last 7 Days', days: -7 },
    { label: 'Last 30 Days', days: -30 },
    { label: 'This Month', type: 'currentMonth' },
    { label: 'Last Month', type: 'lastMonth' }
  ];

  calendarMonths: Date[] = [];

  constructor() {
    this.initCalendars();
  }

  ngOnInit(): void { }

  initCalendars() {
    const today = new Date();
    this.calendarMonths = [
      new Date(today.getFullYear(), today.getMonth(), 1),
      new Date(today.getFullYear(), today.getMonth() + 1, 1)
    ];
  }

  selectPreset(preset: any) {
    const today = new Date();
    if (preset.type === 'currentMonth') {
      this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else {
      const start = new Date();
      start.setDate(today.getDate() + preset.days);
      this.startDate = start;
      this.endDate = today;
    }
  }

  onDateSelect(date: Date) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else {
      if (date < this.startDate) {
        this.endDate = this.startDate;
        this.startDate = date;
      } else {
        this.endDate = date;
      }
    }
  }

  isInRange(date: Date): boolean {
    if (!this.startDate || !this.endDate) return false;
    return date >= this.startDate && date <= this.endDate;
  }

  isSelectionEdge(date: Date): boolean {
    return (this.startDate?.toDateString() === date.toDateString()) || 
           (this.endDate?.toDateString() === date.toDateString());
  }
}
