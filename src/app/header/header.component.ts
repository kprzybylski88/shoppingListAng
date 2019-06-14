import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuItemClicked = new EventEmitter<string>();
  collapsed = true;

  constructor() { }

  ngOnInit() {
  }

  menuItemSelected(menuItem: string) {
    this.menuItemClicked.emit(menuItem);
  }

}
