import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Resource {
  id: string;
  name: string;
  type: 'room' | 'staff' | 'equipment';
  availability: boolean;
  color: string;
}

interface ScheduledEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resourceId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  description: string;
  attendees: string[];
}

@Component({
  selector: 'app-event-scheduler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-scheduler.component.html',
  styleUrls: ['./event-scheduler.component.css']
})
export class EventSchedulerComponent implements OnInit {
  resources: Resource[] = [];
  events: ScheduledEvent[] = [];
  hours = Array.from({ length: 24 }, (_, i) => i);
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  selectedView: 'day' | 'week' | 'resource' = 'week';
  
  constructor() { }

  ngOnInit(): void {
    this.initResources();
    this.generateHeavyEvents();
  }

  initResources() {
    const types: ('room' | 'staff' | 'equipment')[] = ['room', 'staff', 'equipment'];
    const colors = ['#e8f0fe', '#fce8e6', '#e6f4ea', '#fef7e0', '#f1f3f4'];
    
    for (let i = 0; i < 20; i++) {
      this.resources.push({
        id: `res-${i}`,
        name: `${types[i % 3].toUpperCase()} ${i + 1}`,
        type: types[i % 3],
        availability: true,
        color: colors[i % colors.length]
      });
    }
  }

  generateHeavyEvents() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 200; i++) {
      const start = new Date(startDate);
      start.setDate(start.getDate() + Math.floor(Math.random() * 7));
      start.setHours(Math.floor(Math.random() * 20));
      
      const end = new Date(start);
      end.setHours(start.getHours() + 1 + Math.floor(Math.random() * 3));
      
      this.events.push({
        id: i,
        title: `Project Sync ${i}`,
        start,
        end,
        resourceId: `res-${Math.floor(Math.random() * this.resources.length)}`,
        status: i % 10 === 0 ? 'cancelled' : (i % 3 === 0 ? 'pending' : 'confirmed'),
        description: `This is a very complex event description for stress testing. ${'detail '.repeat(20)}`,
        attendees: Array.from({ length: 5 }, (_, j) => `User ${j}@enterprise.com`)
      });
    }
  }

  getEventsForSlot(dayIndex: number, hour: number, resourceId: string): ScheduledEvent[] {
    return this.events.filter(e => {
      const dayMatches = e.start.getDay() === (dayIndex + 1) % 7;
      const hourMatches = e.start.getHours() <= hour && e.end.getHours() > hour;
      const resourceMatches = resourceId ? e.resourceId === resourceId : true;
      return dayMatches && hourMatches && resourceMatches;
    });
  }

  calculateHeight(event: ScheduledEvent): number {
    const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60);
    return duration * 60; // 60px per hour
  }

  checkConflicts() {
    console.log('Running heavy conflict detection algorithm...');
    // Simulated O(n^2) complexity for stress test
    for (let i = 0; i < this.events.length; i++) {
      for (let j = i + 1; j < this.events.length; j++) {
        const e1 = this.events[i];
        const e2 = this.events[j];
        if (e1.resourceId === e2.resourceId && e1.start < e2.end && e2.start < e1.end) {
          // Conflict detected
        }
      }
    }
  }
}
