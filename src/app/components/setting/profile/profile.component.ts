import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/classes/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public active = 1;
  public user: User;
  public userForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('jwt_token');
    this.userService.getUsername(token).subscribe((username: string) => {
      this.userService.getUserByUsername(username).subscribe((user: User) => {
        this.user = user;
        this.createUserForm(user);
      });
    });
  }

  createUserForm(user: User): void {
    this.userForm = this.fb.group({
      firstName: [user.firstName],
      lastName: [user.lastName],
      email: [user.email],
      gender: [user.gender],
      phoneNumber: [user.phoneNumber],
      dob: [user.dob],
      location: [user.location]
    });
  }

  updateField(field: string): void {
    const value = this.userForm.get(field).value;
    const token = localStorage.getItem('jwt_token');
    this.userService.updateUserField(field, value, this.user.username).subscribe((updatedUser: User) => {
      this.user = updatedUser;
      alert(`${field} updated successfully!`);
    }, (error) => {
      alert(`Failed to update ${field}: ${error.message}`);
    });
  }
}
