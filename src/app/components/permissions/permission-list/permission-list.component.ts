import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/shared/service/permission.service';
import { Permission } from 'src/app/shared/classes/permission';
import { NgbdSortableHeader } from 'src/app/shared/directives/NgbdSortableHeader';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {
  permissions: Permission[] = [];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(
    private permissionService: PermissionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.permissionService.getPermissions().subscribe((data: Permission[]) => {
      this.permissions = data;
    });
  }

  deletePermission(id: number): void {
    if (confirm('Are you sure you want to delete this permission?')) {
      this.permissionService.deletePermission(id).subscribe(() => {
        this.loadPermissions(); // Reload the list after deletion
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/permissions/new']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate([`/permissions/edit/${id}`]);
  }
}
