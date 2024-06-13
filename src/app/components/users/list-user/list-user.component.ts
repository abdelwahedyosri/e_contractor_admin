import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/classes/user';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TableService } from 'src/app/shared/service/table.service';
import { UserService } from 'src/app/shared/service/user.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ListUserComponent implements OnInit {
  public tableItem$: Observable<User[]>;
  public searchText;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;

  }

  users: User[] = [];
  constructor(private userService: UserService ,public service: TableService , private authService: AuthService) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
   }

  ngOnInit(): void {
    this.authService.login('test', 'test',false).subscribe(response => {
      if (response.jwt) {
        this.userService.getAllUsers().subscribe((data: User[]) => {
         this.users=data; 
         this.service.setUserData(this.users);  
         this.tableItem$.subscribe(data => {
          console.log('Data received in component:', data);
      });     
        });
      } 
    });
  }

}

