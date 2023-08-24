import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { MatDialog } from '@angular/material/dialog';
import { BasketsComponent } from './user-interface/components/baskets/baskets.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SafakTicaretAngular';
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective

  constructor(
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {

  }

  logout() {
    this.router.navigate(["logout"])
  }

  loadComponent() {
    // this.dynamicLoadComponentService.loadComponent(ComponentName.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef)
    this.dialog.open(BasketsComponent, {
      width: '80%'
    })
  }

}
