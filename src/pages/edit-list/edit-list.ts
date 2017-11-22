import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {ListItem} from "../../models/list/list-item.interface";
import {Subscription} from "rxjs/Subscription";


// for lazy loading your thingies
@IonicPage()
@Component({
  selector: 'page-edit-list',
  templateUrl: 'edit-list.html',
})
export class EditListPage {

  listItemSubscription: Subscription;
  listItemRef$: FirebaseObjectObservable<ListItem>;
  listItem = {} as ListItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {

    const listItemId = this.navParams.get('listItemId');

    console.log(listItemId);

    this.listItemRef$ = this.database.object(`item-list/${listItemId}`);

    this.listItemSubscription = this.listItemRef$.subscribe(listItem => this.listItem = listItem);

  }

  editListItem(listItem: ListItem) {
    this.listItemRef$.update(listItem);
    this.navCtrl.pop()
  }


  ionViewWillLeave(){
    this.listItemSubscription.unsubscribe()
  }

}
