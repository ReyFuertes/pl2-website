import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/login.service';
import { GenericDestroyComponent } from 'src/app/shared/generics/generic-destroy';
import { matchValues } from 'src/app/shared/util/password-match';
import { changePasswordAction, clearChangePasswordAction } from 'src/app/store/actions/main.actions';
import { AppState } from 'src/app/store/app.reducer';
import { getPasswordChangedSelector } from 'src/app/store/selectors/main.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends GenericDestroyComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  public passwordChangedSuccess: boolean = true;

  constructor(private store: Store<AppState>, private router: Router, private fb: FormBuilder, private loginSrv: AuthService) {
    super();
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      currentPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmNewPassword: [null, [Validators.required, matchValues('newPassword')]],
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(getPasswordChangedSelector), take(2)).subscribe(res => {
      this.passwordChangedSuccess = res;

      setTimeout(() => {
        this.store.dispatch(clearChangePasswordAction());
        console.log('Clearing cpwd');
      }, 5000);
    })
  }

  public onHide(): void {
    console.log('hide')
  }

  public onChange(): void {
    if (this.form.valid) {
      this.store.dispatch(changePasswordAction({ payload: this.form.value }));
    }
  }
}
