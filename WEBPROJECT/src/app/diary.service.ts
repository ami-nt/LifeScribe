import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diary } from './models';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  loaded_diary:Diary


  BASE_URL = 'http://localhost:8000'

  constructor(private client: HttpClient) {
    this.loaded_diary = {
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
  }

  getDiaries():Observable<Diary[]>{
    return this.client.get<Diary[]>(
      `${this.BASE_URL}/api/diaries/`
    )
  }
  getDiariesOfUser(authorId:number):Observable<Diary[]>{
    return this.client.get<Diary[]>(
      `${this.BASE_URL}/api/diaries_of_user/${authorId}/`
    )
  }

  getDiary(diary_id:number):Observable<Diary>{
    return this.client.get<Diary>(
      `${this.BASE_URL}/api/diaries/${diary_id}/`
    )
  }
  postDiary(diaryTitle:string,body:string,description:string,privacy:boolean,likes:number,id:number,usernameMain:string,image:string,bold:boolean,italic:boolean,underline:boolean,fontSize:string,fontColor:string,fontFamily:string,mood:number):Observable<Diary>{
    return this.client.post<Diary>(
      `${this.BASE_URL}/api/diaries/`,
      {title:diaryTitle,body:body,description:description,isPublic:privacy,likes:likes,authorId:id,authorName:usernameMain,image:image,bold:bold,italic:italic,underline:underline,fontSize:fontSize,fontColor:fontColor,fontFamily:fontFamily,mood:mood}
    )
  }
  // postComment(newComment:string, username:string, userId:number, cretaedAt:string, diary_id:number):Observable<Commentary>{
  //   return this.client.post<Commentary>(
  //     `${this.BASE_URL}/api/commentaries/`, {
  //       body: newComment, username: username, userId: userId, createdAt:cretaedAt, diary: diary_id
  //     }
  //   )
  // }
  likePost(diary:Diary):Observable<any>{
    diary.likes = diary.likes + 1
    // alert(diary.likes)
    return this.client.put(
      `${this.BASE_URL}/api/diaries/${diary.id}/`,diary
    )
  }
  
  deleteDiary(diary_id:number):Observable<any>{
    console.log(diary_id)
    return this.client.delete(
      `${this.BASE_URL}/api/diaries/${diary_id}/`
    )
  }



}
