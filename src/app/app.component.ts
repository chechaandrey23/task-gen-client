import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as queryString from 'query-string'

import {AppService} from './app.service';
import {AppLocalService} from './app.local.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'client';
	entries: any;
	currentPage:number = 0;
	
	loading:boolean = false;
	
	local: string;
	errors: number = 0;
	seed: number = 0;
	
	_errors: number = this.errors;
	
	pathCSV:string = '/entries/csv';
	CSVLink:string = '';
	
	myForm: FormGroup;
	
	locals: Array<any>;
	
	constructor(private service: AppService, private localService: AppLocalService) {
		//this.seed = this.random();
		
		this.locals = this.localService.getLocal();
		this.local = this.localService.getDefaultLocal();
		
		this.myForm = new FormGroup({
			local: new FormControl(this.local, [Validators.required, Validators.pattern(/us|uk|ru/)]),
			errors: new FormControl(this.errors, [Validators.required, Validators.max(1000), Validators.min(0)]),
			seed: new FormControl(this.seed, [Validators.required, Validators.pattern(/\d+/)])
		});
		
		this.myForm.controls.errors.valueChanges.subscribe(() => {this.errorsInvalid = false;});
		this.myForm.controls.seed.valueChanges.subscribe(() => {this.seedInvalid = false;});
		this.myForm.controls.local.valueChanges.subscribe(() => {this.localInvalid = false;});
	}
	
	ngOnInit() {
		this.loading = true;
		this.service.getPartEntries(
			this.myForm.controls.local.value, 
			this.myForm.controls.seed.value, 
			(++this.currentPage), 
			this.myForm.controls.errors.value
		).subscribe((data) => {
			//this.currentPage++;
			this.loading = false;
			this.createCSVLink();
			this.entries = data;
		});
	}
	
	onClickRandom(e: Event) {
		this.seed = this.random();
		this.myForm.controls.seed.setValue(this.seed);
	}
	
	localInvalid:boolean = false;
	errorsInvalid:boolean = false;
	seedInvalid:boolean = false;
	
	onSubmit(e: Event) {
		if(this.myForm.valid) {
			this.currentPage = 0;
			this.service.resetData();
			this.ngOnInit();
			this.localInvalid = false;
			this.errorsInvalid = false;
			this.seedInvalid = false;
			
			this.local = this.myForm.controls.local.value;
			this.errors = this.myForm.controls.errors.value;
			this.seed = this.myForm.controls.seed.value;
		} else {
			this.localInvalid = this.myForm.controls.local.invalid;
			this.errorsInvalid = this.myForm.controls.errors.invalid;
			this.seedInvalid = this.myForm.controls.seed.invalid;
		}
	}
	
	genContent() {
		this.service.getPartEntries(
			this.myForm.controls.local.value, 
			this.myForm.controls.seed.value, 
			(++this.currentPage), 
			this.myForm.controls.errors.value
		).subscribe((data) => {
			//this.currentPage++;
			this.createCSVLink();
			this.entries = data
		});
	}
	
	random() {
		let array = new Uint32Array(1);
		window.crypto.getRandomValues(array);
		return array[0];
	}
	
	createCSVLink() {
		this.CSVLink = this.pathCSV+'?'+queryString.stringify({
			locale: this.local,
			errors: this.errors,
			pageEnd: this.currentPage,
			pageStart: 1,
			seed: this.seed
		});
	}
}
