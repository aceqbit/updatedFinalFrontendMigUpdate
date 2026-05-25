import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormStep {
  id: number;
  label: string;
  isComplete: boolean;
  isValid: boolean;
}

@Component({
    selector: 'app-advanced-form-stepper',
    templateUrl: './advanced-form-stepper.component.html',
    styleUrls: ['./advanced-form-stepper.component.css']
})
export class AdvancedFormStepperComponent implements OnInit {
  currentStep = 0;
  steps: FormStep[] = [
    { id: 0, label: 'Identity Verification', isComplete: false, isValid: false },
    { id: 1, label: 'Resource Configuration', isComplete: false, isValid: false },
    { id: 2, label: 'Security Protocols', isComplete: false, isValid: false },
    { id: 3, label: 'Final Review', isComplete: false, isValid: true }
  ];

  formData = {
    firstName: '',
    lastName: '',
    enterpriseEmail: '',
    clusterType: 'standard',
    nodeCount: 3,
    encryptionLevel: 'AES-256',
    mfaEnabled: true,
    notifications: ['email', 'slack']
  };

  constructor() { }

  ngOnInit(): void { }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.steps[this.currentStep].isComplete = true;
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitForm() {
    console.log('Submitting complex enterprise form...', this.formData);
    // Heavy validation logic simulation
  }

  getStepStatusClass(stepId: number): string {
    if (stepId === this.currentStep) return 'active';
    if (stepId < this.currentStep) return 'completed';
    return 'pending';
  }
}
