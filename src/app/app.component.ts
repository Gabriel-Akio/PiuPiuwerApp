import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { CrudeProvider } from '../providers/crude/crude';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = LoginPage;

  public paginas = [
    { titulo:'Perfil', componente: PerfilPage.name, icone: 'person'}
  ];

  constructor(platform: Platform,
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private _crud: CrudeProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  irParaPagina() {
    this.nav.push(PerfilPage, {
      usuarioClicado: this._crud.usuarioLogado,
      piusContados: this._crud.piusUsuarioLogado
    });
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }
}

