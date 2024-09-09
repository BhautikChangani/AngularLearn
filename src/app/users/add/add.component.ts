import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserServiceService } from '../user-service.service';
import { AlertServiceService } from '../alert-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  userForm: FormGroup;
  isSubmit = false;
  type: string = '';
  constructor(public fb: FormBuilder, private service: UserServiceService, private router: Router, private route: ActivatedRoute, private alertService: AlertServiceService) {
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      age: [null, [Validators.required, this.ageRangeValidator(18, 100)]],
    });
  }

  ageRangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value) {
        const age = Number(value);
        if (isNaN(age) || age < min || age >= max) {
          return { ageRange: { min, max } };
        }
      }
      return null;
    };
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.type = 'Update';
        this.GetUserById(id);
      } else {
        this.type = 'Add';
      }
    });

  }
  SubmitForm() {
    this.isSubmit = true;
    if (this.userForm.invalid) {
      return;
    }
    if (this.type == 'Add') {
      this.service.checkEmailExists(this.userForm.value.email).subscribe(exists => {
        if (exists) {
          this.alertService.showErrorMessage("Email already exists", true);

        } else {
          this.service.AddUpdateUser(this.userForm.value, 'Add').subscribe(() => {
            this.alertService.showSuccessMessage("User added successfully", false);
            this.router.navigate(['../list'], { relativeTo: this.route });
          });
        }
      });
    } else {
      this.service.AddUpdateUser(this.userForm.value, 'Update').subscribe(() => {
        this.alertService.showSuccessMessage('User (' + this.userForm.value.name + ') updated successfully', false);
        this.router.navigate(['../list'], { relativeTo: this.route });
      });
    }
  }

  GetUserById(id: number) {
    this.service.GetUserById(Number(id)).subscribe((data) => {
      if (data) {
        this.userForm.patchValue({
          id: data.id,
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          age: data.age
        })
      }
    })
  }
}
