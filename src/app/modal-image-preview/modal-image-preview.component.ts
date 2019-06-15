import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal-image-preview',
  templateUrl: './modal-image-preview.component.html',
  styleUrls: ['./modal-image-preview.component.css']
})
export class ModalImagePreviewComponent implements OnInit {

  @Input() imagePath: string;
  @Output() dismissed = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
  dismiss() {
   // console.log('dismissed');
    this.dismissed.emit();
  }

}
