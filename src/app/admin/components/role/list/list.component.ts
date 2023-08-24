import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListRole } from 'src/app/contracts/list_role';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { RoleService } from 'src/app/services/common/role.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private roleService: RoleService,
    private alertifyService: AlertifyService
  ) {
  }

  displayedColumns: string[] = ["name", "delete"];

  dataSource: MatTableDataSource<ListRole> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;





  async getRoles() {
    const allRoles: { datas: ListRole[], totalCount: number } = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => { }, errorMessage =>
      this.alertifyService.message(errorMessage, {
        messageType: MessageType.Error,
        messagePosition: MessagePosition.TopRight
      }))

    this.dataSource = new MatTableDataSource<ListRole>(allRoles.datas);
    this.paginator.length = allRoles.totalCount;
    console.log(allRoles);
    
  }



  async pageChanged() {
    await this.getRoles();
  }

  async ngOnInit() {
    await this.getRoles();
  }

}