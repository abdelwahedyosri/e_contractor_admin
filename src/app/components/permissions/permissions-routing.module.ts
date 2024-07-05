import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionFormComponent } from './permission-form/permission-form.component';

const routes: Routes = [
  { path: 'permissions', component: PermissionListComponent },
  { path: 'permissions/new', component: PermissionFormComponent },
  { path: 'permissions/edit/:id', component: PermissionListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
