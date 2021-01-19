import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PollPlaceComponent } from './pages/poll-place/poll-place.component';
import { InitialComponent } from './pages/initial/initial.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PollPlaceComponent, InitialComponent],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
})

export class PublicModule {}
