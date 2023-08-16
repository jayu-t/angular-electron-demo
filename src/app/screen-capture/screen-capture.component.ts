import { Component } from '@angular/core';
import logger from '../../../electron/logger';

const { ipcRenderer } = (window as any).require('electron');

console.log((window as any).netlog);

@Component({
  selector: 'app-screen-capture',
  templateUrl: './screen-capture.component.html',
  styleUrls: ['./screen-capture.component.css'],
})
export class ScreenCaptureComponent {
  constructor() {
    console.log(ipcRenderer);
    console.log(logger);
    logger.info('ScreenCaptureComponent info constructor');
    logger.debug('ScreenCaptureComponent debug constructor');
  }
  takeScreenshot() {
    ipcRenderer.send('capture-screenshot');
  }

  pingGoogle() {
    ipcRenderer.send('ping-google');
  }

  pingFacebook() {
    ipcRenderer.send('ping-facebook');
  }
}
