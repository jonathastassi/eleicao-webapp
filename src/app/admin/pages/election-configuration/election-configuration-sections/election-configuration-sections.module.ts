import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionConfigurationSectionsRoutingModule } from './election-configuration-sections-routing.module';
import { ElectionConfigurationSectionsListComponent } from './election-configuration-sections-list/election-configuration-sections-list.component';
import { ElectionConfigurationSectionsFormComponent } from './election-configuration-sections-form/election-configuration-sections-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ElectionConfigurationSectionsListComponent, ElectionConfigurationSectionsFormComponent],
  imports: [
    CommonModule,
    ElectionConfigurationSectionsRoutingModule,
    SharedModule,
  ]
})
export class ElectionConfigurationSectionsModule { }
