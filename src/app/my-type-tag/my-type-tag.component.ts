import {Component, OnInit, OnDestroy, animate, trigger, state, style, transition} from '@angular/core';
import {MyTypetagService} from '../service/my-typetag.service';
import {MyArticleService} from '../service/my-article.service';
import {StorageService} from '../service/storage.service';
import {Typetag} from '../class-model/Typetag';
import {Article} from '../class-model/Article';
import {Router} from '@angular/router';
import {type} from "os";


@Component({
  selector: 'app-my-type-tag',
  templateUrl: './my-type-tag.component.html',
  styleUrls: ['./my-type-tag.component.scss'],
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
  ], providers: [MyTypetagService, MyArticleService]

})
export class MyTypeTagComponent implements OnInit, OnDestroy {
  typetags: Typetag[];
  articles: Article[];
  hide: boolean = true;
  page: number = 1;
  ls: number = 9;
  private _scrollHander: EventListenerObject;

  constructor(private typetagService: MyTypetagService, private storageService: StorageService,
              private articleService: MyArticleService, private router: Router) {
    this.typetags = [];
    this.articles = [];
    this._scrollHander = this.scrollHandler.bind(this);
  }

  ngOnInit() {
    let ssArticles = this.storageService.create(false).getItem('articles');
    let ssTypetags = this.storageService.create(false).getItem('typetags');
    let ssTypetag = this.storageService.create(false).getItem('ssTypetag');
    if(!ssTypetag){
      if (ssArticles) {
        this.articles = ssArticles;
        this.hide = false;
        this.bindScroll();
      } else {
        this.getArticles();
      }
    }
    if (ssTypetags) {
      this.typetags = ssTypetags;
      this.getArticleByOtherPage();
    } else {
      this.getTypetags();
    }
  }

  // ngOnDestroy(){
  // }


  ngOnDestroy() {
    this.removeScroll();
  }

  gotoArticle(article: Article): void {
    this.storageService.create(false).setItem('article', article);
    this.router.navigate(['/article']);
  }

  onSelectType($event, type): void {
    this.storageService.create(false).setItem('ssTypetag',type);

    this.articles = [];
    this.hide = true;
    let dom = document.querySelector('.active');
    if (dom) {
      dom.classList.remove('active');
    }
    $event.target.classList.add('active');
    this.getArticlesByQuery(type);
  }

  getArticlesByQuery(type): void {
    let query = {status: 2};
    if (type.type) {
      query['type'] = type.name;
    } else {
      query['tag.name'] = type.name;
    }
    this.articleService.getAritcleByTypeTag(query).then(articles => {
      this.articles = articles;
      this.hide = false;
    });
  }

  getArticles(): void {
    this.hide = true;
    this.page = this.storageService.create(false).getItem('page') || 0;
    this.page += 1;
    this.articleService.getArticlesByPage(this.page, this.ls).then(articles => {
      this.articles = this.articles.concat(articles);
      this.storageService.create(false).setItem('articles', this.articles);
      this.hide = false;
      if (articles.length === 9) {
        this.bindScroll();
        this.storageService.create(false).setItem('page', this.page);
      }
    });
  }

  getTypetags(): void {
    this.typetagService.getAllTypetag().then(typetags => {
      this.typetags = typetags;
      this.storageService.create(false).setItem('typetags', this.typetags);
      this.getArticleByOtherPage();
    });
  }

  getArticleByOtherPage():void{
    let typetag = this.storageService.create(false).getItem('ssTypetag');

    if (typetag) {
      typetag = this.typetags.filter(val => val.name == typetag.name).pop();
      this.getArticlesByQuery(typetag);
      MyTypeTagComponent.changeDomColor(typetag);
    }
  }

  static changeDomColor(type:Typetag): void {
    if (type.type) {
      setTimeout(()=>{
        MyTypeTagComponent.forDomOp(document.querySelectorAll('li>a'),type);
      });
    } else {
      setTimeout(() => {
        MyTypeTagComponent.forDomOp(document.querySelectorAll('.tag-item'),type);
      });
    }
  }

  static forDomOp(doms,type:Typetag):void{
    for(let i = 0;i<doms.length;i++){
      if(doms[i].innerHTML.trim() ==  type.name){
        doms[i].classList.add('active');
        break;
      }
    }
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
