import { Component, OnInit, Input } from '@angular/core';
import { WordList } from '../word-list';
import { CpInfoComponent } from '../contextPacks/cp-info.component';

@Component({
  selector: 'app-wl-card',
  templateUrl: './wl-card.component.html',
  styleUrls: ['./wl-card.component.scss']
})
export class WlCardComponent implements OnInit {

  @Input() wordList: WordList;
  @Input() simple ? = false;
  _id = CpInfoComponent.id3;


  constructor() { }

  ngOnInit(): void {
  }

}
