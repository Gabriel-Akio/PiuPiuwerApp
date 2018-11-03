import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Piu } from '../../modelos/piu';

@Injectable()
export class PiuServiceProvider {

  constructor(private _http: HttpClient) {
  }

  feed() {
    return this._http.get<Piu[]>('http://piupiuwer.polijunior.com.br/api/pius/');
  }

}
