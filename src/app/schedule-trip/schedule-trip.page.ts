// schedule-trip.page.ts
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TripService } from '../core/services/trip.service';
import { Trip } from '../core/models/trip.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-schedule-trip',
  templateUrl: './schedule-trip.page.html',
  styleUrls: ['./schedule-trip.page.scss'],
})
export class ScheduleTripPage {
  @ViewChild('tripForm') tripForm!: NgForm;

  trip: Trip = {
    id: '',
    destination: '',
    date: new Date().toISOString(),
    passengers: 1
  };

  constructor(
    private tripService: TripService,
    private toastController: ToastController
  ) { }

  async scheduleTrip() {
    if (this.tripForm.valid) {
      try {
        this.trip.id = new Date().getTime().toString();
        await this.tripService.addTrip(this.trip);
        await this.showToast('Viagem agendada com sucesso!', 'success');
        this.resetForm();
      } catch (error) {
        await this.showToast('Erro ao agendar viagem. Tente novamente.', 'danger');
      }
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
      cssClass: 'toast-message'
    });
    await toast.present();
  }

  private resetForm() {
    this.trip = {
      id: '',
      destination: '',
      date: new Date().toISOString(),
      passengers: 1
    };
  }
}
