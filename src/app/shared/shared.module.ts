import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective
  ],
  exports: [
    CommonModule,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
    FormsModule
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule { }
