import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorizedComponent } from './Layout/authorized/authorized.component';
import { UsersModule } from './users/users.module';
import { UnauthorizedComponent } from './Layout/unauthorized/unauthorized.component';

const routes: Routes = [
  {path: '', component:UnauthorizedComponent, children: [
    {}
  ]},
  {path: 'ums', component:AuthorizedComponent,
children: [
  {path:'', component: DashboardComponent},
  {path: 'users', loadChildren :() => import('./users/users.module').then(m => m.UsersModule) }
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
