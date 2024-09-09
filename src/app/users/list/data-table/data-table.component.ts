import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserServiceService } from '../../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertServiceService } from '../../alert-service.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent {
  @Input() data!: any;

  constructor(
    private service: UserServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertServiceService
  ) {}

  GetAllUsers() {
    this.service.GetAllUsers().subscribe((users) => (this.data = users));
  }

  DeleteConfirmation(id: number) {
    this.alertService
      .showConfirmMessage('Do you want to delete this user?')
      .then((result) => {
        if (result === 'confirm') {
          this.DeleteUserById(id);
        }
      });
  }

  DeleteUserById(id: number) {
    this.service.DeleteUserById(id).subscribe();
    this.alertService.showSuccessMessage('User deleted successfully.');
    this.GetAllUsers();
  }

  NavigateToEditForm(id: number) {
    this.router.navigate(['../reactive'], {
      relativeTo: this.route,
      queryParams: { id: id },
    });
  }
}
