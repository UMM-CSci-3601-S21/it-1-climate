import { Component, OnInit, Input } from '@angular/core';
import { ContextPack } from '../context-pack';

@Component({
  selector: 'app-cp-card',
  templateUrl: './cp-card.component.html',
  styleUrls: ['./cp-card.component.scss']
})
export class CpCardComponent implements OnInit {

  @Input() contextPack: ContextPack;
  @Input() simple ? = false;

  constructor() { }

  ngOnInit(): void {
  }

}
