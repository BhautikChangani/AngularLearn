import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorizedComponent } from './Layout/authorized/authorized.component';
import { UnauthorizedComponent } from './Layout/unauthorized/unauthorized.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ListComponent } from './users/list/list.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthorizedComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    RouterLinkActive,
     UsersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
