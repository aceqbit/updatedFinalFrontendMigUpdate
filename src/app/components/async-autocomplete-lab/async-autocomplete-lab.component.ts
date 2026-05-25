import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-async-autocomplete-lab',
    templateUrl: './async-autocomplete-lab.component.html',
    styleUrls: ['./async-autocomplete-lab.component.css']
})
export class AsyncAutocompleteLabComponent implements OnInit {
  query = '';
  selectedValue = '';
  filteredOptions: string[] = [];
  showDropdown = false;

  private readonly options = [
    'Identity service',
    'Resource graph',
    'Deployment queue',
    'Compliance checklist',
    'Security baseline',
    'Observability pipeline',
    'Feature rollout',
    'Incident response',
    'Analytics workspace',
    'Permission matrix',
    'Tenant registry',
    'Audit trail',
    'Release train',
    'Search combobox',
    'Typeahead prompt',
    'Project archive'
  ];

  ngOnInit(): void {
    this.filterOptions();
  }

  onQueryChange(value: string) {
    this.query = value;
    this.filterOptions();
  }

  pickOption(option: string) {
    this.selectedValue = option;
    this.query = option;
    this.showDropdown = false;
  }

  clearSelection() {
    this.selectedValue = '';
    this.query = '';
    this.filterOptions();
  }

  private filterOptions() {
    const normalized = this.query.trim().toLowerCase();
    this.filteredOptions = normalized
      ? this.options.filter(option => option.toLowerCase().includes(normalized)).slice(0, 8)
      : this.options.slice(0, 8);
    this.showDropdown = true;
  }
}