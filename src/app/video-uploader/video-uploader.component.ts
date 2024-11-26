import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.css'],
})
export class VideoUploaderComponent {
  errorMessage: string | null = null;
  loadingMessage: string | null = null;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      console.log('Selected file:', file.name);
      console.log('File type:', file.type || 'Unknown type');
      console.log('File size (bytes):', file.size);

      if (this.isSupportedVideoFile(file)) {
        console.log('Supported file type detected.');
        this.errorMessage = null;
        this.loadingMessage = 'Loading the video file...';
        this.playVideo(file);
      } else {
        this.errorMessage =
          'Unsupported file type. Please upload a valid HEVC, MP4, OGG, or WebM video file.';
        console.log(this.errorMessage);
      }
    } else {
      console.error('No file selected.');
    }
  }

  isSupportedVideoFile(file: File): boolean {
    const supportedTypes = [
      'video/mp4',
      'video/ogg',
      'video/webm',
      'video/hevc',
    ];
    const hevcExtensions = ['.hevc'];
    const isSupported =
      supportedTypes.includes(file.type) ||
      hevcExtensions.some((ext) => file.name.endsWith(ext));
    console.log('File supported by extension or type:', isSupported);
    return isSupported;
  }

  playVideo(file: File): void {
    const videoElement = document.getElementById(
      'video-player'
    ) as HTMLVideoElement;

    console.log('Checking direct playback capability for HEVC...');
    if (videoElement.canPlayType('video/mp4; codecs="hev1.1.6.L93.B0"')) {
      console.log('Browser supports HEVC codec. Attempting direct playback...');
    } else {
      console.warn(
        'HEVC codec not natively supported by browser. Attempting fallback playback...'
      );
    }

    this.playDirect(file, videoElement);
  }

  playDirect(file: File, videoElement: HTMLVideoElement): void {
    console.log('Attempting direct playback for file:', file.name);
    videoElement.src = URL.createObjectURL(file);

    videoElement
      .play()
      .then(() => {
        console.log('Direct playback successful.');
        this.loadingMessage = null;
      })
      .catch((error) => {
        console.error('Direct playback failed:', error);
        this.errorMessage =
          'Direct playback failed. Your browser may not support HEVC files directly. Please try another browser or upload an MP4 file.';
        this.loadingMessage = null;
      });
  }
}
