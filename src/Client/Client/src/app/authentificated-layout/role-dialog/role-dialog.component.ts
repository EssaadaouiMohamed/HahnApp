import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleRequest } from '../../models/requests/roleRequest';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit {
  roleForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleRequest | null
  ) {
    this.roleForm = this.fb.group({
      id: [{ value: '', disabled: false }],
      name: ['', Validators.required],
      description: ['']
    });

    if (data) {
      this.isEditMode = true;
      this.roleForm.patchValue(data);
      this.roleForm.disable();
    }
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.roleForm.valid) {
      const roleData: RoleRequest = this.roleForm.getRawValue();
      this.dialogRef.close(roleData);
    }
  }
}
