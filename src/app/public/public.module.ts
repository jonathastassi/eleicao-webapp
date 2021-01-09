import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PollPlaceComponent } from './pages/poll-place/poll-place.component';
import { InitialComponent } from './pages/initial/initial.component';


@NgModule({
  declarations: [PollPlaceComponent, InitialComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
