import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmTableComponent } from './cm-table/cm-table.component';
import { CmTablePaginationComponent } from './cm-table-pagination/cm-table-pagination.component';
import { CMTableDirective } from './cm-table.directive';

@NgModule({
  declarations: [
    CmTableComponent,
    CmTablePaginationComponent,
    CMTableDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CmTableComponent,
    CmTablePaginationComponent,
    CMTableDirective
  ]
})
export class TableModule { }