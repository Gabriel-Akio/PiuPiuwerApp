import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../../pages/login/login';

@Injectable()
export class CrudeProvider {

  constructor(public _http: HttpClient,
              private _login: LoginPage) {
    console.log('Hello CrudeProvider Provider');
  }

  postaPiu(favoritado: boolean, conteudo: string, usuario: string) {
    let headers = {
      'Authorization' : 'JWT '.concat(this._login.globalToken),
    }
    let body = {
      'favoritado': favoritado,
      'conteudo': conteudo,
      'usuario': usuario,
    }
    return this._http.post('http://piupiuwer.polijunior.com.br/api/pius/', body, {headers});
  }
}
