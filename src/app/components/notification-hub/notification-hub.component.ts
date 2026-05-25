import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error' | 'security';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

@Component({
    selector: 'app-notification-hub',
    templateUrl: './notification-hub.component.html',
    styleUrls: ['./notification-hub.component.css']
})
export class NotificationHubComponent implements OnInit {
  notifications: Notification[] = [];
  archivedNotifications: Notification[] = [];
  selectedIds = new Set<number>();
  
  constructor() { }

  ngOnInit(): void {
    this.generateHeavyNotifications();
  }

  generateHeavyNotifications() {
    const types: ('info' | 'success' | 'warning' | 'error' | 'security')[] = ['info', 'success', 'warning', 'error', 'security'];
    const priorities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];

    for (let i = 0; i < 150; i++) {
      this.notifications.push({
        id: i,
        type: types[i % types.length],
        title: `Enterprise Event [IDX_${i}]`,
        message: `This is a heavy notification message for stress testing. ${'alert details '.repeat(10)}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000),
        isRead: i > 20,
        priority: priorities[i % priorities.length]
      });
    }
  }

  markAllRead() {
    this.notifications.forEach(n => n.isRead = true);
  }

  unmarkAllRead() {
    this.notifications.forEach(n => n.isRead = false);
  }

  toggleSelected(id: number) {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }

  markSelectedRead() {
    this.notifications.forEach(n => {
      if (this.selectedIds.has(n.id)) {
        n.isRead = true;
      }
    });
  }

  markSelectedUnread() {
    this.notifications.forEach(n => {
      if (this.selectedIds.has(n.id)) {
        n.isRead = false;
      }
    });
  }

  clearAll() {
    this.archivedNotifications = [...this.notifications, ...this.archivedNotifications];
    this.notifications = [];
    this.selectedIds.clear();
  }

  restoreArchived() {
    this.notifications = [...this.archivedNotifications, ...this.notifications];
    this.archivedNotifications = [];
  }

  getUnreadCount() {
    return this.notifications.filter(n => !n.isRead).length;
  }
}
