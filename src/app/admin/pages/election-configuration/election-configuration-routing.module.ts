import { ElectionConfigurationListComponent } from './election-configuration-list/election-configuration-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ElectionConfigurationFormComponent } from './election-configuration-form/election-configuration-form.component';

const routes: Routes = [
  {
    path: 'list',
    component: ElectionConfigurationListComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'form',
    component: ElectionConfigurationFormComponent,
    canActivate: [AngularFireAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectionConfigurationRoutingModule {}
