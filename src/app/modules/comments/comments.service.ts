import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentItem } from './_models/comment-model';

@Injectable()
export class CommentsService {
  public commentsList = new BehaviorSubject([] as CommentItem[]);
  public commentsList$ = this.commentsList.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<CommentItem[]> {
    const source = '../../../assets/mocks/comments-list.json';
    return this.httpClient.get(source) as Observable<CommentItem[]>;
  }

  setCommentsList(list: CommentItem[]): void {
    this.commentsList.next(list as CommentItem[]);
  }

}
