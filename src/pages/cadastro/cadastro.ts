import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CrudeProvider } from '../../providers/crude/crude';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public username;
  public first_name;
  public last_name;
  public email;
  public password;
  public password1;
  public foto_perfil;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _crud: CrudeProvider,
              private _alertCtrl: AlertController) {
  }

  cadastrar() {
    if (this.password != this.password1) {
      this._alertCtrl.create({
        title: 'Erro no cadastro',
        subTitle: 'Os campos Senha e Confirmar Senha devem ser iguais!',
        buttons: [
          { text: 'ok' }
        ]
      }).present();

      return;

    } else if (!this.password || !this.password1 || !this.username || !this.email || !this.first_name || !this.last_name) {
      this._alertCtrl.create({
        title: 'Erro no cadastro',
        subTitle: 'Todos os campos devem ser preenchidos!',
        buttons: [
          { text: 'ok' }
        ]
      }).present();

      return;
    }

    this._crud.cadastrar(this.username, this.first_name, this.last_name, this.email, this.password)
              .subscribe(
                (data) => {
                  console.log(data);
                  this.navCtrl.setRoot(LoginPage);
                },
                () => {
                  this._alertCtrl.create({
                    title: 'Erro no cadastro',
                    subTitle: 'Cadastro não realizado. Tente novamente mais tarde.',
                    buttons: [
                      { text: 'Ok' }
                    ]
                  }).present();
                }
              )
  }

}
