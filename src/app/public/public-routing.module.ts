import { InitialComponent } from './pages/initial/initial.component';
import { PollPlaceComponent } from './pages/poll-place/poll-place.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'initial',
    component: InitialComponent,
  },
  {
    path: 'eleicao/:reference',
    component: PollPlaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
