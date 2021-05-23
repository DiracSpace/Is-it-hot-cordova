import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DisplayClimateOptionsComponent } from './components/display-climate-options/display-climate-options.component';
import { DisplayProgressBarComponent } from './components/display-progress-bar/display-progress-bar.component';
import { DropdownSelectComponent } from './components/dropdown-select/dropdown-select.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayClimateOptionsComponent,
    DisplayProgressBarComponent,
    DropdownSelectComponent
  ],
  imports: [
    NgxSkeletonLoaderModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
