import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { TodoState } from './application/states/todo/todo.state';
import { TodoService } from './infraestructure/services/todo.service';
import { TodoRepository } from './domain/repositories/todo.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      useClass : TodoService,
      provide: TodoRepository,
    },
    provideStore([TodoState]),
  ],
};
