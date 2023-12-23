import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactService } from '../service/contact.service';

interface RouteParams {
  id: string;
}

@Component({
  selector: 'app-verifydelacc',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, HttpClientModule],
  templateUrl: './verifydelacc.component.html',
  styleUrl: './verifydelacc.component.css',
})
export class VerifydelaccComponent implements OnInit {
  verifydel!: FormGroup;
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private _cs: ContactService
  ) {
    const params = this.route.snapshot.params as RouteParams;
    this.id = params.id;
    console.log(this.id, 'route params');
  }

  ngOnInit(): void {
    this.verifydel = new FormGroup({
      otp: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    // const contactNumberControl = this.verifydel.get('contactNumber');
    // console.log(contactNumberControl && contactNumberControl.valid, 'ppp');

    // if (contactNumberControl && contactNumberControl.valid) {
    //   this.router.navigate(['/delconfirm']);
    // }
    const contactNumber = this._cs.conatctval;
    const otp = this.verifydel.getRawValue().otp;

    console.log(contactNumber, 'check final');

    this.http
      .post(
        'https://sportupapi.otobit.com/api/Player/delete-account/verify-otp',
        {
          otp: otp,
          contactNumber: contactNumber,
        }
      )
      .subscribe(
        (x) => {
          if (x) {
            this.router.navigate(['/delconfirm']);
          }
        },
        (error) => {
          alert(error);
        }
      );
  }
}
