import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ContextPack } from './context-pack';
import { WordList } from './word-list';
import { Word } from './word';


@Injectable({
  providedIn: 'root'
})
export class ContextPackService {
  readonly contextPackUrl: string = environment.apiUrl + 'packs';

  //'604fce57a00daf54835a0006';

  constructor(private httpClient: HttpClient) { }


  getPacks(): Observable<ContextPack[]> {
    return this.httpClient.get<ContextPack[]>(this.contextPackUrl, {
      params: new HttpParams(),
    });
  }

  getPack(id: string): Observable<ContextPack> {
    return this.httpClient.get<ContextPack>(this.contextPackUrl + '/' + id);
  }

  addPack(newPack: ContextPack): Observable<string> {
    return this.httpClient.post<{id: string}>(this.contextPackUrl, newPack).pipe(map(res => res.id));
  }

  addWordList(newWordList: WordList): Observable<string> {
    const url1: string[] = location.href.split('/');
    const theUrls: string = url1[4];


    return this.httpClient.post<{id: string}>(this.contextPackUrl + '/' + theUrls, newWordList).pipe(map(res => res.id));
  }

  addWord(newWord: Word): Observable<string> {
    const url1: string[] = location.href.split('/');
    //Gets the id of the context pack from the current url
    const theUrls: string = url1[4];
    //Gets the name of the wordlist form the url
    const theUrls3: string = url1[5];
    return this.httpClient.post<{id: string}>(this.contextPackUrl + '/' + theUrls + '/' + theUrls3, newWord)
    .pipe(map(res => res.id));
  }
}


