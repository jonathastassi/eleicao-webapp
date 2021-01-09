import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ElectionConfigurationComponent } from './pages/election-configuration/election-configuration.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, ElectionConfigurationComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
