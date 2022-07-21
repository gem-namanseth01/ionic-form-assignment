import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SetimagePopupPage } from '../setimage-popup/setimage-popup.page';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  isOK : any;
  photo: string;

  skills : string = "";
  addingSkills(event) { //formArray formControllName 
    this.skills += '[' + event.target.value + '], ';
    var input1 = <HTMLInputElement>(document.getElementById('skills1'));
    input1.value="";
  }

  emptyInput() {
    var input1 = <HTMLInputElement>(document.getElementById('tempAddress'));;
    input1.value="";
  }

  constructor(public modalController : ModalController,
    public setImagePopup : SetimagePopupPage) {
     
    
     }

  async openModal() {
    const modal = await this.modalController.create({
      component: SetimagePopupPage,
      componentProps: {
        "name": "Form",
        "type": "modal"
      }, 
      cssClass: 'modal-css'
    });
    return await modal.present();
  }
  
  

  ngOnInit() {
    this.photo = 'https://i.pravatar.cc/150';
  }

}
