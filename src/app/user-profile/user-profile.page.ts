// user-profile.page.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  @ViewChild('profileForm') profileForm!: NgForm;

  user: User = {
    id: '',
    name: '',
    email: '',
    phone: ''
  };

  constructor(
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando perfil...',
      spinner: 'circular'
    });
    await loading.present();

    try {
      const storedUser = await this.userService.getUser();
      if (storedUser) {
        this.user = storedUser;
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      this.showToast('Erro ao carregar dados do perfil', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  async saveUser() {
    if (!this.profileForm.valid) {
      this.showToast('Por favor, preencha todos os campos corretamente', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Salvando alterações...',
      spinner: 'circular'
    });
    await loading.present();

    try {
      await this.userService.setUser(this.user);
      this.showToast('Perfil atualizado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      this.showToast('Erro ao salvar alterações', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}
