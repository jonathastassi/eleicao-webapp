import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageErrorInputComponent } from './components/message-error-input/message-error-input.component';

@NgModule({
  declarations: [MenuComponent, MessageErrorInputComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MenuComponent,
    FormsModule,
    ReactiveFormsModule,
    MessageErrorInputComponent,
  ],
})
export class SharedModule {}
