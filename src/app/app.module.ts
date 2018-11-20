import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {PagesModule} from './pages/pages/pages.module';
import {CabinetModule} from './pages/cabinet/cabinet.module';
import {FormsModule} from '@angular/forms';
import {GlobalImportsModule} from '../shared/config/global-imports/global-imports.module';
import {DateValueAccessorModule} from 'angular-date-value-accessor';
import {routes} from './app.routes';
import {PipeModule} from '../shared/pipe/pipe.module';
import {RouterModule} from '@angular/router';
import {CallbackService} from '../shared/service/callback.service';
import {ServiceService} from '../shared/service/service.service';
import {NewsService} from '../shared/service/news.service';
import {MenuComponent} from './pages/pages/menu/menu.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UserDetailsService} from '../shared/service/user-details.service';
import {LoginService} from '../shared/service/login.service';
import {BookService} from '../shared/service/book.service';
import {AuthInterceptor} from '../shared/service/interceptors/auth-interceptor';
import {ContentInterceptor} from '../shared/service/interceptors/content-interceptor';
import {LoginInterceptor} from '../shared/service/interceptors/login-interceptor';
import {AdminGuard} from '../shared/Guard/AdminGuard';
import {AdminChildrenGuards} from '../shared/Guard/admin-children-guards.service';
import {CarrentLanguadgeService} from '../shared/service/carrent-languadge.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {SeoService} from '../shared/service/seo.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    PagesModule,
    CabinetModule,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    GlobalImportsModule,
    PipeModule,
    RouterModule.forRoot(routes, {useHash: false}),
    DateValueAccessorModule

  ],
  providers: [CallbackService,
    ServiceService,
    NewsService,
    MenuComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    },
    UserDetailsService,
    LoginService,
    BookService,
    AdminGuard,
    AdminChildrenGuards,
    CarrentLanguadgeService,
    SeoService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}


