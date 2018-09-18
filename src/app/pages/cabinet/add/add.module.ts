import {NgModule} from '@angular/core';
import {RoomComponent} from './room/room.component';
import {NewsComponent} from './news/news.component';
import {OptionComponent} from './option/option.component';
import {CallbackComponent} from '../callback/callback.component';
import {TariffComponent} from './tariff/tariff.component';
import {GlobalImportsModule} from '../../../shared/config/global-imports/global-imports.module';
import {AmenityNameComponent} from './amenity-name/amenity-name.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProposalComponent } from './proposal/proposal.component';

@NgModule({
  imports: [
    GlobalImportsModule
  ],
  declarations: [RoomComponent, NewsComponent, OptionComponent, CallbackComponent, TariffComponent, AmenityNameComponent, MainPageComponent, ProposalComponent],
})
export class AddModule {
}




