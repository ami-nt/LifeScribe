import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TopBarStartComponent } from './top-bar-start/top-bar-start.component';
import { TopBarMainComponent } from './top-bar-main/top-bar-main.component';
import { DiaryComponent } from './diary/diary.component';
import { FooterComponent } from './footer/footer.component';
import { DiaryDetailsComponent } from './diary-details/diary-details.component';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';

const routes: Routes = [
  {path:'start',component:StartComponent},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'start',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'top-bar-start',component:TopBarStartComponent},
  {path:'top-bar-main',component:TopBarMainComponent},
  {path:'diary',component:DiaryComponent},
  {path:'footer',component:FooterComponent},
  {path:'diaryDetails/:diaryId',component:DiaryDetailsComponent},

  // {path:'preLoader',component:PreLoaderComponent},
  {
    path:'preloader',
    component:StartComponent,
    resolve: {data: PreLoaderComponent}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
