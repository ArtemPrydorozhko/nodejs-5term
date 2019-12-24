import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('token');
        if (token) {
            const newReq = req.clone({ headers: req.headers.append('Authorization', 'Bearer ' + token) });
            return next.handle(newReq);
        } else {
            return next.handle(req);
        }
    }
}