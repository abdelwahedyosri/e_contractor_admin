import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/classes/user';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserService } from 'src/app/shared/service/user.service';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public users$ = new BehaviorSubject<User[]>([]);
  public total$ = new BehaviorSubject<number>(0);
  public page = 0;  // Start with zero-based pagination
  public pageSize = 10;
  public sortColumn = '';
  public sortDirection = '';
  public searchControl = new FormControl();

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchText => {
        this.page = 0; // Reset to first page (zero-based)
        return this.userService.getUsers(this.page, this.pageSize, searchText, this.sortColumn, this.sortDirection).pipe(
          catchError(err => {
            console.error('Error fetching users:', err);
            return of({ users: [], total: 0 });
          })
        );
      })
    ).subscribe(response => {
      console.log('Search response:', response); // Debugging statement
      this.total$.next(response.total);
      this.users$.next(response.users);
    });
  }

  loadUsers() {
    this.userService.getUsers(this.page, this.pageSize, this.searchControl.value, this.sortColumn, this.sortDirection).pipe(
      catchError(err => {
        console.error('Error loading users:', err);
        this.total$.next(0);
        this.users$.next([]);
        return of({ users: [], total: 0 });
      })
    ).subscribe(response => {
      console.log('Load users response:', response);  // Debugging statement
      this.total$.next(response.total);
      this.users$.next(response.users);
    });
  }

  onSort({ column, direction }: SortEvent) {
    // Resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.page = page - 1; // Convert to zero-based index
    this.loadUsers();
  }

  getElapsedTime(lastLogin: string): string {
    try {
      // Replace space with 'T' to make it ISO compliant
      const formattedDate = lastLogin.replace(' ', 'T');
      const date = new Date(formattedDate);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Invalid date';
    }
  }

  toggleActive(user: User) {
    const newStatus = !user.isActive;
    this.userService.updateUserField('isActive', newStatus.toString(), user.username).pipe(
      catchError(err => {
        console.error('Error updating user status:', err);
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.loadUsers();
      }
    });
  }
}
