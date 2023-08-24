import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/common/models/user.service';
import { AuthService } from '../services/common/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  /**
   *
   */
  constructor(
    private socialService: SocialAuthService,
    private authService: AuthService,
    private router: Router,
  ) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    let _u
    socialService.authState.subscribe(u => _u = u)
    if (_u) {
      socialService.signOut()
    }
    authService.identityCheck()
    router.navigate([""])
  }
}
