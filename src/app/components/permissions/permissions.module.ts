import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
   PermissionFormComponent,
   PermissionListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PermissionsRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class PermissionsModule { }
