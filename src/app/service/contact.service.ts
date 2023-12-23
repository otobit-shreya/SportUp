import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class ContactService {
  conatctval!: number;

  getnumber(conatct: number) {
    this.conatctval = conatct;
    console.log(this.conatctval, 'ccc');
    
  }
}
