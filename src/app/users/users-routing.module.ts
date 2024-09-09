import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';

const routes: Routes = [
  {path:'', redirectTo:'list', pathMatch:'full'},
  {path:'list', component: ListComponent},
  {path:'reactive', component: AddComponent},
  {path:'template-directive', component:TemplateDrivenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
