import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IgxAvatarModule } from 'igniteui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UserListComponent } from './users/user-list.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './users/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { UserCardComponent } from './users/user-card.component';
import { UserProfileComponent } from './users/user-profile.component';
import { AddUserComponent } from './users/add-user.component';
import { CpListComponent } from './wordRiver/contextPacks/cp-list.component';
import { ContextPackService } from './wordRiver/context-pack.service';
import { CpCardComponent } from './wordRiver/contextPacks/cp-card.component';
import { AddCpComponent } from './wordRiver/contextPacks/add-cp.component';
import { CpInfoComponent } from './wordRiver/contextPacks/cp-info.component';

const MATERIAL_MODULES: any[] = [
	MatListModule,
	MatButtonModule,
	MatIconModule,
	MatToolbarModule,
	MatCardModule,
	MatMenuModule,
	MatSidenavModule,
	MatInputModule,
	MatExpansionModule,
	MatTooltipModule,
	MatSelectModule,
	MatOptionModule,
	MatFormFieldModule,
	MatDividerModule,
	MatRadioModule,
	MatSnackBarModule
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		UserListComponent,
		UserCardComponent,
		UserProfileComponent,
		AddUserComponent,
		CpListComponent,
		CpCardComponent,
		AddCpComponent,
		CpInfoComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		HttpClientModule,
		MATERIAL_MODULES,
		LayoutModule,
    IgxAvatarModule
	],
	providers: [
		UserService,
		ContextPackService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
