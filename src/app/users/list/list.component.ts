import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  userList : any = [];
  constructor(private service : UserServiceService, private router : Router, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.service.GetAllUsers().subscribe(data => {
      this.userList = data;
    })
    
  }

  NavigateToForm(path : string){
    this.router.navigate([`../${path}`], {relativeTo : this.route});
  }
}
