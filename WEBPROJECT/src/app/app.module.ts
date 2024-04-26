import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiaryComponent } from './diary/diary.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { TopBarMainComponent } from './top-bar-main/top-bar-main.component';
import { TopBarStartComponent } from './top-bar-start/top-bar-start.component';
import { StartComponent } from './start/start.component';
import { FormsModule } from '@angular/forms';
import { DiaryDetailsComponent } from './diary-details/diary-details.component';
import {RouterModule} from '@angular/router';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    DiaryComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    FooterComponent,
    TopBarMainComponent,
    TopBarStartComponent,
    StartComponent,
    DiaryDetailsComponent,
    PreLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
