import { Injectable } from '@angular/core';
import {Comment} from '../class-model/Comment';
import {Headers, Http,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MyCommentService {

  private baseUrl = '/comment';

  constructor(private http: Http) { }

  getCommentByArticle(article:Object): Promise<Comment[]> {
    let url = `${this.baseUrl}/page/query`;
    let body = JSON.stringify({query:{
      article:article
    }});
    let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,body,options)
      .toPromise()
      .then(response =>  response.json().comments as Comment[]).catch(this.handleError);
  }

  addComment(comment:Comment):Promise<any>{
    let url = `${this.baseUrl}/save`;
    let body = JSON.stringify({comment:comment});
    let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,body,options)
      .toPromise()
      .then(response =>  response.json().comment as Comment).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
