import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IResponseDetail } from 'src/app/models/detail.model';
import { AppState } from 'src/app/store/app.reducer';
import { getCharacterDetailSelector } from 'src/app/store/selectors/character.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public $characterDetail: Observable<IResponseDetail>;
  public cols: string[] = ['account_name', 'char_name', 'level'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.$characterDetail = this.store.pipe(select(getCharacterDetailSelector));
   }

  public fmtOnlineValue(value: any): any {
    return Number(value) / 1000;
  }
}
