import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Piu } from '../../modelos/piu';
import { PiuServiceProvider } from '../../providers/piu-service/piu-service';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';
import { PerfilPage } from '../perfil/perfil';
import { CrudeProvider } from '../../providers/crude/crude';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public pius: Piu[];
  public usuarios: Usuario[];
  public campoPiu: string = '';
  public invalidPiu: boolean;

  constructor(public navCtrl: NavController,
    private _piuService: PiuServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _crud: CrudeProvider,
    private _login: LoginPage) {

  }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Pius...'
    });

    loading.present();

    this._piuService.feed()
              .subscribe(
                (pius) => {
                  this.pius = pius;
                  this.pius.reverse();
                  loading.dismiss();
                },
                (err: HttpErrorResponse) => {
                  console.log(err);

                  loading.dismiss();

                  this._alertCtrl.create({
                    title: 'Falha na conexão',
                    subTitle: 'Não foi possível carregar os Pius! Tente novamente mais tarde',
                    buttons: [
                      { text: 'Ok' }
                    ]

                  }).present();
                }
              )
  }

  irParaPerfil() {
    this.navCtrl.push(PerfilPage.name);
  }

  validaPiu() {
    if(this.campoPiu.length > 140) {
      this.invalidPiu = true;
    }else {
      this.invalidPiu = false;
    }
    //completar
  }

  postaPiu() {
    this._crud
          .postaPiu(false, this.campoPiu, this._login.globalUserID)
          .subscribe(
            (data) => {
              console.log(this.campoPiu);
            },
            () => {
              this._alertCtrl.create({
                title: 'Erro',
                subTitle: 'Piu não enviado.',
                buttons: [
                  { text: 'Ok' }
                ]
              }).present();

            }
          )
    
  }
}
