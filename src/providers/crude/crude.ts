import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { Piu } from '../../modelos/piu';


@Injectable()
export class CrudeProvider {

  public globalUserID;
  public globalToken: string;
  public decodedJSON: string[];
  public usuarioLogado;
  public piusUsuarioLogado: Piu[] = [];

  constructor(public _http: HttpClient) {
  }

  postaPiu(favoritado: boolean, conteudo: string, usuario) {
    let headers = {
      'Authorization' : 'JWT '.concat(this.globalToken),
    }
    let body = {
      'favoritado': favoritado,
      'conteudo': conteudo,
      'usuario': usuario,
    }
    return this._http.post('http://piupiuwer.polijunior.com.br/api/pius/', body, {headers});
  }

  cadastrar(username: string, first_name: string, last_name: string, email: string, password: string) {
    let headers = {
      'Content-Type' : 'application/json',
    }
    let body = {
      'username' : username,
      'first_name' : first_name,
      'last_name' : last_name,
      'email' : email,
      'password' : password,
    }
    return this._http.post('http://piupiuwer.polijunior.com.br/api/usuarios/registrar/', body, {headers});
  }

  favoritaPiu(idPiu: string, favoritoPiu: boolean) {
    let headers = {
      'Authorization' : 'JWT '.concat(this.globalToken),
    }
    let body = {
      'favoritado':  !favoritoPiu,
    }
    
    return this._http.patch('http://piupiuwer.polijunior.com.br/api/pius/' + idPiu, body,{headers});
  }

  deletaPiu(idPiu: string) {
    let headers = {
      'Authorization' : 'JWT '.concat(this.globalToken),
    }
    
    return this._http.delete('http://piupiuwer.polijunior.com.br/api/pius/' + idPiu, {headers});

  }

  setGlobalToken(globalToken) {
    this.globalToken = globalToken;
  }

  setUsuarioLogado(usuarioLogado) {
    this.usuarioLogado = usuarioLogado;
  }

  setPiusUsuarioLogado(piusUsuarioLogado) {
    this.piusUsuarioLogado = piusUsuarioLogado;
  }

  tokenDecode() {
    const token = this.globalToken;
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      this.decodedJSON = JSON.parse(payload);
      this.globalUserID = this.decodedJSON['user_id'];
      return true;
    } else {
      return null;
    }

  }

}
