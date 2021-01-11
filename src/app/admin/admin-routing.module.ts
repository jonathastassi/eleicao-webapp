import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'election-configuration',
    loadChildren: () =>
      import(
        './pages/election-configuration/election-configuration.module'
      ).then((m) => m.ElectionConfigurationModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'election-configuration/list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
