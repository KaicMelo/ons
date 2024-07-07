import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
})
export class MenuComponent {
  router: Router = inject(Router);

  onPlayer(): void {
    this.router.navigate(['players']);
  }

  onBattle(): void {
    this.router.navigate(['battle']);
  }

  onPoints(): void {
    this.router.navigate(['points']);
  }
}
