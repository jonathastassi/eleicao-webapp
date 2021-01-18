import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageErrorInputComponent } from './components/message-error-input/message-error-input.component';
import { InputCustomComponent } from './components/input-custom/input-custom.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    MenuComponent,
    MessageErrorInputComponent,
    InputCustomComponent,
    PageHeaderComponent,
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
  ],
})
export class SharedModule {}
