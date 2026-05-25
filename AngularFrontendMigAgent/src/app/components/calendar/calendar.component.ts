import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarDay {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: any[];
  holiday?: string;
  lunarPhase?: string;
  weather?: { temp: number; icon: string };
  metrics?: { cpu: number; memory: number }; // Stress test data
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  days: CalendarDay[] = [];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  lunarPhases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];

  constructor() { }

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    this.days = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Padding for previous month
    const startPadding = firstDay.getDay();
    for (let i = startPadding; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      this.days.push(this.createEnhancedDay(date, false));
    }
    
    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      this.days.push(this.createEnhancedDay(date, true));
    }
    
    // Padding for next month
    const endPadding = 42 - this.days.length;
    for (let i = 1; i <= endPadding; i++) {
      const date = new Date(year, month + 1, i);
      this.days.push(this.createEnhancedDay(date, false));
    }
  }

  createEnhancedDay(date: Date, isCurrentMonth: boolean): CalendarDay {
    const today = new Date();
    const d = date.getDate();
    
    return {
      date,
      isToday: date.toDateString() === today.toDateString(),
      isCurrentMonth,
      events: this.getMockEvents(date),
      holiday: d % 10 === 0 ? `Holiday Type ${d}` : undefined,
      lunarPhase: this.lunarPhases[d % 8],
      weather: { temp: 20 + (d % 15), icon: d % 3 === 0 ? '☀️' : (d % 3 === 1 ? '☁️' : '🌧️') },
      metrics: { cpu: Math.random() * 100, memory: Math.random() * 100 }
    };
  }

  getMockEvents(date: Date): any[] {
    const events = [];
    const d = date.getDate();
    if (d % 5 === 0) events.push({ title: 'Critical Review', color: '#ea4335' });
    if (d % 3 === 0) events.push({ title: 'Deployment Slot', color: '#34a853' });
    if (d % 7 === 0) events.push({ title: 'System Maintenance', color: '#fbbc04' });
    return events;
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  getMonthName(): string {
    return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
