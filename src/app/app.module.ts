import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { SearcherComponent } from './home/searcher/searcher.component';
import { ResultItemComponent } from './home/searcher/result-item/result-item.component';
import { DetailsComponent } from './home/details/details.component';
import { CalenderComponent } from './home/calender/calender.component';
import { ShoppingItemComponent } from './home/calender/shopping-item/shopping-item.component';
import { RecipeItemComponent } from './home/calender/recipe-item/recipe-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearcherComponent,
    ResultItemComponent,
    DetailsComponent,
    CalenderComponent,
    ShoppingItemComponent,
    RecipeItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
