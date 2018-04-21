import { Injectable } from '@angular/core';
import {Typetag} from '../class-model/Typetag';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MyTypetagService {

  private baseUrl = '/typetag';

  constructor(private http: Http) { }

  getAllTypetag(): Promise<Typetag[]> {
    let url = `${this.baseUrl}/page/1/1000`;
    return this.http.post(url,'{}')
      .toPromise()
      .then(response =>  response.json().typetags as Typetag[]).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
