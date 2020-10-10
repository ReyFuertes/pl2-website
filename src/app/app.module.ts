import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { AnnouncementsNewsComponent } from './components/announcements-news/announcements-news.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DownloadComponent } from './components/download/download.component';
import { FeaturesComponent } from './components/features/features.component';
import { GuideComponent } from './components/guide/guide.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppEffect } from './store/effects/app.effects';
import { reducers } from './store/app.reducer';
import { AuthGuard } from './services/auth-guard';
import { LoaderInterceptor, LoaderService } from './services/loader.interceptor';
import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'ng-block-ui';

const primengModules = [
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AnnouncementsNewsComponent,
    RegistrationComponent,
    DownloadComponent,
    FeaturesComponent,
    GuideComponent,
    AccountInfoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...primengModules,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffect]),
    BlockUIModule.forRoot()
  ],
  providers: [
    AuthService,
    RegisterService,
    AuthGuard,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
