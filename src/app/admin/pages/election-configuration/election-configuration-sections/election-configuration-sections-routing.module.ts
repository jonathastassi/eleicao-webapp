import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { SectionResolver } from 'src/app/admin/resolvers/section.resolver';
import { ElectionConfigurationSectionsFormComponent } from './election-configuration-sections-form/election-configuration-sections-form.component';
import { ElectionConfigurationSectionsListComponent } from './election-configuration-sections-list/election-configuration-sections-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ElectionConfigurationSectionsListComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'form',
    component: ElectionConfigurationSectionsFormComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: ':sectionId/edit',
    canActivate: [AngularFireAuthGuard],
    component: ElectionConfigurationSectionsFormComponent,
    resolve: { model: SectionResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionConfigurationSectionsRoutingModule { }
