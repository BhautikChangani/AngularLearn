import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() data! : any;

  constructor(private service : UserServiceService, private fb : FormBuilder) {  }

  GetAllUsers() {
    this.service.GetAllUsers().subscribe(users => this.data = users);
  }

  DeleteConfirmation(Id:any){
    Swal.fire({
      icon : 'warning',
      title: "Do you want to delete this user?",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeleteUserById(Id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  DeleteUserById(id: any) {
    this.service.DeleteUserById(id).subscribe((data) => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        showConfirmButton: false,
        timer: 1000
      });
    });
    this.GetAllUsers();
  }
}
