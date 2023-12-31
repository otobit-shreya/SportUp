import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import { VerifydelaccComponent } from './verifydelacc/verifydelacc.component';
import { DelconfirmComponent } from './delconfirm/delconfirm.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainComponent,
    VerifydelaccComponent,
    DelconfirmComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'mobile-apps';
}
