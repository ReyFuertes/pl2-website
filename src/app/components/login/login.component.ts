import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/login.service';
import { loginAction, logoutAction } from 'src/app/store/actions/main.actions';
import { AppState } from 'src/app/store/app.reducer';
import { getHasLoginSelector } from 'src/app/store/selectors/main.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public invalidCreds: boolean = false;
  public hasLogin: boolean;

  constructor(private store: Store<AppState>, private router: Router, private fb: FormBuilder, private loginSrv: AuthService) {
    this.form = this.fb.group({
      login: [null, Validators.compose([ Validators.required, Validators.pattern('^[a-zA-Z0-9]+$') ])],
      password: [null, Validators.required]
    });
    this.store.pipe(select(getHasLoginSelector)).subscribe(res => {
      if (res === true) {
        this.hasLogin = res;
        this.invalidCreds = false;
      } else if (res === false) {
        this.invalidCreds = true;
        this.hasLogin = null;
      }
    });
  }
  ngOnInit(): void { }

  public onLogin(): void {
    if (this.form.valid) {
      this.store.dispatch(loginAction({ payload: this.form.value }));
    } else {
      this.invalidCreds = true
    }
  }

  public onLogout(): void {
    const token: string = JSON.parse(localStorage.getItem('token'));
    if (token) {
      this.store.dispatch(logoutAction());
      this.hasLogin = null;
    }
  }
}