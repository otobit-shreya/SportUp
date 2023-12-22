import { Component } from '@angular/core';
import {  ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
declare var intlTelInput: any;
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  onContinue(){

  }
}
