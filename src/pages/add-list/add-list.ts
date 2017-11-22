import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListItem } from '../../models/list/list-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'page-add-list',
  templateUrl: 'add-list.html',
})
export class AddListPage {

  listItem = {} as ListItem;

  listItemRef$: FirebaseListObservable <ListItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {

this.listItemRef$ = this.database.list('item-list');

  }

  addListItem(listItem: ListItem){

    this.listItemRef$.push({

      itemName: this.listItem.itemName,
      itemNumber: Number(this.listItem.itemNumber)

    })

    this.listItem = {} as ListItem;

    this.navCtrl.pop();

  }

}
