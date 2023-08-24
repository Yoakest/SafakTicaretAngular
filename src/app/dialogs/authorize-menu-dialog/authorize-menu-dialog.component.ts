import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/role.service';
import { ListRoleAll } from 'src/app/contracts/list_role';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { MatSelectionList } from '@angular/material/list';


interface FoodNode {
  name: string;
  code?: string
  children?: FoodNode[];
}

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizeMenuDialogState.Yes | any,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService,
  ) {
    super(dialogRef)
  }

  typeDatas: ListRoleAll = new ListRoleAll();
  selectasd: boolean[]
  checkRoleslen: string[]

  async ngOnInit(): Promise<void> {
    const roles: ListRoleAll = await this.roleService.getRoles(-1, -1)
    const checkRoles: any = await this.authorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.name)

    roles.datas.map(d => {
      checkRoles.roles?.forEach(c => {
        if (c == d.name) {
          d.selected = true
        }
      });
    })
    this.typeDatas = roles
    this.checkRoleslen = checkRoles.roles

  }

  qwe(asd: MatSelectionList) {
    console.log(asd._value);
  }

  assingRoles(roles: MatSelectionList) {
    console.log(roles.selectedOptions.selected.map(v => v.value[0]))
    const changeRoles = roles.selectedOptions.selected.map(s => s.value[0])
    this.authorizationEndpointService.assignRoleEndpoint(changeRoles, this.data.code, this.data.name)
  }

}

export enum AuthorizeMenuDialogState {
  Yes, NO
}