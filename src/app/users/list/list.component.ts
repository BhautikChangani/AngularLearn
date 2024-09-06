import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  userList : any = [];
  constructor(private service : UserServiceService){}

  ngOnInit(): void {
    this.service.GetAllUsers().subscribe(data => {
      this.userList = data;
    })
    
  }
}
