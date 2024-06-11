# Angular Remote Configuration Library

## ToC

- [Angular Remote Configuration Library](#angular-remote-configuration-library)
  - [ToC](#toc)
  - [Overview](#overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Angular Version Matrix](#angular-version-matrix)
  - [Usage](#usage)
    - [Example](#example)
  - [Why?](#why)
    - [Addressing Angular’s Limitation with Async Providers](#addressing-angulars-limitation-with-async-providers)
    - [Drawbacks to Consider](#drawbacks-to-consider)
  - [Contribution](#contribution)
  - [License](#license)

## Overview

This Angular library provides a simple way to manage remote configuration
settings in an Angular application. The library allows you to store, retrieve,
and inject configuration objects in a structured and type-safe manner.

## Features

- Easy to set and retrieve configurations.
- Injectable service for accessing configurations via Angular's dependency
  injection system.
- Support to access configurations outside of the DI context.

## Installation

Install it via npm

```bash
npm install @jontze/ng-remote-config
```

or yarn

```bash
yarn add @jontze/ng-remote-config
```

or any other Node.JS package manager.

## Angular Version Matrix

| Angular Version | ng-remote-config Version |
| --------------- | ------------------------ |
| ^18.0.0         | ^1.0.0                   |

## Usage

1. Fetch your Config and Set in the Store

Move your angular app bootstrap code to a separate file. Here it's called
`bootstrap.ts`.

```typescript
// bootstrap.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig);
```

In your application entrypoint (usually `main.ts`), fetch the configuration
files and then set them in the store. After that, import your application
bootstrap.

```typescript
// main.ts
import { setRemoteConfig } from '@jontze/ng-remote-config';

Promise.all([
  fetch('/assets/config.json')
    .then((res) => res.json())
    .then((config) => setRemoteConfig(config)),
  fetch('/assets/features.json')
    .then((res) => res.json())
    .then((features) => setRemoteConfig(features, 'features')),
])
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
```

2. Provide the Configuration in DI

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideConfig } from '@jontze/ng-remote-config';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideConfig()],
};
```

3. Access the Configuration via the ConfigService

```typescript
interface YourConfigType {
  apiUrl: string;
}

interface FeatureFlags {
  featureA: boolean;
  featureB: boolean;
}

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly configService = inject(ConfigService);

  ngOnInit(): void {
    console.debug('ConfigService:', this.configService.getConfig<YourConfigType>());
    console.debug('ConfigService:', this.configService.getConfig<FeatureFlags>('features'));
  }
}
```

4. Outside of the DI Context: Access the Configuration via the Store

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getRemoteConfig } from '@jontze/ng-remote-config';

import { appRoutes } from './app.routes';

interface ApiConfig {
  apiUrl: string;
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideSomeAPI({ url: getRemoteConfig<ApiConfig>().apiUrl })],
};
```

### Example

You can take a look at the
[ng-remote-config-example](./apps/ng-remote-config-example/) application for a
better understanding.

## Why?

In traditional Angular applications, configurations are often hardcoded or
environment-specific. This approach requires a separate build for each
environment (e.g., development, staging, production). Managing multiple builds
can be cumbersome and error-prone, especially in continuous integration and
delivery pipelines.

To prevent this you can dynamically load configurations at runtime, eliminating
the need for multiple builds. This allows you to have a single build that can be
deployed across different environments. Furthermore, you can even change
configuration without the need to redeploy your app! **Built once, deploy
everywhere!**

### Addressing Angular’s Limitation with Async Providers

Angular lacks built-in support for asynchronous providers, making it difficult
to fetch and inject loaded configurations or settings dynamically during
application bootstrap.

Issue: [angular/angular#23279](https://github.com/angular/angular/issues/23279)

A common and reliable solution to this problem is to fetch the configurations
before application bootstrap. However, this has several drawbacks.

### Drawbacks to Consider

1. **Increased Initial Loading Time**: Fetching configurations dynamically at
   runtime add to the initial loading time of your application. The
   configurations need to be retrieved and processed before the application can
   fully initialize, which might slightly delay the startup time.

2. **Potential for Run-time Errors**: Since configurations are fetched
   dynamically, any issues with the configuration service or the configuration
   data itself can lead to run-time errors.

3. **Dependency on External Configuration Services**: Relying on remote
   configurations means your application depends on the availability and
   reliability of the configuration service. Network issues or service outages
   can impact your application's ability to retrieve configurations, so you
   should consider fallback mechanisms or local caching.

## Contribution

Contributions are welcome! Please open issues or pull requests for bug reports
or feature requests.

## License

This project is licensed under the MIT License.
