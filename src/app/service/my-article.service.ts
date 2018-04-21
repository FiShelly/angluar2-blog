import {Injectable} from '@angular/core';
import {Article} from '../class-model/Article';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MyArticleService {

  private baseUrl = '/article';

  constructor(private http: Http) {
  }

  getArticlesByPage(cg, ls): Promise<Article[]> {
    let url = `${this.baseUrl}/page/index/${cg}/${ls}`;
    return this.http.post(url, '{}')
      .toPromise()
      .then(response => response.json().articles as Article[]).catch(this.handleError);
  }

  getAritcleByTypeTag(query: Object): Promise<Article[]> {
    let url = `${this.baseUrl}/page/query`;
    let body = JSON.stringify({query: query});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json().articles as Article[]).catch(this.handleError);
  }

  updateCount(id:string,flag: boolean): Promise<any> {
    let obj:Object = {"readCount": 1};
    if (flag) {
      obj = {"commentCount":1};
    }
    let url = `${this.baseUrl}/updateCount/${id}`;
    let body = JSON.stringify({query: obj});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options)
      .toPromise()
      .then().catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
