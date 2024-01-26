import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserResponse } from '../../../models/responses/userResponse';
import { UserService } from '../../../services/user-service.service';
import { CustomSnackbarService } from '../../../services/snack-bar.service';
import { RegisterUserRequest } from '../../../models/requests/registerUserRequest';
import { MatDialogRef } from '@angular/material/dialog';

@Component({  
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  dialogRef!: MatDialogRef<RegisterUserComponent>
  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: CustomSnackbarService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/)
      ]],
      confirmPassword: ['', Validators.required],
      phoneNumber: [''],
      activateUser: [false],
      autoConfirmEmail: [false]
    }, { validator: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { passwordMismatch: true };
  };

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const registerRequest: RegisterUserRequest = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        userName: formValue.userName,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
        phoneNumber: formValue.phoneNumber,
        activateUser: formValue.activateUser,
        autoConfirmEmail: formValue.autoConfirmEmail
      };
      var response = await this.userService.registerUser(registerRequest);
      if (response && response.succeeded) {
        this.snackBar.openSnackBar("User registered successfuly!", 'success');
        this.dialogRef.close();
      }
    } else {
      this.snackBar.openSnackBar("One or more validation error!", 'error')
      console.error(this.registerForm.errors);
    }
  }
}
