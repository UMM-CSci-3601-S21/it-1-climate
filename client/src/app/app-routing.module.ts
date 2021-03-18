import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CpListComponent } from './wordRiver/contextPacks/cp-list.component';
import { AddCpComponent } from './wordRiver/contextPacks/add-cp.component';
import { CpInfoComponent } from './wordRiver/contextPacks/cp-info.component';
import { AddWlComponent } from './wordRiver/wordLists/add-wl.component';
import { AddWordsComponent } from './wordRiver/words/add-words.component';


const routes: Routes = [
  {path: '', redirectTo:'/packs', pathMatch: 'full'},
  {path: 'packs', component: CpListComponent},
  {path: 'packs/new', component: AddCpComponent},
  {path: 'packs/:id', component: CpInfoComponent},
  {path: 'packs/:id/new', component: AddWlComponent},
  {path: 'packs/:id/:name/:type', component: AddWordsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
