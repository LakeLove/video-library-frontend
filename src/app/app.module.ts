import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VideoCommentsComponent } from './video-comments/video-comments.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessPopupComponent } from './success-popup/success-popup.component';
import { CallbackComponent } from './callback/callback.component';

import { AuthenticationGuard } from './services/authentication.guard';

import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    SingleVideoComponent,
    HomepageComponent,
    ToolbarComponent,
    VideoCommentsComponent,
    AuthenticationComponent,
    UploadPageComponent,
    UploadFormComponent,
    SuccessPopupComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
