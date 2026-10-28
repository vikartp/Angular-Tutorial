import { Component, forwardRef, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule, FormGroup, FormControl, Validators,
  ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
  Validator, AbstractControl, ValidationErrors
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-form',
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressForm),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressForm),
      multi: true,
    },
  ],
  styles: `
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
  `
})
export class AddressForm implements ControlValueAccessor, Validator, OnDestroy {
  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
  });

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};
  private subs: Subscription[] = [];

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  // CVA: write value from parent into this child form
  writeValue(value: any): void {
    if (value) {
      this.addressForm.patchValue(value, { emitEvent: false });
    }
  }

  // CVA: parent registers its onChange callback
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.subs.push(this.addressForm.valueChanges.subscribe(fn));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Validator: report child invalidity up to the parent
  validate(_: AbstractControl): ValidationErrors | null {
    return this.addressForm.valid ? null : { address: true };
  }

  // Called by Angular — store callback so we can trigger re-validation
  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
    // Whenever child form's validity status changes, tell parent to re-validate
    this.subs.push(this.addressForm.statusChanges.subscribe(() => fn()));
  }

  onBlur() {
    this.onTouched();
  }
}
