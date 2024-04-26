import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Diary, User } from '../models';
import { FunctionService } from '../function.service';
import { DiaryService } from '../diary.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  @ViewChild('imagePreview') imagePreview: ElementRef;

  user:User 

  image:string


  preloader: boolean; 

  diaries:Diary[]

  isOpenedAvaWindow:boolean


  constructor(private functionService : FunctionService,private diaryService: DiaryService,private route:ActivatedRoute,private router: Router) {
    this.preloader = true;
    
    this.fetchData().then(() => {
      this.preloader = false;
    });
    this.isOpenedAvaWindow = false
    this.imagePreview = new ElementRef(null);
    this.diaries = []
    this.image = "https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-02/64/burglar-white-male-512.png"
    this.user = {
      id:0,
      userName:"",
      password:"",
      mail:"",
    }
    this.functionService.changeNameMail()
    this.user.id = this.functionService.id
    this.user.mail = this.functionService.mailMain
    this.user.userName = this.functionService.usernameMain
    // this.image = this.functionService.image
  }
  ngOnInit(): void {
    this.functionService.changeNameMail()
    this.user.id = this.functionService.id
    this.user.mail = this.functionService.mailMain
    this.user.userName = this.functionService.usernameMain
    // alert(this.functionService.image)
    // this.image = this.functionService.image

    // this.getDiaries()
    this.getDiariesById()
  }

  private fetchData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }


  changePicture(){
    this.functionService.changeNameMail()
    this.functionService.changePicture(this.image).subscribe(() => {
    })
  }
  getDiaries(){
    this.diaryService.getDiaries().subscribe((data) => {
      this.diaries = data.filter((diary) => diary.authorId == this.user.id)
    })
  }

  getDiariesById(){
    this.diaryService.getDiariesOfUser(this.user.id).subscribe((data) => {
      this.diaries = data
    })
  }

  openAvatarSelector(){
    this.isOpenedAvaWindow = true
  }

  closeAvatarSelector(ava:string){
    this.imagePreview.nativeElement.src = ava
    this.image = ava
    this.changePicture()
    this.isOpenedAvaWindow = false
  }

  editDiary(diary:Diary){
    this.diaryService.loaded_diary = diary
    // this.router.navigate(['/diary']);
  }

  deleteDiary(diary_id:number){
    this.diaryService.deleteDiary(diary_id).subscribe(() => {
      this.diaries = this.diaries.filter((diary) => diary.id !== diary_id)
    })
  }

}
