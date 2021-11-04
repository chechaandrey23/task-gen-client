import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable()
export class AppLocalService {
	public getLocal() {
		return [
			{id: 'us', name: "english USA"},
			{id: 'ru', name: "russian Russia"},
			{id: 'uk', name: "ukranian Ukraine"}
		]
	}
	
	public getDefaultLocal() {
		return 'us';
	}
}
