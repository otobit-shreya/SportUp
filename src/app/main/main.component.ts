import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  constructor(private router: Router) {}

  delform!: FormGroup;

  ngOnInit(): void {
    this.delform = new FormGroup({
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      email: new FormControl(null, [
        Validators.required,
        this.customEmailValidator,
      ]),
    });
  }

  customEmailValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const email = control.value as string;

    if (
      email &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    ) {
      return { invalidEmailFormat: true };
    }

    if (email && !email.endsWith('.com')) {
      return { invalidEmailSuffix: true };
    }

    return null;
  }

  isAnyFieldValid() {
    const phoneNumberControl = this.delform.get('phoneNumber');
    const emailControl = this.delform.get('email');

    return (
      (phoneNumberControl && phoneNumberControl.valid) ||
      (emailControl && emailControl.valid)
    );
  }

  onInputChange(field: string): void {
    const otherField = field === 'phoneNumber' ? 'email' : 'phoneNumber';

    const currentControl = this.delform.get(field);
    const otherControl = this.delform.get(otherField);

    if (currentControl && otherControl) {
      if (currentControl.value.trim() === '') {
        otherControl.enable();
      } else {
        otherControl.disable();
      }
    }
  }

  onSubmit() {
    const phoneNumberControl = this.delform.get('phoneNumber');
    const emailControl = this.delform.get('email');
    const selectedOption = this.delform.get('phoneNumber')?.value
      ? 'phoneNumber'
      : 'email';
      const phoneVal = this.delform.getRawValue().phoneNumber;
      const emailVal = this.delform.getRawValue().email;

    if (
      (phoneNumberControl && phoneNumberControl.valid) ||
      (emailControl && emailControl.valid)
    ) {
      this.router.navigate([`/verifydel/${selectedOption}`],);
    }

    console.log(this.delform, 'del main form');
  }
}
