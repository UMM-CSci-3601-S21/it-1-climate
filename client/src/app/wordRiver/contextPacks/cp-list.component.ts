import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextPack } from '../context-pack';
import { WordList } from '../word-list';
import { Word } from '../word';
import { ContextPackService } from '../context-pack.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cp-list',
  templateUrl: './cp-list.component.html',
  styleUrls: ['./cp-list.component.scss']
})
export class CpListComponent implements OnInit, OnDestroy {

  public contextPacks: ContextPack[];

  public name: string;
  public icon: string;
  public enabled: boolean;
  public wordlist: Array<WordList>;
  getPackSub: Subscription;

  constructor(private packService: ContextPackService) { }

  getPacksFromServer(): void {
    this.unsub();
    this.getPackSub = this.packService.getPacks().subscribe(
      returnedPacks => {
        this.contextPacks = returnedPacks;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.getPacksFromServer();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if(this.getPackSub) {
      this.getPackSub.unsubscribe();
    }
  }
}
