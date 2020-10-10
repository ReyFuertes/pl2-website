import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registerSuccess: boolean = false;
  constructor() { }

  ngOnInit(): void { }

  public onRegister(): void {
    this.registerSuccess = true;
  }
}
