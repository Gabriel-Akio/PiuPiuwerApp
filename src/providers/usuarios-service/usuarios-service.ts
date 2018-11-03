import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario';

@Injectable()
export class UsuariosServiceProvider {

  public token: string;

  constructor(private _http: HttpClient) {
    
  }

  lista() {
    return this._http.get<Usuario[]>('http://piupiuwer.polijunior.com.br/api/usuarios/');
  }

  efetuaLogin(username: string, password: string) {
    let headers = {
      'Content-Type' : 'application/json',
    }
    let body = {
      'username' : username,
      'password' : password,
    }
    return this._http.post('http://piupiuwer.polijunior.com.br/api/login/', body, {headers});
  }

}
