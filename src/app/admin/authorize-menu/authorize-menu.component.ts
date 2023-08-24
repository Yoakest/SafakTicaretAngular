import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthorizeMenuService } from 'src/app/services/common/authorize-menu.service';
import { AuthorizeMenu } from 'src/app/contracts/authorize_menu/authorize_menu';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  code?: string;
  definition?: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss'],
})
export class AuthorizeMenuComponent implements OnInit {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      code: node.code,
      definition: node.definition,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private authMenuService: AuthorizeMenuService,
    private dialogService: DialogService
  ) {
  }
  async ngOnInit(): Promise<void> {
    const menu: AuthorizeMenu[] = await this.authMenuService.GetAuthorizeDefinationEndpoint()

    const foNode: FoodNode[] = []

    menu.forEach(controller => {
      const FoodChild: FoodNode[] = []
      controller.actions.forEach(action => {
        const FN: FoodNode = {
          definition: action.definition,
          code: action.code,
          name: controller.name
        }
        FoodChild.push(FN)
      });

      const newItem: FoodNode = {
        name: controller.name,
        children: FoodChild
      }
      foNode.push(newItem)
    });

    this.dataSource.data = foNode
    console.log(foNode);

  }
  show(a) {
    console.log(a);

  }
  assingRoel(name: string, code: string,) {
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: { name, code },
      options: {
        width: "90%"
      }
    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}