import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { LocalStorageServiceService } from './service/local-storage-service.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    InputTextModule,
    CalendarModule,
    PanelModule,
    ButtonModule,
    TableModule,
    MessageModule,
    DropdownModule,
    ToastModule
  ],
  providers: [LocalStorageServiceService, ConfirmationService, MessageService],
  exports: [
    TranslateModule,
    ConfirmDialogModule,
    InputTextModule,
    CalendarModule,
    PanelModule,
    ButtonModule,
    TableModule,
    MessageModule,
    DropdownModule,
    ToastModule],
})
export class SharedModule { }
