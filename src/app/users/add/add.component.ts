import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  userForm : any;
  isSubmit = false;
  type : string = '';
  constructor(public fb: FormBuilder, private service: UserServiceService, private router: Router, private route : ActivatedRoute) {
    this.userForm = this.fb.group({
      id : [''],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      Mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Age: ['', [Validators.required, this.ageRangeValidator(18,100)]],
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
      const id = params.get('id');
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
    if(this.userForm.invalid){
      return;
    }
    if(this.type == 'Add'){
      this.service.checkEmailExists(this.userForm.value.Email).subscribe(exists => {
        if (exists) {
          Swal.fire({
            icon: 'error',
            title: 'Email already exists',
            text: 'Please use a different email address.'
          });
        } else {
          this.userForm.patchValue({ id: uuidv4() });
          this.service.AddUpdateUser(this.userForm.value, 'Add').subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'User added successfully',
              showConfirmButton: false,
              timer: 1000
            });
            this.router.navigate(['/list']);
          });
        }
      });
    } else {
      this.service.AddUpdateUser(this.userForm.value, 'Update').subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'User ('+this.userForm.value.Name+') updated successfully',
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['/ums/users/list']);
      });
    }
  }

  GetUserById(id:any){
    this.service.GetUserById(id).subscribe((data)=> {
      this.userForm.patchValue({
        id: data.id,
        Name:data.Name,
        Email:data.Email,
        Mobile:data.Mobile,
        Age:data.Age
      })
    })
  }
}
