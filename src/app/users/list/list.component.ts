import { Component } from '@angular/core';
import { DataServiceService } from '../../data-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  userList : any = [];
  constructor(private service : DataServiceService){}

  ngOnInit(): void {
    this.service.GetAllUsers().subscribe(data => {
      this.userList = data;
    })
    
  }
}
