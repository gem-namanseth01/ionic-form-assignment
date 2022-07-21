import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-setimage-popup',
  templateUrl: './setimage-popup.page.html',
  styleUrls: ['./setimage-popup.page.scss'],
})
export class SetimagePopupPage implements OnInit {
  base64Image: string;
  @Input() name:string;
  @Input() type:string;
  constructor(private modalController: ModalController, private camera: Camera, private file: File) {
   }

  ngOnInit() {
    
  }
  async closeModal() {
    await this.modalController.dismiss(close);
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG
  }
  
  async takePhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }
    await this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      
    }, (err) => {

  
    });
  }

}
