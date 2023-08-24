import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  constructor(
    // private socialAuthService: SocialAuthService,
  ) { }

  googleLogOut(){
    // this.socialAuthService.signOut()
  }
}
