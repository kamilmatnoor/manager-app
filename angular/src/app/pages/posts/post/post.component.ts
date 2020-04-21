import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any = {}
  comments: any = []

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.postsService.getAllCommentsByPostId(params.postId).then(data => {
        this.comments = data
      })

      this.postsService.getPostById(params.postId).then(data => {
        this.post = data
        console.log(data)
      })
    })
  }

  onBackClicked() {
    this.router.navigate([`posts`], {
      queryParams: {}
    })
  }
}
