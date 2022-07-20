import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  isOK : any;
  

  skills : string = "";
  addingSkills(event) {
    this.skills += '[' + event.target.value + '], ';
    var input1 = <HTMLInputElement>(document.getElementById('skills1'));
    input1.value="";
  }

  emptyInput() {
    var input1 = <HTMLInputElement>(document.getElementById('tempAddress'));;
    input1.value="";
  }

  constructor() { }

  ngOnInit() {
    
  }

}
