import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-announcements-news',
  templateUrl: './announcements-news.component.html',
  styleUrls: ['./announcements-news.component.scss']
})
export class AnnouncementsNewsComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  constructor() { }

  ngOnInit(): void { }
}
