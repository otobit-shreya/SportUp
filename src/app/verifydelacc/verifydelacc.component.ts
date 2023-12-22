import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface RouteParams {
  id: string;
}

@Component({
  selector: 'app-verifydelacc',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './verifydelacc.component.html',
  styleUrl: './verifydelacc.component.css',
})
export class VerifydelaccComponent implements OnInit {
  verifydel!: FormGroup;
  id: any;
  

  constructor(private router: Router, private route: ActivatedRoute) {
    const params = this.route.snapshot.params as RouteParams;
    this.id = params.id;
    console.log(this.id, 'route params');
  }

  ngOnInit(): void {
    this.verifydel = new FormGroup({
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
    });
  }

  onSubmit() {
    console.log('click');

    const phoneNumberControl = this.verifydel.get('phoneNumber');
    console.log(phoneNumberControl && phoneNumberControl.valid, 'ppp');

    if (phoneNumberControl && phoneNumberControl.valid) {
      this.router.navigate(['/delconfirm']);
    }
    console.log(this.verifydel, 'verify del');
  }
}
