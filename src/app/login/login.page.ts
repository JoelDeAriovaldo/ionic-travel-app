import { Component } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  async login() {
    const user = await this.userService.getUser();
    const storedPassword = await this.userService.getPassword();
    if (user && user.email === this.email && storedPassword === this.password) {
      alert('Login bem-sucedido!');
      this.router.navigate(['/tabs']);
    } else {
      alert('Email ou senha incorretos.');
    }
  }
}
