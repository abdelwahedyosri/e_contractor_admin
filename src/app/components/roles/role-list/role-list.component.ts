import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Role } from 'src/app/shared/classes/role';
import { NgbdSortableHeader } from 'src/app/shared/directives/NgbdSortableHeader';
import { RoleService } from 'src/app/shared/service/role.service';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }

  deleteRole(id: number): void {
    this.roleService.deleteRole(id).subscribe(() => {
      this.roles = this.roles.filter(role => role.roleId !== id);
    });
  }
}
