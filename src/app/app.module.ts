import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { MyHeaderComponent } from './my-header/my-header.component';
import { MyImageInturnComponent } from './my-image-inturn/my-image-inturn.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MyTextInturnComponent } from './my-text-inturn/my-text-inturn.component';
import { MyBlogComponent } from './my-blog/my-blog.component';
import { MyTypeTagComponent } from './my-type-tag/my-type-tag.component';
import { MyAboutComponent } from './my-about/my-about.component';
import { MyBlogArticleComponent } from './my-blog-article/my-blog-article.component';
import {StorageService} from './service/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    MyImageInturnComponent,
    MyTextInturnComponent,
    MyBlogComponent,
    MyTypeTagComponent,
    MyAboutComponent,
    MyBlogArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    HttpModule,
    AppRoutingModule
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
