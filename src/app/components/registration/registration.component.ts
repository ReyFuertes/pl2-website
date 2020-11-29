import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { registerAction } from 'src/app/store/actions/main.actions';
import { getHasLoginSelector, getHasRegisteredSelector, getRegisterFailedMsgSelector } from 'src/app/store/selectors/main.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registerSuccess: boolean = false;
  public form: FormGroup;
  public registerFailedMsg: string;

  constructor(private router: Router, private store: Store<AppState>, private fb: FormBuilder, private regSrv: RegisterService) {
    this.form = this.fb.group({
      login: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      password: [null, Validators.required],
      email: [null, Validators.required]
    });

    this.store.pipe(select(getHasRegisteredSelector)).subscribe(res => {
      this.registerSuccess = res;
    });

    this.store.pipe(select(getRegisterFailedMsgSelector)).subscribe(res => {
      this.registerFailedMsg = res;
      setTimeout(() => {
        this.resetForm();
      }, 1000);
    });
  }

  ngOnInit(): void { }

  public onRegister(): void {
    if (this.form.valid) {
      const payload = this.form.value;
      this.store.dispatch(registerAction({ payload }));
    }
  }

  private resetForm(): void {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.setErrors(null);
    this.form.updateValueAndValidity();
  }
}
