
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { AnnouncementsNewsComponent } from './components/announcements-news/announcements-news.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DownloadComponent } from './components/download/download.component';
import { FeaturesComponent } from './components/features/features.component';
import { GuideComponent } from './components/guide/guide.component';
import { MainComponent } from './components/main/main.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [{
  path: '',
  component: AnnouncementsNewsComponent
}, {
  path: 'registration',
  component: RegistrationComponent
}, {
  path: 'download',
  component: DownloadComponent
}, {
  path: 'features',
  component: FeaturesComponent
}, {
  path: 'newbie-guide',
  component: GuideComponent
}, {
  path: 'account-info',
  component: AccountInfoComponent,
  canActivate: [AuthGuard]
}, {
  path: 'change-password',
  component: ChangePasswordComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
