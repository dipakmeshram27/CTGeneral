import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxModuleRoutingModule } from './inbox-module-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { CalendarCommonModule, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InboxComponent],
  imports: [
    CommonModule,
    CalendarCommonModule,
    InboxModuleRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ReactiveFormsModule
  ]
})
export class InboxModuleModule { }
