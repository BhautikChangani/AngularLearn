import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { TemplateDirectiveComponent } from './template-directive/template-directive.component';

const routes: Routes = [
  {path:'', redirectTo:'list', pathMatch:'full'},
  {path:'list', component: ListComponent},
  {path:'add', component: AddComponent},
  {path:'template-directive', component:TemplateDirectiveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
