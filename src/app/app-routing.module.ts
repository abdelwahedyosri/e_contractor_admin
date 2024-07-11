import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { content } from "./shared/routes/content-routes";
import { ContentLayoutComponent } from "./shared/layout/content-layout/content-layout.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { LogoutGuard } from "./guards/logout.guard";
import { AuthGuard } from "./guards/auth.guard";
import { ListUserComponent } from "./components/users/list-user/list-user.component";
import { CreateUserComponent } from "./components/users/create-user/create-user.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RoleListComponent } from "./components/roles/role-list/role-list.component";
import { RoleFormComponent } from "./components/roles/role-form/role-form.component";
import { PermissionListComponent } from "./components/permissions/permission-list/permission-list.component";
import { PermissionFormComponent } from "./components/permissions/permission-form/permission-form.component";

const routes: Routes = [
  {
    path: "",
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "users/list-users", component: ListUserComponent },
      { path: "users/create-user", component: CreateUserComponent }, // Example protected route
      { path: "dashboard", component: DashboardComponent },
      { path: "roles/role-list", component: RoleListComponent },
      { path: "roles/role-form", component: RoleFormComponent },
      {
        path: "permissions/permission-list",
        component: PermissionListComponent,
      },
      {
        path: "permissions/permission-form",
        component: PermissionFormComponent,
      },
      {
        path: "job-offers",
        loadChildren: () =>
          import("./components/job-offers/job-offers.routing").then(
            (m) => m.JobOffersRoutingModule
          ),
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "logout",
    canActivate: [LogoutGuard], // Use the LogoutGuard
    component: LoginComponent, // Redirect to the login page after logout
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
