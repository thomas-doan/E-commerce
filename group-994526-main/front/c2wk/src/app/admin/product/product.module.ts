import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { PIndexComponent } from './p-index/p-index.component';
import { PAddComponent } from './p-add/p-add.component';
import { PDeleteComponent } from './p-delete/p-delete.component';
import { PEditComponent } from './p-edit/p-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PIndexComponent,
    PAddComponent,
    PDeleteComponent,
    PEditComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, FormsModule],

  exports: [PAddComponent, PEditComponent],
})
export class ProductModule {}
