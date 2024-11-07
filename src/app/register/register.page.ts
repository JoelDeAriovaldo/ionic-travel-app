import { Component } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user: User = {
    id: '',
    name: '',
    email: '',
    phone: ''
  };
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  async register() {
    if (this.user.name && this.user.email && this.user.phone && this.password.length >= 6) {
      this.user.id = new Date().getTime().toString();
      await this.userService.setUser(this.user);
      await this.userService.setPassword(this.password);
      alert('Conta criada com sucesso!');
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}
