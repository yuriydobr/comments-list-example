import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsListComponent } from './list/comments-list.component';

export const commentsRoutes: Routes = [
  {
    path: '',
    component: CommentsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(commentsRoutes)],
  exports: [RouterModule]
})

export class CommentsRoutingModule {

}
