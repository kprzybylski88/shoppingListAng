import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { ModalImagePreviewComponent } from './modal-image-preview/modal-image-preview.component';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    DropdownDirective,
    ModalImagePreviewComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    DropdownDirective,
    ModalImagePreviewComponent,
    AlertComponent,
    MatInputModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class SharedModule {}
