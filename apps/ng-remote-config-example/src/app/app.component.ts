import { Component, inject, signal } from '@angular/core';
import { ConfigService } from '@jontze/ng-remote-config';
import { DefaultConfig, FeaturesConfig } from './config';
import { JsonPipe } from '@angular/common';

import { EditorComponent } from './editor/editor.component';

@Component({
  imports: [JsonPipe, EditorComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly configService = inject(ConfigService);

  defaultConfig = signal(this.configService.getConfig<DefaultConfig>());
  featureFlags = signal(
    this.configService.getConfig<FeaturesConfig>('features')
  );
}
