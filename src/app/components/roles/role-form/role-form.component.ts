import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RoleService } from 'src/app/shared/service/role.service';
import { PermissionService } from 'src/app/shared/service/permission.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Role } from 'src/app/shared/classes/role';
import { Permission } from 'src/app/shared/classes/permission';
import { NgbdSortableHeader } from 'src/app/shared/directives/NgbdSortableHeader';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  roleForm: FormGroup;
  roleId: number | null = null;
  permissions: Permission[] = [];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roleForm = this.formBuilder.group({
      role: ['', Validators.required],
      permissions: this.formBuilder.array([]) // Add FormArray for permissions
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roleId = params['id'] ? +params['id'] : null;
      this.resetForm();
      this.loadPermissions().then(() => {
        if (this.roleId) {
          this.loadRole(this.roleId);
        }
      });
    });
  }

  resetForm(): void {
    this.roleForm.reset(); // Reset the form to clear previous state
    this.permissionArray.clear(); // Clear permissions FormArray
  }

  async loadPermissions(): Promise<void> {
    const permissions = await this.permissionService.getPermissions().toPromise();
    this.permissions = permissions;
    this.addPermissionCheckboxes();
  }

  loadRole(id: number): void {
    this.roleService.getRoleById(id).subscribe((role: Role) => {
      this.roleForm.patchValue({ role: role.role });
      this.setPermissions(role.permissionIds);
    });
  }

  addPermissionCheckboxes(): void {
    const permissionsFormArray = this.permissionArray;
    this.permissions.forEach(() => permissionsFormArray.push(this.formBuilder.control(false)));
  }

  setPermissions(permissionIds: number[]): void {
    const permissionsFormArray = this.permissionArray;
    permissionIds.forEach(id => {
      const index = this.permissions.findIndex(p => p.id === id);
      if (index > -1) {
        permissionsFormArray.at(index).setValue(true);
      }
    });
  }

  get permissionArray(): FormArray {
    return this.roleForm.get('permissions') as FormArray;
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const selectedPermissionIds = this.roleForm.value.permissions
        .map((checked, index) => checked ? this.permissions[index].id : null)
        .filter(value => value !== null);

      const createdBy = this.authService.getUsernameFromToken(); // Get the username from the token

      const roleData: Partial<Role> = {
        role: this.roleForm.value.role,
        permissionIds: selectedPermissionIds,
        createdBy: createdBy // Use the extracted username as createdBy
      };

      if (this.roleId !== null) {
        this.roleService.updateRole(this.roleId, roleData).subscribe(() => {
          this.router.navigate(['/roles/role-list']);
        });
      } else {
        this.roleService.createRole(roleData).subscribe(() => {
          this.router.navigate(['/roles/role-list']);
        });
      }
    }
  }
}
