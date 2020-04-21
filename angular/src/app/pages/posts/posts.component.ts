import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: any = []

  constructor(
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.postsService.getAllPosts().then(data => {
      this.posts = data
    })
  }

  onPostClicked(id: any) {
    this.router.navigate([`post`], {
      queryParams: {
        postId: id
      }
    })
  }
}
