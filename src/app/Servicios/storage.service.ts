import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private strg: Storage = new Storage();
  private storageReady: Promise<void>;

  constructor(private storage: Storage) {
    this.storageReady = this.init();
  }

  // Iniciar el almacenamiento
  async init(): Promise<void> {
    // Se prepara la instancia del storage para poder usar el resto de funciones
    const storage = await this.storage.create();
    this.strg = storage;
  }

  // Se espera a que el almacenamiento este listo
  async StrgListo(): Promise<void> {
    await this.storageReady;
  }

  async get(key: string): Promise<any> {
    await this.StrgListo()
    return this.strg?.get(key);
  }

  async set(key: string, valor: any) {
    await this.StrgListo()
    this.strg.set(key, valor);
  }
  async remove(key: string) {
    await this.StrgListo()
    this.strg.remove(key);
  }

  async limpiar() {
    await this.StrgListo()
    this.strg.clear();
  }
}
