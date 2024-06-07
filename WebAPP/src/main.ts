import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { IConfig, provideEnvironmentNgxMask } from "ngx-mask";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
  const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
  };
  
  bootstrapApplication(AppComponent, {
      providers: [
           provideEnvironmentNgxMask(maskConfigFunction),
  ],
  }).catch((err) => console.error(err));