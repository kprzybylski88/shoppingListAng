import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  userSubscr: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.userSubscr = this.authService.user.subscribe({
      next: userData => {
        this.isAuthenticated = !userData ? false : true; // !!user is another way to achieve the same thing.
      }
    });
  }

  saveData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe({ error: err => console.log(err) });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscr.unsubscribe();
  }
}
