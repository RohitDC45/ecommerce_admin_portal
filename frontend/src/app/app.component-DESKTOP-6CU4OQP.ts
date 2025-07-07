import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']   // ✅ FIX: use styleUrls (plural)
})
export class AppComponent {
  title = 'frontend';
}
