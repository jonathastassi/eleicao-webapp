import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageErrorInputComponent } from './components/message-error-input/message-error-input.component';
import { InputCustomComponent } from './components/input-custom/input-custom.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SectionResultListComponent } from './components/section-result-list/section-result-list.component';

@NgModule({
  declarations: [
    MenuComponent,
    MessageErrorInputComponent,
    InputCustomComponent,
    PageHeaderComponent,
    SectionResultListComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MenuComponent,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MessageErrorInputComponent,
    InputCustomComponent,
    PageHeaderComponent,
    SectionResultListComponent
  ],
})
export class SharedModule {}
