import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedComponent = 'recipes';
  changeDisplayedComponent(componentName: string) {
    this.displayedComponent = componentName;
    // console.log(this.displayedComponent);
  }
}
