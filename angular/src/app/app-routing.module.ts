import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './pages/posts/post/post.component';

const routes: Routes = [{
	path: '',
	component: PostsComponent
}, {
	path: 'posts',
	component: PostsComponent
}, {
	path: 'post',
	component: PostComponent
}];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
