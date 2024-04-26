import { Component, OnInit } from '@angular/core';
import { Commentary, Diary } from '../models'
import { CommentService } from '../comment.service';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from '../function.service';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-diary-details',
  templateUrl: './diary-details.component.html',
  styleUrls: ['./diary-details.component.css']
})
export class DiaryDetailsComponent implements OnInit{
  comments: Commentary [] = [];
  newComment: string = '';
  diary_id: number;
  diary : Diary 
  preloader: boolean;

  constructor( private commentService: CommentService,private route: ActivatedRoute, private functionService : FunctionService,private diaryService: DiaryService){
    this.diary_id = 0
    this.diary = {
      id: -1,
      title: '',
      body:'',
      description: '',
      isPublic: false,
      likes: 0,
      authorId: 0,
      authorName: '',
      image: '',
      bold: false,
      italic: false,
      underline: false,
      fontSize: '24',
      fontColor: '',
      fontFamily: '',
      mood: -1
    }
    this.preloader = true;
    this.fetchData().then(() => {
      this.preloader = false;
    });
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.diary_id = Number(routeParams.get('diaryId'))
    this.getComments(this.diary_id)
    this.functionService.changeNameMail()
    this.getDiary()
    // console.log(this.comments)
  }
  private fetchData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  getComments(diary_id:number){
    this.commentService.getComments(diary_id).subscribe((comments) => {
      this.comments = comments
    })
  }

  postComment(newComment:string){
    let data = new Date();
    this.commentService.postComment(this.newComment, this.functionService.usernameMain, this.functionService.id, String(data), this.diary_id).subscribe(() => {
      this.newComment = ""
      this.getComments(this.diary_id)
    })

    
  }
  

  likePost(){
    this.diaryService.likePost(this.diary).subscribe(() => {
      
    })
    this.getDiary()
  }

  getDiary(){
    this.diaryService.getDiary(this.diary_id).subscribe((data) => {
      this.diary = data
    })
  }

  returnBack(){
    window.history.back()
  }
}
