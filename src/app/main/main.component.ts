import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContactService } from '../service/contact.service';
import { SnackbarService } from '../service/snackbar.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private _cs: ContactService,
    private _snackbar: SnackbarService
  ) {}

  delform!: FormGroup;

  ngOnInit(): void {
    this.delform = new FormGroup({
      contactNumber: new FormControl('', [
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
    const contactNumberControl = this.delform.get('contactNumber');
    const emailControl = this.delform.get('email');

    return (
      (contactNumberControl && contactNumberControl.valid) ||
      (emailControl && emailControl.valid)
    );
  }

  onInputChange(field: string): void {
    const otherField = field === 'contactNumber' ? 'email' : 'contactNumber';

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
   
    const selectedOption = this.delform.get('contactNumber')?.value
      ? 'contactNumber'
      : 'email';
    const phoneVal = this.delform.getRawValue().contactNumber;
    const emailVal = this.delform.getRawValue().email;

    this._cs.getnumber(phoneVal);

    this.http
      .post(
        'https://sportupapi.otobit.com/api/Player/delete-account/request-otp',
        this.delform.value
      )
      .subscribe(
        (x) => {
          console.log(x, 'x');
          this.router.navigate([`/verifydel/${selectedOption}`]);
        },
        (error) => {
          this._snackbar.openSnackBar('An Unknown Error occured!');
          console.log(error, 'rrrr');
        }
      );

    console.log(this.delform, 'del main form');
  }
}
