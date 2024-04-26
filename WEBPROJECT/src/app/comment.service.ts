import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentary } from './models';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  BASE_URL = 'http://localhost:8000'

  constructor(private client: HttpClient) { }

  getComments(diary_id:number):Observable<Commentary[]>{
    return this.client.get<Commentary[]>(
      `${this.BASE_URL}/api/diaries/${diary_id}/commentaries/`
    )
  }

  postComment(newComment:string, username:string, userId:number, cretaedAt:string, diary_id:number):Observable<Commentary>{
    return this.client.post<Commentary>(
      `${this.BASE_URL}/api/commentaries/`, {
        body: newComment, username: username, userId: userId, createdAt:cretaedAt, diary: diary_id
      }
    )
  }
}
