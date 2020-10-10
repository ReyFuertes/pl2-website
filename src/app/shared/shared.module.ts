import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TopMenuComponent
  ],
  imports: [ CommonModule ],
  exports: [
    SidebarComponent,
    TopMenuComponent
  ],
  providers: [],
})
export class SharedModule {}