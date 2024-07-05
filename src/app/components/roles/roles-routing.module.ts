import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleFormComponent } from './role-form/role-form.component';

const routes: Routes = [
  { path: 'roles', component: RoleListComponent },
  { path: 'roles/new', component: RoleFormComponent },
  { path: 'roles/edit/:id', component: RoleFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
