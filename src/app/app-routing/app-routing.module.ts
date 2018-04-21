import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyTextInturnComponent} from '../my-text-inturn/my-text-inturn.component';
import {MyBlogComponent} from '../my-blog/my-blog.component';
import {MyTypeTagComponent} from '../my-type-tag/my-type-tag.component';
import {MyAboutComponent} from '../my-about/my-about.component';
import {MyBlogArticleComponent} from '../my-blog-article/my-blog-article.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: MyTextInturnComponent },
  { path: 'blog', component: MyBlogComponent },
  { path: 'typetag', component: MyTypeTagComponent },
  { path: 'about', component: MyAboutComponent },
  { path: 'article', component: MyBlogArticleComponent },

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

