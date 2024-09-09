import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { DataTableComponent } from './list/data-table/data-table.component';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './add/add.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';


@NgModule({
  declarations: [
    ListComponent,
    DataTableComponent,
    AddComponent,
    TemplateDrivenComponent,
    TemplateDrivenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class UsersModule { }
