import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './layout/components/components.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';


@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
    AuthorizeMenuModule
  ],
  exports: [
    LayoutModule,
  ]
})

export class AdminModule { }
