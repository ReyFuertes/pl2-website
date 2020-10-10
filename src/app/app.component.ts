import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from './services/loader.interceptor';
import { AppState } from './store/app.reducer';
import { getHasLoginSelector } from './store/selectors/main.selectors';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { clearVariablesAction } from './store/actions/main.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public imgPath: string = environment.imgPath;
  public title = 'Pinoy Lineage Website';
  public hasLogin: boolean;
  public isLoading: boolean = false;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private router: Router, public loaderSrv: LoaderService, private store: Store<AppState>, private cdRef: ChangeDetectorRef) {
    this.store.subscribe(res => console.log(res))

    this.store.pipe(select(getHasLoginSelector)).subscribe(res => {
      if (res === true) {
        this.hasLogin = res;
      } else {
        this.hasLogin = null;
      }
    });
  }

  ngOnInit() {
    this.loaderSrv.isLoading.subscribe(res => {
      this.isLoading = res;
      if (this.isLoading) this.blockUI.start('Loading...');
      else this.blockUI.stop();

    })
  }

  public onRegister(): void {
    this.router.navigateByUrl('registration');
    this.store.dispatch(clearVariablesAction());
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
