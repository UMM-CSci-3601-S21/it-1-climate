import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextPackService } from '../context-pack.service';
import { Subscription } from 'rxjs';
import { ContextPack } from '../context-pack';
import { ActivatedRoute } from '@angular/router';
import { WordList } from '../word-list';

@Component({
  selector: 'app-cp-info',
  templateUrl: './cp-info.component.html',
  styleUrls: ['./cp-info.component.scss']
})
export class CpInfoComponent implements OnInit, OnDestroy {

  contextPack: ContextPack;
  wordList: WordList[];
  id: string;
  getCpSub: Subscription;

  constructor(private route: ActivatedRoute, private contextPackService: ContextPackService) { }

  ngOnInit(): void {
    // We subscribe to the parameter map here so we'll be notified whenever
    // that changes (i.e., when the URL changes) so this component will update
    // to display the newly requested user.
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      console.log(this.id);
      if (this.getCpSub) {
        this.getCpSub.unsubscribe();
      }
      // eslint-disable-next-line curly
      if(this.id)this.getCpSub = this.contextPackService.getPack(this.id).subscribe(contextPack => {
        this.contextPack = contextPack;
        this.wordList = this.contextPack.wordlist;
      });
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.getCpSub) {
      this.getCpSub.unsubscribe();
    }
  }

}
