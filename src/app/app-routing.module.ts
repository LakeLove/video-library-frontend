import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { UserVideosComponent } from './user-videos/user-videos.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  { path: 'videos/:id', component: SingleVideoComponent },
  { path: 'videos/user/:author', component: UserVideosComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'upload', component: UploadPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'callback', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
