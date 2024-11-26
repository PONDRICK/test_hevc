import { Routes } from '@angular/router';
import { VideoUploaderComponent } from './video-uploader/video-uploader.component';
export const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: VideoUploaderComponent },
];
