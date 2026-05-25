import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-chips-input-lab',
    templateUrl: './chips-input-lab.component.html',
    styleUrls: ['./chips-input-lab.component.css']
})
export class ChipsInputLabComponent {
  chipDraft = '';
  chips = ['Accessibility', 'Angular', 'Design Systems'];

  readonly suggestions = [
    'Observability',
    'Security',
    'Performance',
    'Automation',
    'Deployment',
    'Workflow',
    'Analytics',
    'Collaboration'
  ];

  addChip(rawValue?: string) {
    const value = (rawValue ?? this.chipDraft).trim();
    if (!value || this.chips.includes(value)) {
      this.chipDraft = '';
      return;
    }

    this.chips = [value, ...this.chips];
    this.chipDraft = '';
  }

  removeChip(chip: string) {
    this.chips = this.chips.filter(existing => existing !== chip);
  }

  toggleSuggestion(tag: string) {
    if (this.chips.includes(tag)) {
      this.removeChip(tag);
      return;
    }

    this.addChip(tag);
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addChip();
    }
  }
}