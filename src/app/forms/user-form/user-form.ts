import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { AddressForm } from '../address-form/address-form';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, JsonPipe, AddressForm],
  templateUrl: './user-form.html',
  styles: `
    :host { display: block; }

    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--label-color, #374151);
    }
    :host-context(.dark) label { --label-color: #d1d5db; }

    input {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid var(--input-border, #d1d5db);
      border-radius: 8px;
      background: var(--input-bg, #f9fafb);
      color: var(--input-text, #111827);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }
    input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }
    input::placeholder { color: #9ca3af; }
    :host-context(.dark) input {
      --input-border: #4b5563;
      --input-bg: #374151;
      --input-text: #f3f4f6;
    }
    :host-context(.dark) input::placeholder { color: #6b7280; }

    .field-error {
      display: block;
      color: #ef4444;
      font-size: 0.75rem;
      margin-top: 4px;
    }
    :host-context(.dark) .field-error { color: #f87171; }

    button[type="submit"] {
      margin-top: 24px;
      width: 100%;
      padding: 12px;
      font-size: 1rem;
      font-weight: 600;
      color: white;
      background: #6366f1;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.2s;
    }
    button[type="submit"]:hover { background: #4f46e5; }
    button[type="submit"]:disabled {
      background: #d1d5db;
      color: #9ca3af;
      cursor: not-allowed;
    }
    :host-context(.dark) button[type="submit"]:disabled {
      background: #4b5563;
      color: #6b7280;
    }
  `
})
export class UserForm {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl(null),
  }, { validators: UserForm.formValidator });

  // Group-level validator: surfaces child errors onto userForm.errors
  static formValidator(group: AbstractControl): ValidationErrors | null {
    const address = group.get('address');
    return address?.errors ? { addressInvalid: true } : null;
  }

  submitted = false;

  onSubmit() {
    if (this.userForm.valid) {
      this.submitted = true;
      console.log('Form value:', this.userForm.value);
    }
  }
}
