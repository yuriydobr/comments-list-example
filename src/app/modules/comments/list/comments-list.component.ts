import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap} from 'rxjs/operators';
import { CommentsService } from '../comments.service';
import { CommentItem } from '../_models/comment-model';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsListComponent implements OnInit {
  comments$!: Observable<CommentItem[]>;
  currentId!: number;
  uniqueTags: string[] = [];
  tagToFilter: string = '';

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.comments$ = this.commentsService.getList().pipe(
      tap((data => {
        this.prepareTagsList(data);
        this.setCurrentId(data);
      }))
    );
  }

  addItem(event: any) {
    const payload = {...{id: this.currentId + 1}, ...event};
    this.comments$ = this.commentsService.create(payload)
      .pipe(
        switchMap(() => this.commentsService.getList()),
        tap(data => {
          this.prepareTagsList(data);
          this.setCurrentId(data);
        })
      );
  }

  editItem(event: any) {
    this.comments$ = this.commentsService.update(event.id,  event)
      .pipe(
        switchMap(() => this.commentsService.getList()),
        tap(data => {
          this.prepareTagsList(data);
          this.setCurrentId(data);
        })
      );
  }

  deleteItem(event: any) {
    this.comments$ = this.commentsService.delete(event.id)
      .pipe(
        switchMap(() => this.commentsService.getList()),
        tap(data => {
          this.prepareTagsList(data);
          this.setCurrentId(data);
        })
      );
  }

  private prepareTagsList(list: CommentItem[]) {
    let allTags: any[] = [];
    list.forEach((comment: any) => {
      allTags = [...allTags, ...comment.tags];
    });
    this.uniqueTags = [...new Set(allTags)];
  }

  private setCurrentId(list: CommentItem[]) {
    this.currentId = list[list.length-1].id;
  }

}
