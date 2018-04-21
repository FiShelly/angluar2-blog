import {Component, OnInit, OnDestroy, animate, trigger, state, style, transition, Input} from '@angular/core';
import {Article} from '../class-model/Article';
import {Comment} from '../class-model/Comment';
import {MyArticleService} from '../service/my-article.service';
import {MyCommentService} from '../service/my-comment.service';
import {StorageService} from '../service/storage.service';
import * as moment from "moment";
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-blog-article',
  templateUrl: './my-blog-article.component.html',
  styleUrls: ['./my-blog-article.component.scss'],
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
  providers: [MyArticleService, MyCommentService]

})
export class MyBlogArticleComponent implements OnInit {

  constructor(private storageService: StorageService, private commentService: MyCommentService,
              private articleService: MyArticleService, private router: Router) {
    this.comments = [];
    this.comment = new Comment();
  }

  article: Article;
  comments: Comment[];
  comment: Comment;
  remember: boolean;
  issubmit:boolean;

  ngOnInit() {
    this.article = this.storageService.create(false).getItem('article');
    this.articleService.updateCount(this.article.id, false);
    this.getComment();
    this.setVisitor();
  }

  setVisitor() {
    let ssVisitor = this.storageService.getItem('visitor');
    if (ssVisitor) {
      this.comment.visitor = ssVisitor;
      this.remember = true;
    }
  }

  gotoTypetag(type,flag):void{
    this.storageService.setItem('ssTypetag',{name:type,type:flag});
    this.router.navigate(['/typetag']);
  }

  getComment() {
    this.commentService.getCommentByArticle({id: this.article.id, title: this.article.title}).then(
      comments => {
        this.comments = comments;
      }
    )
  }

  quote(comment) {
    this.comment.content = '<quote-name>' + comment.visitor.name + '</quote-name>\n' +
      '<quote-content>' + comment.content + '</quote-content>' + "\n";
    let dom = <HTMLElement>document.querySelector('#comment');
    dom.focus();
  };

  submitComment() {
    this.issubmit = true;
    if (this.remember) {
      this.storageService.setItem("visitor", this.comment.visitor);
    } else {
      this.storageService.setItem("visitor", '');
    }
    if (this.comment.content.indexOf('<quote') != -1) {
      this.comment.init();
      this.comment.quotes.name = this.comment.content.match(/<quote-name>([\s\S]*?)<\/quote-name>/)[1];
      this.comment.quotes.content = this.comment.content.match(/<quote-content>([\s\S]*?)<\/quote-content>/)[1];
      this.comment.content = this.comment.content.replace(/<quote-name>([\s\S]*?)<\/quote-content>\n/, '');
    }
    this.comment.date = moment().format('YYYY-MM-DD HH:mm');
    this.comment.article = {id: this.article.id, title: this.article.title};
    let comment:Comment = new Comment();
    this.comments.push(Object.assign(comment,this.comment));
    this.commentService.addComment(this.comment).then(res => {
      this.issubmit = false;
    });
    this.comment.content = '';
  }

}
