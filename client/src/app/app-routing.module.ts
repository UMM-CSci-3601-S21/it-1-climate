import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { AddUserComponent } from './users/add-user.component';
import { CpListComponent } from './wordRiver/contextPacks/cp-list.component';
import { AddCpComponent } from './wordRiver/contextPacks/add-cp.component';
import { CpInfoComponent } from './wordRiver/contextPacks/cp-info.component';
import { AddWlComponent } from './wordRiver/wordLists/add-wl.component';
import { AddWordsComponent } from './wordRiver/words/add-words.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserListComponent},
  {path: 'packs', component: CpListComponent},
  {path: 'packs/new', component: AddCpComponent},
  {path: 'packs/:id', component: CpInfoComponent},
  {path: 'users/new', component: AddUserComponent},
  {path: 'users/:id', component: UserProfileComponent},
  {path: 'packs/:id/new', component: AddWlComponent},
  {path: 'packs/:id/:name', component: AddWordsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
