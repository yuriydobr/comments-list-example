import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentItem } from '../_models/comment-model';

@Component({
  selector: 'app-comments-list-item',
  templateUrl: './comments-list-item.component.html',
  styleUrls: ['./comments-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsListItemComponent implements OnInit {
  @Input() comment!: CommentItem;
  @Input() tags: string[] = [];
  @Input() isCreationLine = false;

  @Output() onCommentEdit = new EventEmitter();
  @Output() onCommentAdd = new EventEmitter();
  @Output() onCommentDelete = new EventEmitter();

  editForm!: FormGroup;
  isEditable: boolean = false;

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      tags: new FormControl([])
    });
  }

  startOrCancelEdit(isStart: boolean) {
    this.editForm.reset({
      title: isStart ? this.comment.title : '',
      text: isStart ? this.comment.text : '',
      tags: isStart ? this.comment.tags : []
    });
    this.isEditable = !this.isEditable;
  }

  saveChanges() {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.onCommentEdit.emit({id: this.comment.id, ...this.editForm.value});
      this.isEditable = !this.isEditable;
    }
  }

  deleteItem() {
    this.onCommentDelete.emit({id: this.comment.id, ...this.editForm.value});
  }

  addItem() {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.onCommentAdd.emit(this.editForm.value);
      this.editForm.reset({
        title: '',
        text: '',
        tags: []
      });
    }
  }

}
