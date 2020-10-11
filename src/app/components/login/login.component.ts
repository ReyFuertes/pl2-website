import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/login.service';
import { GenericDestroyComponent } from 'src/app/shared/generics/generic-destroy';
import { loginAction, logoutAction, resetLoginCountAction } from 'src/app/store/actions/main.actions';
import { AppState } from 'src/app/store/app.reducer';
import { getHasLoginSelector, getLoginFailedCountSelector, getLoginFailedMsgSelector } from 'src/app/store/selectors/main.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends GenericDestroyComponent implements OnInit {
  public form: FormGroup;
  public invalidCreds: boolean = false;
  public hasLogin: boolean;
  public loginCount: number = 0;

  constructor(private store: Store<AppState>, private router: Router, private fb: FormBuilder, private loginSrv: AuthService) {
    super();
    this.form = this.fb.group({
      login: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      password: [null, Validators.required]
    });
    this.store.pipe(select(getHasLoginSelector)).subscribe(res => {
      if (res === true) {
        this.hasLogin = res;
      } else if (res === false) {
        this.hasLogin = null;
      }
    });

    this.store.pipe(select(getLoginFailedMsgSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res) {
          this.invalidCreds = true;
        } else this.invalidCreds = false;
      })

    this.store.pipe(select(getLoginFailedCountSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        this.loginCount = res;
      })
  }
  ngOnInit(): void { }

  public onLogin(): void {
    if (this.form.valid && !this.loginAttemptReached) {
      this.store.dispatch(loginAction({ payload: this.form.value }));
    } else {
      this.invalidCreds = true;
      timer(300000).subscribe(() => {
        this.store.dispatch(resetLoginCountAction());
      });
    }
  }

  public get loginAttemptReached(): boolean {
    return this.loginCount >= 5;
  }

  public onLogout(): void {
    const token: string = JSON.parse(localStorage.getItem('token'));
    if (token) {
      this.store.dispatch(logoutAction());
      this.hasLogin = null;
    }
  }
}