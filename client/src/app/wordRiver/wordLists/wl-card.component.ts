import { Component, OnInit, Input } from '@angular/core';
import { WordList } from '../word-list';

@Component({
  selector: 'app-wl-card',
  templateUrl: './wl-card.component.html',
  styleUrls: ['./wl-card.component.scss']
})
export class WlCardComponent implements OnInit {

  @Input() wordList: WordList;
  @Input() simple ? = false;

  constructor() { }

  ngOnInit(): void {
  }

}
