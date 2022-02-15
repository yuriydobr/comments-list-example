import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { CommentsListComponent } from './list/comments-list.component';
import { CommentsListItemComponent } from './list-item/comments-list-item.component';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    TranslateModule,
    CommentsRoutingModule,
    SharedModule
  ],
  declarations: [
    CommentsListComponent,
    CommentsListItemComponent
  ],
  providers: [
    CommentsService,
    CommentsResolver
  ]
})

export class CommentsModule {}
