import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { Piu } from '../../modelos/piu';
import { PiuServiceProvider } from '../../providers/piu-service/piu-service';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';
import { PerfilPage } from '../perfil/perfil';
import { CrudeProvider } from '../../providers/crude/crude';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public pius: Piu[];
  public piusUsuario: Piu[] = [];
  public piusUsuarioLogado: Piu[] = [];
  public usuarioLogado: Usuario;
  public usuarios: Usuario[];
  public campoPiu: string = '';
  public invalidPiu: boolean;
  public nomeUser: string = "";
  public mensagemErro: string = "";

  constructor(public navCtrl: NavController,
    private _piuService: PiuServiceProvider,
    private _alertCtrl: AlertController,
    private _crud: CrudeProvider,
    private _usuariosService: UsuariosServiceProvider,
    private menu: MenuController) {
      this.colocaMenu();
  }

  ionViewDidLoad() {
    this.mensagemErro = '';
    this._usuariosService.usuario(this._crud.globalUserID)
              .subscribe(
                (data) => {
                  this.usuarioLogado = data;
                  this.nomeUser = this.usuarioLogado['username'];
                  this.updateUsuarioLogado();
                },
                (err: HttpErrorResponse) => {
                  console.log(err);
                }
              )
    this._piuService.feed()
              .subscribe(
                (pius) => {
                  this.pius = pius;
                  this.pius.reverse();
                  this.updatePiusUsuarioLogado();
                },
                (err: HttpErrorResponse) => {
                  console.log(err);

                  
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

  irParaPerfil(usuarioClicado) {
    this.contaPius(usuarioClicado);
    this.navCtrl.push(PerfilPage, {
      usuarioClicado: usuarioClicado,
      piusContados: this.piusUsuario
    });
  }

  validaPiu() {
    if(this.campoPiu.length > 140) {
      this.invalidPiu = true;
    }else {
      this.invalidPiu = false;
    }
  }

  postaPiu() {
    this.mensagemErro = '';
    if (this.campoPiu.length > 140) {
      this.mensagemErro = "Limite de 140 caracteres atingido!"
    } else if (this.campoPiu.length == 0) {
      this.mensagemErro = "Piu não pode ser em branco!"
    } else {
      this._crud
            .postaPiu(false, this.campoPiu, this._crud.globalUserID)
            .subscribe(
              () => {
                this.ionViewDidLoad();
              },
              () => {
                this.mensagemErro = 'Piu não enviado! Tente novamente mais tarde.'
              }
            )
    } 
  }

  favoritaPiu(favoritoPiu, idPiu) {
      this._crud.favoritaPiu(idPiu, favoritoPiu)
                .subscribe (
                  () => {
                    console.log("Piu favoritado/desfavoritado");
                    this.ionViewDidLoad();
                  },
                  (err: HttpErrorResponse) => {
                    console.log(err);
                  }
                )
  }

  deletaPiu(idUsuario, idPiu) {
    if (idUsuario == this._crud.globalUserID) {
      this._crud.deletaPiu(idPiu)
                .subscribe (
                  (data) => {
                    console.log("Piu deletado");
                    this.ionViewDidLoad();
                  },
                  (err: HttpErrorResponse) => {
                    console.log(err);
                  }
                )
    }
  }

  contaPius(usuarioPiu: Usuario) {
    this.piusUsuario = [];
    this.pius.forEach(data => {
      if (data.usuario.id == usuarioPiu.id) {
        this.piusUsuario.push(data); 
      }
    });
  }

  updatePiusUsuarioLogado() {
    this.piusUsuarioLogado = [];
    this.pius.forEach(data => {
      if (data.usuario.id == this.usuarioLogado.id) {
        this.piusUsuarioLogado.push(data); 
      }
    });
    this._crud.setPiusUsuarioLogado(this.piusUsuarioLogado);
  }

  updateUsuarioLogado() {
    let usuarioLogado = this.usuarioLogado;
    this._crud.setUsuarioLogado(usuarioLogado);
  }

  colocaMenu() {
    this.menu.enable(true, 'menu1');
  }
}
