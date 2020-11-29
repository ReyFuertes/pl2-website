import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getgrandBossSelector } from 'src/app/store/selectors/character.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-raidboss-status',
  templateUrl: './raidboss-status.component.html',
  styleUrls: ['./raidboss-status.component.scss']
})
export class RaidbossStatusComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public bossData: Array<{ label: string, value: any, icon?: string }> = [
    {
      label: 'Queen Ant',
      value: 29001,
      icon: 'antqueen.png'
    },
    {
      label: 'Core',
      value: 29006,
      icon: 'core.png'
    },
    {
      label: 'Orfen',
      value: 29014,
      icon: 'orfen.png'
    },
    {
      label: 'Baium',
      value: 29020,
      icon: 'baium.png'
    },
    {
      label: 'Valakas',
      value: 29028,
      icon: 'valakas.png'
    },
    {
      label: 'Antharas',
      value: 29068,
      icon: 'antharas.png'
    },
    {
      label: 'Beleth',
      value: 29118,
      icon: 'beleth.png'
    },
    {
      label: 'Zaken',
      value: 29176,
      icon: 'zaken.png'
    }
  ];
  public bosses: Array<{ label: string, value: any }>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.pipe(select(getgrandBossSelector)).subscribe((res: any) => {
      if (res) {
        this.bosses = res.map(r => {
          const d = this.bossData.filter(b => b.value === r.id).shift();
          return {
            label: d.label,
            value: r.status == 0 ? 'Alive' : 'Dead',
            icon: d.icon
          }
        })
      }
    });
  }

  public isAlive(value: any): boolean {
    return value == 'Alive' ? true : false;
  }
}
