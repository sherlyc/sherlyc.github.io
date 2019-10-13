import { Injectable } from '@angular/core';
import { CookieService } from './cookie/cookie.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}
}
