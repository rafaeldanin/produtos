import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriasProvider {
  private PATH='categorias/';

  constructor(private db:AngularFireDatabase) {

  }

  public getALL(){
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes =>{
        return changes.map(m=> ({ key: m.key, ...m.payload.val() }))
      })
  }

  get(categoriaKey:string){
    return this.db.object(this.PATH + categoriaKey)
    .snapshotChanges()
    .map(m => {
      return { key: m.key, ...m.payload.val()};

    });



  }

  save(categoriaForm: any){
    const categoria ={
      name: categoriaForm.name,
      description: categoriaForm.description
    }

    if (categoriaForm.key){
      this.db.list(this.PATH)
      .update(categoriaForm.key, categoria);
  }else {
    this.db.list(this.PATH).push(categoria);

  }

  }

  remove(categoriaKey:string){
    this.db.list(this.PATH).remove(categoriaKey);

  }

}
