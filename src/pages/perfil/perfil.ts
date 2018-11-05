import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  public usuario;
  public piusContados;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private menu: MenuController) {
                this.usuario = this.navParams.get("usuarioClicado");
                this.piusContados  = this.navParams.get("piusContados")
                this.colocaMenu();
  }

  colocaMenu() {
    this.menu.enable(true, 'menu1');
  }

}
