import {Component, OnInit, animate, trigger, state, style, transition} from '@angular/core';
import {Author} from '../class-model/Author';
import {MyAuthorService} from '../service/my-author.service';
import {StorageService} from '../service/storage.service';

@Component({
  selector: 'app-my-about',
  templateUrl: './my-about.component.html',
  styleUrls: ['./my-about.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ],
  providers: [MyAuthorService]

})
export class MyAboutComponent implements OnInit {

  constructor(private authorService: MyAuthorService, private storageService: StorageService) {
    this.hide = true;
  }

  hide:boolean;
  author: Author;

  ngOnInit() {
   this.author = this.storageService.create(true).getItem('author');
   if(this.author){
     this.hide = false;
   }
   this.getAuthor();
  }

  getAuthor() {
    this.authorService.getAuthor().then(author => {
      this.author = author;
      this.hide = false;
      this.storageService.create(true).setItem('author',this.author);
    });
  }
}
