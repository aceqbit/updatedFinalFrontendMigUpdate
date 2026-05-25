import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SettingCategory {
  id: string;
  label: string;
  icon: string;
  settings: any[];
}

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent implements OnInit {
  activeTab: string = 'general';
  
  categories: SettingCategory[] = [
    { id: 'general', label: 'General System', icon: '⚙️', settings: [] },
    { id: 'security', label: 'Security & Auth', icon: '🔒', settings: [] },
    { id: 'network', label: 'Network Config', icon: '🌐', settings: [] },
    { id: 'billing', label: 'Usage & Billing', icon: '💳', settings: [] },
    { id: 'advanced', label: 'Advanced Engine', icon: '⚡', settings: [] }
  ];

  formData = {
    systemName: 'ENTERPRISE_CORE_V16',
    autoScale: true,
    maxInstances: 50,
    region: 'us-east-1',
    logLevel: 'verbose',
    maintenanceMode: false,
    apiKey: 'sk_test_51MzL2...'
  };

  constructor() { }

  ngOnInit(): void { }

  saveSettings() {
    console.log('Syncing global enterprise settings...', this.formData);
  }
}
