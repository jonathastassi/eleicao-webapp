import { ElectionConfigurationCandidatesComponent } from './election-configuration-candidates/election-configuration-candidates.component';
import { ElectionConfigurationListComponent } from './election-configuration-list/election-configuration-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ElectionConfigurationFormComponent } from './election-configuration-form/election-configuration-form.component';
import { ElectionResolver } from '../../resolvers/election.resolver';

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
  {
    path: ':electionId/edit',
    component: ElectionConfigurationFormComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: { model: ElectionResolver },
  },
  {
    path: ':electionId/candidates',
    component: ElectionConfigurationCandidatesComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: ':electionId/sections',
    loadChildren: () => import('./election-configuration-sections/election-configuration-sections.module').then(m => m.ElectionConfigurationSectionsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectionConfigurationRoutingModule {}
