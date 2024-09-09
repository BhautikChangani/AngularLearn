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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthorizedComponent,
    UnauthorizedComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    RouterLinkActive,
    UsersModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
