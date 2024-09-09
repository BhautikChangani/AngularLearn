import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserServiceService } from '../user-service.service';
import { AlertServiceService } from '../alert-service.service';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {
  user: User = {} as User;
  isSubmit = false;
  type: string = '';

  constructor(private service: UserServiceService, private router: Router, private route: ActivatedRoute, private alertService: AlertServiceService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.type = 'Update';
        this.GetUserById(id);
      } else {
        this.type = 'Add';
      }
    });
  }

  SubmitForm(form: NgForm) {
    this.isSubmit = true;
    if (form.invalid) {
      return;
    }

    if (this.type === 'Add') {
      this.service.checkEmailExists(this.user.email!).subscribe(exists => {
        if (exists) {
          this.alertService.showErrorMessage("Email already exists", true);
        } else {
          this.service.AddUpdateUser(this.user, 'Add').subscribe(() => {
            this.alertService.showSuccessMessage("User added successfully", false);
            this.router.navigate(['../list'], { relativeTo: this.route });
          });
        }
      });
    } else {
      this.service.AddUpdateUser(this.user, 'Update').subscribe(() => {
        this.alertService.showSuccessMessage('User (' + this.user.name + ') updated successfully', false);
        this.router.navigate(['../list'], { relativeTo: this.route });
      });
    }
  }

  GetUserById(id: any) {
    this.service.GetUserById(id).subscribe(data => {
      this.user = data!;
    });
  }
}
