import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InfiniteScrollComponent} from './infinite-scroll/infinite.scroll.component';
import {AppService} from './app.service';
import {AppLocalService} from './app.local.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
	declarations: [
		AppComponent,
		InfiniteScrollComponent
	],
	imports: [
		NgbModule,
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ScrollingModule
	],
	providers: [AppService, AppLocalService],
	bootstrap: [AppComponent]
})
export class AppModule { }
