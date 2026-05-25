import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface GridRow {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'busy' | 'offline' | 'away';
  role: string;
  department: string;
  lastLogin: Date;
  efficiency: number;
  tags: string[];
  metadata: any;
}

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  rows: GridRow[] = [];
  selectedRows: Set<string> = new Set();
  
  groupBy: string = 'department';
  filterText: string = '';
  
  departments = ['Engineering', 'Security', 'Data Science', 'Product', 'DevOps', 'QA', 'Management'];

  constructor() { }

  ngOnInit(): void {
    this.generateHeavyData();
  }

  generateHeavyData() {
    const roles = ['System Architect', 'Security Lead', 'Data Scientist', 'UX Researcher', 'DevOps Engineer', 'Frontend Expert', 'Backend Developer'];
    const statuses: ('online' | 'busy' | 'offline' | 'away')[] = ['online', 'busy', 'offline', 'away'];

    for (let i = 0; i < 500; i++) {
      this.rows.push({
        id: `UID-${1000 + i}`,
        name: `User ${i} - ${Math.random().toString(36).substring(7)}`,
        email: `user.${i}@enterprise-heavy-test.io`,
        status: statuses[i % statuses.length],
        role: roles[i % roles.length],
        department: this.departments[i % this.departments.length],
        lastLogin: new Date(),
        efficiency: Math.floor(Math.random() * 100),
        tags: ['active', 'test', 'heavy', 'migration-ready'],
        metadata: {
          browser: 'Chrome/124.0.0',
          os: 'Windows 11',
          session: Math.random().toString(16)
        }
      });
    }
  }

  toggleSelection(id: string) {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }

  getGroupedRows() {
    // Heavy computational logic for grouping
    const groups: { [key: string]: GridRow[] } = {};
    this.rows
      .filter(r => r.name.toLowerCase().includes(this.filterText.toLowerCase()) || r.email.toLowerCase().includes(this.filterText.toLowerCase()))
      .forEach(row => {
        const val = (row as any)[this.groupBy];
        if (!groups[val]) groups[val] = [];
        groups[val].push(row);
      });
    return groups;
  }

  getGroupKeys() {
    return Object.keys(this.getGroupedRows());
  }

  exportData() {
    console.log('Exporting 500 rows with complex metadata...');
    // Simulate heavy export processing
  }

  getInitials(name: string): string {
    return name.split(' ').filter(n => n.length > 0).map(n => n[0]).join('');
  }
}
