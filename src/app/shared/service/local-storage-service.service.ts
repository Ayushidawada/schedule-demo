import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  localStorage: any;

  constructor() {
    //Used secure ls for encrypt and decrypt of local storage.
    this.localStorage = new SecureLS({ encodingType: 'aes', isCompression: true });
  }

  /**
   *
   * @param keyName {string} will be the name of the key for local storage
   * @param data  {any} will the data that to be stored against key
   */
  set(keyName, data) {
    this.localStorage.set(keyName, data);
  }

  /**
   *
   * @param keyName key name whose data to be fetched
   */
  get(keyName) {
    return this.localStorage.get(keyName);
  }

  /**
   *
   * @param keyName key name that to be delete from local storage
   */
  remove(keyName) {
    this.localStorage.get(keyName);
  }
}
