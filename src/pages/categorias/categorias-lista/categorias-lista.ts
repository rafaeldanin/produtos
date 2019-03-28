import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CategoriasProvider } from './../../../providers/categorias/categorias';
import { Observable } from 'rxjs/Observable';
import { CategoriasEditaPage } from '../categorias-edita/categorias-edita';

@IonicPage()
@Component({
  selector: 'page-categorias-lista',
  templateUrl: 'categorias-lista.html',
})
export class CategoriasListaPage{
categorias: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              private categoriasProvider: CategoriasProvider) {

        this.categorias = this.categoriasProvider.getALL();
  }

  newItemCategorias(){
    this.navCtrl.push('CategoriasEditaPage');

  }

  editItemCategoria(categoria:any){
    this.navCtrl.push('CategoriasEditaPage', { categoriakey: categoria.key})

  }

  removeItemCategoria(key:string){
    this.categoriasProvider.remove(key);
    this.toast.create({message: "Categoria removida com sucesso", duration:3000, position: 'buttom'}).present();

  }

}
