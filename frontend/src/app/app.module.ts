import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConsentComponent } from './consent/consent.component';
import { FlankerTestComponent } from './flanker-test/flanker-test.component';
import { VisualSearchTestComponent } from './visual-search-test/visual-search-test.component';
import { HttpClientModule } from '@angular/common/http';
import { VisualSearchRecreateComponent } from './visual-search-recreate/visual-search-recreate.component';
import { FlankerRecreateComponent } from './flanker-recreate/flanker-recreate.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsentComponent,
    FlankerTestComponent,
    VisualSearchTestComponent,
    VisualSearchRecreateComponent,
    FlankerRecreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
