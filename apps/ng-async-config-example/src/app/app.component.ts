import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ConfigService } from '@jontze/ng-remote-config';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ng-async-config';

  private readonly configService = inject(ConfigService);

  ngOnInit(): void {
    console.debug('ConfigService:', this.configService.getConfig());
    console.debug('ConfigService:', this.configService.getConfig('features'));
  }
}
