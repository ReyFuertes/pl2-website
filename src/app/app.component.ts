import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from './services/loader.interceptor';
import { AppState } from './store/app.reducer';
import { getHasLoginSelector } from './store/selectors/main.selectors';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { clearVariablesAction, getgrandBossAction, getOnlineCountAction, getPkStatsAction, getPvpStatsAction } from './store/actions/main.actions';
import { getOnlineCountSelector, getPkKillsSelector, getPvpKillsSelector } from './store/selectors/character.selectors';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public imgPath: string = environment.imgPath;
  public title = 'Lineage PH';
  public hasLogin: boolean;
  public isLoading: boolean = false;
  public selMenu: string;
  public onlineCount: any;
  public now$: Observable<Date>;
  public $pvpKills: Observable<any>;
  public $pkKills: Observable<any>;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private router: Router, public loaderSrv: LoaderService, private store: Store<AppState>, private cdRef: ChangeDetectorRef) {
    this.store.subscribe(res => console.log(res))

    this.now$ = interval(1000).pipe(
      startWith(null),
      map(() => new Date())
    );

    this.store.dispatch(getOnlineCountAction());
    this.store.dispatch(getPvpStatsAction());
    this.store.dispatch(getPkStatsAction());
    this.store.dispatch(getgrandBossAction());
  }

  ngOnInit() {
    this.store.pipe(select(getHasLoginSelector)).subscribe(res => {
      if (res === true) {
        this.hasLogin = res;
      } else {
        this.hasLogin = null;
      }
    });

    this.store.pipe(select(getOnlineCountSelector)).subscribe(res => {
      if(res) {
        this.onlineCount = res;
      } else {
        this.onlineCount = 0;
      }
    });
    
    
    this.$pkKills = this.store.pipe(select(getPkKillsSelector));
    this.$pvpKills = this.store.pipe(select(getPvpKillsSelector));

    this.loaderSrv.isLoading.subscribe(res => {
      this.isLoading = res;
      if (this.isLoading) this.blockUI.start('Loading...');
      else this.blockUI.stop();

    })
  }

  public onRegister(): void {
    this.store.dispatch(clearVariablesAction());
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
