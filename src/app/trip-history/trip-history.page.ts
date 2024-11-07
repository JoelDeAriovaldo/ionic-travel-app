import { Component, OnInit } from '@angular/core';
import { TripService } from '../core/services/trip.service';
import { Trip } from '../core/models/trip.model';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.page.html',
  styleUrls: ['./trip-history.page.scss'],
})
export class TripHistoryPage implements OnInit {
  trips: Trip[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private tripService: TripService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    await this.loadTrips();
  }

  // Método para atualizar a lista usando pull-to-refresh
  async doRefresh(event: any) {
    await this.loadTrips();
    event.target.complete();
  }

  // Carrega as viagens com tratamento de erro e loading
  async loadTrips() {
    this.error = null;
    const loading = await this.showLoading();

    try {
      this.trips = await this.tripService.getTrips();
      // Ordena as viagens por data, mais recente primeiro
      this.trips.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      this.error = 'Não foi possível carregar as viagens. Tente novamente.';
      this.showToast(this.error, 'danger');
    } finally {
      loading.dismiss();
    }
  }

  // Confirma a exclusão antes de deletar
  async confirmDelete(trip: Trip) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Deseja realmente excluir a viagem para ${trip.destination}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.deleteTrip(trip.id);
          }
        }
      ]
    });

    await alert.present();
  }

  // Deleta a viagem com feedback e tratamento de erro
  async deleteTrip(tripId: string) {
    const loading = await this.showLoading('Excluindo viagem...');

    try {
      await this.tripService.deleteTrip(tripId);
      // Atualiza a lista local em vez de fazer nova requisição
      this.trips = this.trips.filter(trip => trip.id !== tripId);
      this.showToast('Viagem excluída com sucesso', 'success');
    } catch (error) {
      this.showToast('Erro ao excluir a viagem. Tente novamente.', 'danger');
    } finally {
      loading.dismiss();
    }
  }

  // Abre modal com detalhes da viagem
  async showTripDetails(trip: Trip) {
    const alert = await this.alertController.create({
      header: trip.destination,
      subHeader: new Date(trip.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      message: `
        <div class="trip-details">
          <p><strong>Passageiros:</strong> ${trip.passengers}</p>
          <p><strong>ID da Viagem:</strong> ${trip.id}</p>
        </div>
      `,
      buttons: ['OK'],
      cssClass: 'trip-details-alert'
    });

    await alert.present();
  }

  // Métodos auxiliares para UI
  private async showLoading(message: string = 'Carregando...') {
    const loading = await this.loadingController.create({
      message,
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }

  private async showToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  // Formatadores
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getPassengersText(passengers: number): string {
    return `${passengers} ${passengers === 1 ? 'passageiro' : 'passageiros'}`;
  }
}
