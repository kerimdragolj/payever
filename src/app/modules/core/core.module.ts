import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';

@NgModule({
  imports: [
    HttpModule
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ApiService
      ]
    };
  }
}
