import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {  LayouttComponent } from './layoutt/layout.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LayouttComponent],
  imports: [CommonModule, DashboardRoutingModule, TranslateModule],
})
export class DashboardModule {}
