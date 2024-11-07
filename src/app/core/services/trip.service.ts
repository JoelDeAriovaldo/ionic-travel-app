import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly STORAGE_KEY = 'trips';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async getTrips(): Promise<Trip[]> {
    return (await this.storage.get(this.STORAGE_KEY)) || [];
  }

  async addTrip(trip: Trip): Promise<void> {
    const trips = await this.getTrips();
    trips.push(trip);
    await this.storage.set(this.STORAGE_KEY, trips);
  }

  async deleteTrip(tripId: string): Promise<void> {
    let trips = await this.getTrips();
    trips = trips.filter(trip => trip.id !== tripId);
    await this.storage.set(this.STORAGE_KEY, trips);
  }
}
