import { Component, OnInit, ViewChild } from '@angular/core';
import { Diary } from '../models';
import { FunctionService } from '../function.service';
import { Router } from '@angular/router';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  posts:Diary[]

  preloader: boolean;

  selectedMood:string


  constructor(private diaryService: DiaryService,private router: Router){
    this.posts = []
    this.preloader = true;
    this.fetchData().then(() => {
      this.preloader = false;
    });
    this.selectedMood = ""

  }
  ngOnInit(): void {
    this.getDiaries()
    
  }
  sortPostsByMood() {
    if (this.selectedMood == "") {
      this.getDiaries()
    } else {
      // alert(this.posts[2].mood)

      // this.posts = this.posts.filter(post => post.mood == Number(this.selectedMood));
      this.diaryService.getDiaries().subscribe((data) => {
        this.posts = data.filter((diary) => diary.mood == Number(this.selectedMood))
        return
      })
    }
  }
  private fetchData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  getDiaries(){
    this.diaryService.getDiaries().subscribe((data) => {
      this.posts = data.filter((diary) => diary.isPublic == true)
      return
    })
  }
  
  goPrevPage(){
    window.history.back()
  }
  searchTerm: string = '';
  items: any[] = [];
  filteredItems: any[] = []; 
  filterItems() {
    if(this.searchTerm == ""){
      this.getDiaries()
    }
    else{
      this.diaryService.getDiaries().subscribe((data) => {
        this.posts = data.filter((diary) => diary.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      })
      // this.posts = this.posts.filter((diary) => diary.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      // this.searchTerm = ""
    }
    

  }
}
