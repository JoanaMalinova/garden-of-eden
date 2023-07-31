import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
// import { AuthService } from "./auth.service";

export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                // Authorization:`Bearer ${this.authService.token}`
            }
        })
        return next.handle(req)
    }
}