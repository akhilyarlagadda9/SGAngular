import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.scss'],
})
export class AddareaComponent implements OnInit {

  constructor(public Modalcntrl : ModalController) { }

  ngOnInit() {}
  
  ActionCloseAddArea() {
    this.Modalcntrl.dismiss({
    });
  }

}
