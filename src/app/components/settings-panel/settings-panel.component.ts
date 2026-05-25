import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SettingCategory {
  id: string;
  label: string;
  icon: string;
}

interface SettingField {
  key: string;
  label: string;
  type: 'text' | 'toggle' | 'range' | 'select' | 'textarea';
  help?: string;
  options?: { label: string; value: string }[];
}

interface TabDetailCard {
  heading: string;
  value: string;
  tone: 'neutral' | 'success' | 'warning' | 'critical' | 'accent';
}

interface TabRecord {
  label: string;
  value: string;
}

@Component({
    selector: 'app-settings-panel',
    templateUrl: './settings-panel.component.html',
    styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent implements OnInit {
  activeTab: string = 'general';
  
  categories: SettingCategory[] = [
    { id: 'general', label: 'General System', icon: '⚙️' },
    { id: 'security', label: 'Security & Auth', icon: '🔒' },
    { id: 'network', label: 'Network Config', icon: '🌐' },
    { id: 'billing', label: 'Usage & Billing', icon: '💳' },
    { id: 'advanced', label: 'Advanced Engine', icon: '⚡' }
  ];

  formData: Record<string, any> = {
    systemName: 'Enterprise Control Plane',
    releaseTrack: 'stable',
    autoScale: true,
    maxInstances: 50,
    maintenanceMode: false,
    mfaRequired: true,
    passwordRotationDays: 30,
    region: 'us-east-1',
    firewallMode: 'balanced',
    allowedRegions: 'us-east-1, eu-west-1',
    logLevel: 'info',
    networkMode: 'private',
    billingPlan: 'pay-as-you-go',
    costCenter: 'FIN-104',
    invoiceEmail: 'finance@example.com',
    optimizationMode: 'balanced',
    workerPool: 'standard',
    apiKey: 'sk_test_51MzL2...'
  };

  tabConfigs: Record<string, { title: string; description: string; fields: SettingField[] }> = {
    general: {
      title: 'General System',
      description: 'Core identity, lifecycle, and runtime defaults for the platform.',
      fields: [
        { key: 'systemName', label: 'System Name', type: 'text', help: 'Friendly label shown across the shell.' },
        { key: 'releaseTrack', label: 'Release Track', type: 'select', options: [
          { label: 'Stable', value: 'stable' },
          { label: 'Beta', value: 'beta' },
          { label: 'Canary', value: 'canary' }
        ]},
        { key: 'autoScale', label: 'Auto Scale', type: 'toggle', help: 'Scale workers based on live load.' },
        { key: 'maxInstances', label: 'Max Instances', type: 'range' }
      ]
    },
    security: {
      title: 'Security & Auth',
      description: 'Authentication posture, password policy, and access control defaults.',
      fields: [
        { key: 'mfaRequired', label: 'Require MFA', type: 'toggle', help: 'Force multi-factor authentication for all users.' },
        { key: 'passwordRotationDays', label: 'Password Rotation Days', type: 'range' },
        { key: 'apiKey', label: 'Service API Key', type: 'text', help: 'Stored in vault in production.' }
      ]
    },
    network: {
      title: 'Network Config',
      description: 'Transport, routing, and region policy for connected services.',
      fields: [
        { key: 'region', label: 'Primary Region', type: 'select', options: [
          { label: 'US East (N. Virginia)', value: 'us-east-1' },
          { label: 'EU West (Ireland)', value: 'eu-west-1' },
          { label: 'AP South (Mumbai)', value: 'ap-south-1' }
        ]},
        { key: 'networkMode', label: 'Network Mode', type: 'select', options: [
          { label: 'Private', value: 'private' },
          { label: 'Hybrid', value: 'hybrid' },
          { label: 'Public', value: 'public' }
        ]},
        { key: 'allowedRegions', label: 'Allowed Regions', type: 'textarea', help: 'Comma-separated deployment targets.' }
      ]
    },
    billing: {
      title: 'Usage & Billing',
      description: 'Budgeting, plan selection, and invoice routing for the workspace.',
      fields: [
        { key: 'billingPlan', label: 'Billing Plan', type: 'select', options: [
          { label: 'Pay as you go', value: 'pay-as-you-go' },
          { label: 'Committed use', value: 'committed-use' },
          { label: 'Enterprise annual', value: 'enterprise-annual' }
        ]},
        { key: 'costCenter', label: 'Cost Center', type: 'text' },
        { key: 'invoiceEmail', label: 'Invoice Email', type: 'text' }
      ]
    },
    advanced: {
      title: 'Advanced Engine',
      description: 'Advanced worker behavior and optimization strategies.',
      fields: [
        { key: 'optimizationMode', label: 'Optimization Mode', type: 'select', options: [
          { label: 'Balanced', value: 'balanced' },
          { label: 'Throughput', value: 'throughput' },
          { label: 'Latency', value: 'latency' }
        ]},
        { key: 'workerPool', label: 'Worker Pool', type: 'select', options: [
          { label: 'Standard', value: 'standard' },
          { label: 'Burst', value: 'burst' },
          { label: 'Dedicated', value: 'dedicated' }
        ]},
        { key: 'logLevel', label: 'Log Level', type: 'select', options: [
          { label: 'Error', value: 'error' },
          { label: 'Info', value: 'info' },
          { label: 'Verbose', value: 'verbose' }
        ]}
      ]
    }
  };

  tabCards: Record<string, TabDetailCard[]> = {
    general: [
      { heading: 'Runtime Health', value: 'Stable (99.98%)', tone: 'success' },
      { heading: 'Release Window', value: 'Thu 02:00 UTC', tone: 'accent' },
      { heading: 'Maintenance', value: this.formData['maintenanceMode'] ? 'Enabled' : 'Disabled', tone: 'neutral' }
    ],
    security: [
      { heading: 'MFA Coverage', value: '98% enrolled', tone: 'success' },
      { heading: 'Open Incidents', value: '2 medium', tone: 'warning' },
      { heading: 'Policy Drift', value: '0 critical', tone: 'neutral' }
    ],
    network: [
      { heading: 'Edge Latency', value: '34 ms p95', tone: 'accent' },
      { heading: 'Packet Loss', value: '0.08%', tone: 'success' },
      { heading: 'Failover', value: 'Warm standby', tone: 'neutral' }
    ],
    billing: [
      { heading: 'Month Spend', value: '$42,840', tone: 'accent' },
      { heading: 'Budget Used', value: '71%', tone: 'warning' },
      { heading: 'Forecast', value: '$60,200', tone: 'neutral' }
    ],
    advanced: [
      { heading: 'Optimizer', value: 'Adaptive v3', tone: 'accent' },
      { heading: 'Queue Pressure', value: 'Low', tone: 'success' },
      { heading: 'Hot Path Alerts', value: '1 pending', tone: 'warning' }
    ]
  };

  tabRecords: Record<string, TabRecord[]> = {
    general: [
      { label: 'Default Locale', value: 'en-US' },
      { label: 'Provisioning Region', value: 'Primary + backup' },
      { label: 'Owner Team', value: 'Platform Operations' }
    ],
    security: [
      { label: 'Session Timeout', value: '15 minutes' },
      { label: 'Password Complexity', value: 'Upper/lower/number/symbol' },
      { label: 'Audit Retention', value: '365 days' }
    ],
    network: [
      { label: 'Ingress Policy', value: 'Allow listed CIDRs only' },
      { label: 'TLS Profile', value: 'TLS 1.3 strict' },
      { label: 'Service Mesh', value: 'Enabled' }
    ],
    billing: [
      { label: 'Invoicing Cycle', value: 'Monthly' },
      { label: 'Cost Attribution', value: 'Project + environment tags' },
      { label: 'Auto Alerts', value: 'At 60%, 80%, 95%' }
    ],
    advanced: [
      { label: 'Cache Strategy', value: 'Read-through + write-behind' },
      { label: 'Batch Window', value: 'Every 5 minutes' },
      { label: 'Circuit Breaker', value: 'Enabled with adaptive thresholds' }
    ]
  };

  constructor() { }

  ngOnInit(): void { }

  saveSettings() {
    console.log('Syncing global enterprise settings...', this.formData);
  }

  getCardsForActiveTab(): TabDetailCard[] {
    return this.tabCards[this.activeTab] ?? [];
  }

  getRecordsForActiveTab(): TabRecord[] {
    return this.tabRecords[this.activeTab] ?? [];
  }
}
