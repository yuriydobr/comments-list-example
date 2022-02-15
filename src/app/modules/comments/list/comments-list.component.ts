import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommentsService } from '../comments.service';
import { CommentItem } from '../_models/comment-model';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsListComponent implements OnInit, OnDestroy {
  comments!: CommentItem[];
  uniqueTags: string[] = [];
  tagToFilter: string = '';

  destroy$ = new Subject();

  constructor(private commentsService: CommentsService,
              private cdr: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.commentsService.setCommentsList(this.activatedRoute.snapshot.data.initialList);

    this.commentsService.commentsList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.comments = data;
        this.prepareTagsList();
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  commentCRUD(event: any) {
    let comments = [...this.comments];

    switch (event.type) {
      case 'edit':
        const currentId = comments.findIndex((item) => item.id === event.data.id);
        comments[currentId].title = event.data.title;
        comments[currentId].text = event.data.text;
        comments[currentId].tags = event.data.tags;
        this.commentsService.setCommentsList(comments);
        this.prepareTagsList();
        return;

      case 'add':
        const id = (!!comments.length) ? comments[comments.length - 1].id + 1 : 1;
        comments.push({id, ...event.data});
        this.commentsService.setCommentsList(comments);
        this.prepareTagsList();
        return;

      case 'delete':
        comments = comments.filter((item: any) => item.id !== event.data.id);
        this.commentsService.setCommentsList(comments);
        this.prepareTagsList();
        return;
    }
  }

  private prepareTagsList() {
    let allTags: any[] = [];
    this.comments.forEach((comment: any) => {
      allTags = [...allTags, ...comment.tags];
    });
    this.uniqueTags = [...new Set(allTags)];
  }

}
