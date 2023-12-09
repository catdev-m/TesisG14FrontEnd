import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenJwtInterceptor } from './interceptors/token-jwt/token-jwt.interceptor';



@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        /**
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        */
        // {
        //     provide:HTTP_INTERCEPTORS,
        //     useClass:TokenJwtInterceptor,
        //     multi:true
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
