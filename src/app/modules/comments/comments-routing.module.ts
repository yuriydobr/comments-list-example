import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsListComponent } from './list/comments-list.component';
import { CommentsResolver } from './comments.resolver';

export const commentsRoutes: Routes = [
  {
    path: '',
    component: CommentsListComponent,
    resolve: {
      initialList: CommentsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(commentsRoutes)],
  exports: [RouterModule]
})

export class CommentsRoutingModule {

}
