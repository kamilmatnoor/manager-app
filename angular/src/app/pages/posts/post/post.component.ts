import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  post: Post = {
    userId: null,
    id: null,
    title: '',
    body: ''
  }

  comments: Array<Comment> = []

  filterForm: FormGroup

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      name: [''],
      email: [''],
      body: ['']
    })
    this.route.queryParams.subscribe(params => {
      this.postsService.getAllCommentsByPostId(params.postId).then(data => {
        this.comments = data
      }, (err) => {
        this.comments = []
      })

      this.postsService.getPostById(params.postId).then(data => {
        this.post = data
      }, (err) => {
        this.post = {
          userId: null,
          id: null,
          title: '',
          body: ''
        }
      })
    })
  }

  onBackClicked(): void {
    this.router.navigate([`posts`], {
      queryParams: {}
    })
  }

  onSearchClicked(): void {
    let name = this.filterForm.value.name
    let email = this.filterForm.value.email
    let body = this.filterForm.value.body

    //Always get list from api
    this.postsService.getAllCommentsByPostId(this.post.id).then(data => {
      for (let i = 0; i < data.length; ++i) {
        if (name != '') {
          if (data[i].name.includes(name)) {
            //skip remove
          } else {
            data.splice(i, 1) //removed current record
            --i // reduced next index by 1
            continue //immediately jump into next index iteration
          }
        }

        if (email != '') {
          if (data[i].email.includes(email)) {
            //skip remove
          } else {
            data.splice(i, 1)
            --i
            continue
          }
        }

        if (body != '') {
          if (data[i].body.includes(body)) {
            //skip remove
          } else {
            data.splice(i, 1)
            --i
            continue
          }
        }
      }
      this.comments = data
    }, (err) => {
      this.comments = []
    })
  }

  onClearClicked(): void {
    this.filterForm.setValue({
      name: '',
      email: '',
      body: ''
    })
    this.postsService.getAllCommentsByPostId(this.post.id).then(data => {
      this.comments = data
    }, (err) => {
      this.comments = []
    })
  }
}

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface Comment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}
