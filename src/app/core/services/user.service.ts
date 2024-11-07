import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY_USER = 'user';
  private readonly STORAGE_KEY_PASSWORD = 'password';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async getUser(): Promise<User | null> {
    return await this.storage.get(this.STORAGE_KEY_USER);
  }

  async setUser(user: User): Promise<void> {
    await this.storage.set(this.STORAGE_KEY_USER, user);
  }

  async getPassword(): Promise<string | null> {
    return await this.storage.get(this.STORAGE_KEY_PASSWORD);
  }

  async setPassword(password: string): Promise<void> {
    await this.storage.set(this.STORAGE_KEY_PASSWORD, password);
  }

  async clearUser(): Promise<void> {
    await this.storage.remove(this.STORAGE_KEY_USER);
    await this.storage.remove(this.STORAGE_KEY_PASSWORD);
  }
}
