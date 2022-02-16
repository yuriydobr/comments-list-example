import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentItem } from './_models/comment-model';

@Injectable()
export class CommentsService {
  private sourceURL = 'http://localhost:3000/comments';

  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<CommentItem[]> {
    return this.httpClient.get<CommentItem[]>(this.sourceURL);
  }

  create(comment: CommentItem) {
    return this.httpClient.post<CommentItem>(this.sourceURL, comment);
  }

  update(id: number, comment: CommentItem): Observable<CommentItem> {
    return this.httpClient.put<CommentItem>(this.sourceURL + '/' + id, comment);
  }

  delete(id: number) {
    return this.httpClient.delete(this.sourceURL + '/' + id);
  }
}
