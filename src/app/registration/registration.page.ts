import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { PopupPage } from '../popup/popup.page';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  isOK: any;
  photo: string;
  form: FormGroup;
  submitted = false;
  skills: string[] = [];

  constructor(
    public modalController: ModalController,
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

  ngOnInit() {
    setInterval(() => {
      console.log('running');
      this.photo = this.db.getImg();
    }, 4000);
  }

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

  resetForm() {
    this.form.reset();
    this.skills = [];
  }

  saveFormData(form: FormGroup) {
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
    this.resetForm();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: PopupPage,
      componentProps: {
        name: 'Form',
        type: 'modal',
      },
      cssClass: 'modal-css',
    });
    return await modal.present();
  }

  //SQLite methods
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
}
