import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserService } from 'src/app/shared/service/user.service';
import { RoleService } from 'src/app/shared/service/role.service';
import { Role } from 'src/app/shared/classes/role';
import { NgbdSortableHeader } from 'src/app/shared/directives/NgbdSortableHeader';
import { ageValidator } from 'src/app/shared/validators/age-validator';
import { mustMatch } from 'src/app/shared/validators/must-match.validator';
import { User } from 'src/app/shared/classes/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public accountForm: UntypedFormGroup;
  public roles: Role[] = [];
  public active = 1;
  public avatars: string[] = [];
  public selectedAvatar: string;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.createAccountForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', {
        validators: [Validators.required],
        asyncValidators: [this.validateUsername.bind(this)],
        updateOn: 'blur'
      }],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.validateEmail.bind(this)],
        updateOn: 'blur'
      }],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      dob: ['', [Validators.required, ageValidator(18)]],
      location: [''],
      roleId: ['', Validators.required], // Add role selection
      password: ['', Validators.required],
      confirmPwd: ['', Validators.required],
      avatar: ['', Validators.required]
    }, {
      validator: mustMatch('password', 'confirmPwd')
    });
  }

  ngOnInit() {
    this.fetchAvatars();
    this.loadRoles(); // Load roles when component initializes
  }

  fetchAvatars() {
    const baseUrl = 'https://api.dicebear.com/9.x/pixel-art/svg';
    const seeds = ['user1', 'user2', 'user3', 'user4', 'user5'];

    this.avatars = seeds.map(seed => `${baseUrl}?seed=${seed}`);
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
    this.accountForm.get('avatar').setValue(avatar);
  }

  onSubmit() {
    this.accountForm.markAllAsTouched();

    if (this.accountForm.valid) {
      const formData = this.accountForm.value;
     
      this.roleService.getRoleById(formData.roleId).pipe(
        switchMap((role: Role) => {
          const user: User = {
            firstName: formData.fname,
            lastName: formData.lname,
            username: formData.username,
            email: formData.email,
            gender: formData.gender,
            phoneNumber: formData.phoneNumber,
            dob: formData.dob,
            location: formData.location,
            role: role,
            password: formData.password,
            avatar: formData.avatar
          };

          return this.userService.registerUser(user);
        })
      ).subscribe(
        (response: User) => {
          console.log('User registered successfully:', response);
          // Handle successful registration, e.g., navigate to another page or display a success message
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle registration error, e.g., display an error message
        }
      );
    }
  }

  validateUsername(control: AbstractControl): Observable<ValidationErrors | null> {
    const username = control.value;
    return this.userService.checkUsernameExists(username).pipe(
      map(exists => (exists ? { usernameExists: true } : null)),
      catchError(() => of(null))
    );
  }

  validateEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return this.userService.checkEmailExists(email).pipe(
      map(exists => (exists ? { emailExists: true } : null)),
      catchError(() => of(null))
    );
  }
}
