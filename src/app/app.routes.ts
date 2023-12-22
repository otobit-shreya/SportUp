import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { VerifydelaccComponent } from './verifydelacc/verifydelacc.component';
import { DelconfirmComponent } from './delconfirm/delconfirm.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'verifydel', component: VerifydelaccComponent },
  { path: 'delconfirm', component: DelconfirmComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
