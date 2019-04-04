import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosProvider } from './../../../providers/produtos/produtos';
import { CategoriasProvider } from './../../../providers/categorias/categorias';
import { Observable } from 'rxjs/Observable'; // é o objeto que lista os dados


@IonicPage()
@Component({
  selector: 'page-produtos-edita',
  templateUrl: 'produtos-edita.html',
})
export class ProdutosEditaPage {
title:string;
formProdutos:FormGroup;
// carregar as categorias no ion-select
categorias: Observable<any[]>;
// armazenar um produto
produtos:any;
hasImg:false;
private file: File=null;
// armazenar uma categoria
categoriaItem:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private toast: ToastController,
              private produtosProvider: ProdutosProvider,
              private categoriasProvider: CategoriasProvider) {

              this.produtos = this.navParams.data.produtoKey|| {}

              this.SetupPageTitle();
              this.createForm();
              // buscar todas as categorias
              this.loadCategorias();

  }

  private SetupPageTitle(){
    if(this.navParams.data.produtokey){
      this.title="Alterando Produto";
    } else {
      this.title="Novo Produto";
    }
  }

  private createForm(){
    this.formProdutos = this.formBuilder.group({
      key: [this.produtos.key],
      name: [this.produtos.name, Validators.required],
      description: [this.produtos.description],
      price: [this.produtos.price, Validators.required],
      categoryKey: [this.produtos.categoryKey, Validators.required],
      categoryName: [this.produtos.categoryName],
      imgUrl: [this.produtos.imgUrl],
      img:[this.produtos.img],
    })
  }

  getCategorias() {
    const subscribe = this.categoriasProvider.get(this.formProdutos.value.categoryKey).subscribe((categoriasData: any) => {
      subscribe.unsubscribe();
      this.categoriaItem = categoriasData;
      console.log(this.categoriaItem);
      this.formProdutos.controls['categoryName'].setValue(this.categoriaItem.nome);
      console.log(this.categoriaItem.name);
    });
  }

  private loadCategorias() {
    this.categorias = this.categoriasProvider.getAll();
  }














}
