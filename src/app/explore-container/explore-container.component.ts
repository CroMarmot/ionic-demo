import { Component, OnInit, Input, NgZone } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  text: string = "init";

  constructor(private qrScanner: QRScanner,private ngZone: NgZone) { }

  ngOnInit(){}

  onClick(){
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            // https://stackoverflow.com/questions/36919399/angular-2-view-not-updating-after-model-changes
            this.ngZone.run(()=>{
              this.text = text;
            });

            this.qrScanner.hide(); // hide camera preview
            this.qrScanner.destroy();
            // 移除cameraView类
            (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
            scanSub.unsubscribe(); // stop scanning
          });
          this.qrScanner.show(); // start camera preview
          (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
        } else if (status.denied) {
          console.log('status.denied');
          this.qrScanner.openSettings();
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          console.log('status.denied');
          // camera permission was permanently denied
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

}
