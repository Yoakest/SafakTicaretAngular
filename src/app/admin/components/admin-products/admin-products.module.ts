import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin-products.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListComponent } from './list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDirective } from '../../directives/edit.directive';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { DeleteDirectiveModule } from '../../directives/delete-directive.module';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditDirective,
    AdminProductsComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    DialogModule,
    DeleteDirectiveModule,
    RouterModule.forChild([{
      path: "", component: AdminProductsComponent
    }])
  ]
})
export class AdminProductsModule { }
