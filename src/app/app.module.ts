import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(255,255,255,0.6)',
      fullScreenBackdrop: true,
      backdropBorderRadius: '4px',
      primaryColour: '#ddd',
      secondaryColour: '#ccc',
      tertiaryColour: '#ddd',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
