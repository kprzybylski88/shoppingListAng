import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { ModalImagePreviewComponent } from './modal-image-preview/modal-image-preview.component';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DropdownDirective,
    ModalImagePreviewComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    ModalImagePreviewComponent,
    AlertComponent,
    CommonModule
  ]
})
export class SharedModule {}
