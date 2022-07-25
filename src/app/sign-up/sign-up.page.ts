import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormGroup, Validators } from '@angular/forms';
import { SetimagePopupPage } from '../setimage-popup/setimage-popup.page';
import { FormArray } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  isOK: any;
  photo: string;
  form: FormGroup;
  submitted = false;
  skills: string[] = [];
  addingSkills(event) {
    //formArray formControllName
    this.skills.push(event.target.value);
    var input1 = <HTMLInputElement>document.getElementById('skills1');
    input1.value = '';
  }

  emptyInput() {
    var input1 = <HTMLInputElement>document.getElementById('tempAddress');
    input1.value = '';
  }

  constructor(
    public modalController: ModalController,
    public setImagePopup: SetimagePopupPage,
    public fb: FormBuilder,
    public db: DatabaseService
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      gender: [null, Validators.required],
      dob: [null, Validators.required],
      permanentAddress: [null, Validators.required],
      temporaryAddress: [null],
      skills: this.fb.array([]),
    });
  }

  saveFormData() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('INVALID');
      return;
    }
    console.log('success');
    this.form.value.skills = this.skills;
    alert('SUCCESS!!:- \n\n' + JSON.stringify(this.form.value, null, 5));
    //alert(this.skills);
    this.createUser();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SetimagePopupPage,
      componentProps: {
        name: 'Form',
        type: 'modal',
      },
      cssClass: 'modal-css',
    });
    return await modal.present();
  }

  showUsers() {
    this.db.getAllusers();
  }

  createUser() {
    console.log(
      this.form.value.name,
      this.form.value.gender,
      this.form.value.permanentAddress,
      this.form.value.temporaryAddress,
      this.form.value.skills
    );
    this.db.addItem(
      this.form.value.name,
      this.form.value.gender,
      this.form.value.dob,
      this.form.value.permanentAddress,
      this.form.value.temporaryAddress,
      this.form.value.skills
    );
  }

  dropTable() {
    this.db.dropDatabase();
  }

  ngOnInit() {
    setInterval(() => {
      console.log('running');
      this.photo = this.db.getImg();
    }, 4000);
  }
}
