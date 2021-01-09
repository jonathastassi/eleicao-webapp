import { ElectionConfigurationComponent } from './pages/election-configuration/election-configuration.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'election-configuration',
    component: ElectionConfigurationComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'election-configuration',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
