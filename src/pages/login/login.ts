import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from '../../modelos/usuario';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { CadastroPage } from '../cadastro/cadastro';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username;
  public password;
  public globalToken;
  public decodedJSON: string[];
  public globalUserID;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _usuariosService: UsuariosServiceProvider,
              private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  irParaCadastro() {
    this.navCtrl.push(CadastroPage);
  }

  efetuaLogin() {
    console.log(this.username);
    console.log(this.password);

    this._usuariosService
          .efetuaLogin(this.username, this.password)
          .subscribe(
            (data) => {
              console.log(data["token"]);
              this.globalToken = data['token'];
              this.tokenDecode();
              this.globalUserID = this.decodedJSON['user_id'];
              console.log(this.globalUserID);
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

    tokenDecode() {
      const token = this.globalToken;
      let payload;
      if (token) {
        payload = token.split(".")[1];
        payload = window.atob(payload);
        this.decodedJSON = JSON.parse(payload);
        return true;
      } else {
        return null;
      }
  
    }

}
