import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPosts(): any {
    return new Promise((resolve, reject) => {
      this.http.get(`https://jsonplaceholder.typicode.com/posts`).subscribe(res => {
        if (!res) {
          reject(true)
        }
        resolve(res)
      },
        err => {
          console.error(err)
          reject(true)
        })
    })
  }

  getPostById(id): any {
    return new Promise((resolve, reject) => {
      this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`).subscribe(res => {
        if (!res) {
          reject(true)
        }
        resolve(res)
      },
        err => {
          console.error(err)
          reject(true)
        })
    })
  }

  getAllCommentsByPostId(id): any {
    return new Promise((resolve, reject) => {
      this.http.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).subscribe(res => {
        if (!res) {
          reject(true)
        }
        resolve(res)
      }, err => {
        console.error(err)
        reject(true)
      })
    })
  }
}
