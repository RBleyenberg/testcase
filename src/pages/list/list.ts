import {Component} from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {AddListPage} from '../add-list/add-list';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {ListItem} from "../../models/list/list-item.interface";
import {EditListPage} from "../edit-list/edit-list";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  itemListRef$: FirebaseListObservable<ListItem[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase,
              private actionSheetCtrl: ActionSheetController) {

    this.itemListRef$ = this.database.list('item-list');

  }

  selectlistItem(listItem: ListItem) {

    this.actionSheetCtrl.create({
      title: `${listItem.itemName}`,
      buttons: [{
        text: 'edit',
        handler: () => {
          this.navCtrl.push(EditListPage, {listItemId: listItem.$key});
        }
      },
        {
          text: 'delete',
          role: 'destructive',
          handler: () => {
            this.itemListRef$.remove(listItem.$key)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("you canceled your thingy")
          }
        }
      ]
    }).present()

  }

  navigateToAddList() {
    this.navCtrl.push(AddListPage)
  }

}
