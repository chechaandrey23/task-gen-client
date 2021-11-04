import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable()
export class AppService {
	constructor(private http: HttpClient) {}
	
	protected data = [];
	
	public getPartEntries(locale: string, seed: number, page: number, errors:number) {
		return this.http.get('/entries', {
			responseType: 'json',
			params: {
				locale,
				seed,
				page,
				errors
			}
		}).pipe(map((data: any)=>{
			Array.prototype.push.apply(this.data, data); return this.data
		}));
	}
	
	public resetData() {
		this.data = [];
	}
}
