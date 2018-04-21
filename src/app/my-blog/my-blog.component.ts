import {Component, OnInit, OnDestroy, animate, trigger, state, style, transition} from '@angular/core';
import {Article} from '../class-model/Article';
import {MyArticleService} from '../service/my-article.service';
import {StorageService} from '../service/storage.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.scss'],
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
  providers: [MyArticleService]

})
export class MyBlogComponent implements OnInit, OnDestroy {

  articles: Article[];
  hide: boolean = true;
  page: number = 1;
  ls: number = 9;
  private _scrollHander: EventListenerObject;

  constructor(private articleService: MyArticleService, private storageService: StorageService,
              private router: Router) {
    this.articles = [];
    this._scrollHander = this.scrollHandler.bind(this);
  }

  ngOnInit() {
    let ssArticles = this.storageService.create(false).getItem('articles');
    if (ssArticles) {
      this.articles = ssArticles;
      this.hide = false;
      this.bindScroll();
    } else {
      this.getArticles();
    }
  }

  ngOnDestroy() {
    this.removeScroll();
  }

  getArticles(): void {
    this.hide = true;
    this.page = this.storageService.create(false).getItem('page') || 0;
    this.page += 1;
    this.articleService.getArticlesByPage(this.page, this.ls).then(articles => {
      this.articles = this.articles.concat(articles);
      this.storageService.create(false).setItem('articles', this.articles);
      this.storageService.create(false).setItem('page', this.page);
      this.hide = false;
      if (articles.length === 9) {
        this.bindScroll();
      }
    });
  }

  gotoArticle(article:Article): void {
    this.storageService.create(false).setItem('article',article);
    this.router.navigate(['/article']);
  }

  bindScroll() {
    let that = this;
    window.addEventListener('scroll', this._scrollHander, false);
  };

  scrollHandler() {
    let a = document.documentElement.clientHeight;
    let b = Math.floor(document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop);
    let c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
    if (b != 0) {
      if (a + b >= c - 150) {
        this.removeScroll();
        this.getArticles();
      }
    }
  };

  removeScroll() {
    window.removeEventListener('scroll', this._scrollHander, false);
  };


}
