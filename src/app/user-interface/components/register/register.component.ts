import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/contracts/user';
import { CreateUser } from 'src/app/contracts/user/create_user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/customToastr/custom-toastr.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService,
    private router: Router
  ) { }

  registerForm: FormGroup

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.minLength(3)
      ]],
      userName: ["", [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.email
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(6)
      ]],
      rePassword: ["", [
        Validators.required,
      ]],
    })
  }
  isSubmit: boolean = false;
  get registerInfo() {
    return this.registerForm.controls
  }

  async onSubmit(user: User) {
    this.isSubmit = true
    var c = this.registerForm.controls

    const result: CreateUser = await this.userService.create(user)

    if (result.isSuccess) {
      this.toastrService.message(result.message, "Kayıt Başarılı", {
        messagePosition: ToastrPosition.TopLeft,
        messageType: ToastrMessageType.Success
      })
      this.router.navigate(["login"])
    } else {
      this.toastrService.message(result.message, "HATA", {
        messagePosition: ToastrPosition.TopCenter,
        messageType: ToastrMessageType.Warning
      })
    }

  }
}
