import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { DataTableComponent } from './list/data-table/data-table.component';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './add/add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    DataTableComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    HttpClientModule
  ]
})
export class UsersModule { }
