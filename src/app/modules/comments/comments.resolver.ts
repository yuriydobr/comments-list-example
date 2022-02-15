import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsResolver implements Resolve<any> {
  constructor(private commentsService: CommentsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.commentsService.getList();
  }
}
