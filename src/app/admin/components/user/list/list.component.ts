import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetUsers, ListUsers } from 'src/app/contracts/user/list_users';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(
    private dialogService: DialogService,
    private userService: UserService
  ) {
  }

  displayedColumns: string[] = ["UserId", "userName", "nameSurname", "email", "twoFactorEneble", "detail"];

  dataSource: MatTableDataSource<ListUsers> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers() {
    const getUsers: GetUsers = await this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5)

    this.dataSource = new MatTableDataSource<ListUsers>(getUsers.users)
    this.paginator.length = getUsers.totalUsersCount
  }

  async assignRole(id: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: id,
      options: {
        width: "90%"
      }
    })
  }

  async pageChanged() {
    await this.getUsers()
  }
}
