import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { MyyumsComponent } from './components/myyums/myyums.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { SearchComponent } from './components/search/search.component';
import { UserComponent } from './components/user/user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

const appRoutes: Routes = [
  { path: '', component: MapComponent },
  { path: 'myyums', component: MyyumsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FooterComponent,
    HeaderComponent,
    MapComponent,
    MyyumsComponent,
    ReviewsComponent,
    SearchComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
