import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { ListRole, ListRoleAll } from 'src/app/contracts/list_role';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { RoleService } from 'src/app/services/common/role.service';
import { BaseDialog } from '../base/base-dialog';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizeUserDialogState.Yes | any,
    private userService: UserService,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService,
  ) {
    super(dialogRef)
  }

  roles: ListRoleAll
  userRoles: { roles: string[] }
  listUserRoles: { name: string, selected: boolean }[];

  async ngOnInit(): Promise<void> {
    this.userRoles = await this.userService.getRolesToUser(this.data)
    this.roles = await this.roleService.getRoles(-1, -1)

    this.listUserRoles = this.roles.datas.map(r => {
      return {
        name: r.name,
        selected: this.userRoles?.roles.indexOf(r.name) > -1,
      }
    })
  }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(r => r.value)

    this.userService.assignRolToUser(this.data, roles)
  }

}

export enum AuthorizeUserDialogState {
  Yes, NO
}