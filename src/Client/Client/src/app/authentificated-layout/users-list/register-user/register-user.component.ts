import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from '../../../models/responses/userResponse';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      id: [''], // Assuming ID is not needed for registration
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isActive: [false], // Assuming default false
      emailConfirmed: [false], // Assuming default false
      phoneNumber: [''],
      profilePictureDataUrl: [null] // Assuming optional
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: UserResponse = this.registerForm.value;
      // Implement registration logic here
    }
  }
}
