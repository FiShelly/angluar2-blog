import { Injectable } from '@angular/core';
import {Author} from '../class-model/Author';
import {Headers, Http,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MyAuthorService {

  private baseUrl = '/user';

  constructor(private http: Http) { }

  getAuthor(): Promise<Author> {
    let url = `${this.baseUrl}/getAuthor`;
    let body = JSON.stringify({
      loginId : "fishelly"
    });
    let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,body,options)
      .toPromise()
      .then(response =>  response.json().author as Author).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
