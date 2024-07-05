import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from 'src/app/shared/service/permission.service';
import { Permission } from 'src/app/shared/classes/permission';
import { NgbdSortableHeader } from 'src/app/shared/directives/NgbdSortableHeader';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {
  permissionForm: FormGroup;
  permissionId: number | null = null;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.permissionForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.permissionId = params['id'] ? +params['id'] : null;
      if (this.permissionId) {
        this.loadPermission(this.permissionId);
      }
    });
  }

  loadPermission(id: number): void {
    this.permissionService.getPermissionById(id).subscribe((permission: Permission) => {
      this.permissionForm.patchValue(permission);
    });
  }

  onSubmit(): void {
    if (this.permissionForm.valid) {
      if (this.permissionId !== null) {
        this.permissionService.updatePermission(this.permissionId, this.permissionForm.value).subscribe(() => {
          this.router.navigate(['/permissions']);
        });
      } else {
        this.permissionService.createPermission(this.permissionForm.value).subscribe(() => {
          this.router.navigate(['/permissions']);
        });
      }
    }
  }
}
