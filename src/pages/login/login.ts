import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { CadastroPage } from '../cadastro/cadastro';
import { CrudeProvider } from '../../providers/crude/crude';
import { Usuario } from '../../modelos/usuario';
import { HttpErrorResponse } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public nomeUser: string;
  public username: string = '';
  public password: string = '';
  public globalToken;
  public usuario: Usuario;
  public usuarioLogado;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _usuariosService: UsuariosServiceProvider,
              private _alertCtrl: AlertController,
              private _crud: CrudeProvider,
              private menu: MenuController) {
                this.tirarMenu();
      
  }

  tirarMenu() {
    this.menu.enable(false, 'menu1');
  }

  irParaCadastro() {
    this.navCtrl.push(CadastroPage.name);
  }

  efetuaLogin() {
    console.log(this.username);
    console.log(this.password);

    if (!this.username || !this.password) {
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Preencha todos os campos!',
        buttons: [
          { text: 'ok' }
        ]
      }).present();

      return;
    }

    this._usuariosService
          .efetuaLogin(this.username, this.password)
          .subscribe(
            (data) => {
              this.globalToken = data['token'];
              this.updateGlobalToken();
              this._crud.tokenDecode();
              this.navCtrl.setRoot(HomePage);
            },
            () => {
              this._alertCtrl.create({
                title: 'Erro no login',
                subTitle: 'Username ou senha incorretos! Verifique.',
                buttons: [
                  { text: 'Ok' }
                ]
              }).present();

            }
          )
    }

    updateGlobalToken() {
      let globalToken = this.globalToken;
      this._crud.setGlobalToken(globalToken);
    }

}
