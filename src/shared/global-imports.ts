import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'front'}),
  ],
  exports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GlobalImportsModule {
}
