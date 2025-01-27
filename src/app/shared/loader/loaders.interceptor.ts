import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoadersInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request has the `X-Skip-Loader` header
    const skipLoader = req.headers.get('X-Skip-Loader');
    if (skipLoader) {
      // Clone the request without the `X-Skip-Loader` header
      const modifiedReq = req.clone({ headers: req.headers.delete('X-Skip-Loader') });
      return next.handle(modifiedReq);
    }

    // Show loader for requests without the skip loader header
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
