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

  constructor(private httpClient: HttpClient) { }

  getPacks(): Observable<ContextPack[]> {
    return this.httpClient.get<ContextPack[]>(this.contextPackUrl, {
      params: new HttpParams(),
    });
  }

  getPackById(id: string): Observable<ContextPack> {
    return this.httpClient.get<ContextPack>(this.contextPackUrl + '/' + id);
  }

  addPack(newPack: ContextPack): Observable<string> {
    return this.httpClient.post<{id: string}>(this.contextPackUrl, newPack).pipe(map(res => res.id));
  }
}


