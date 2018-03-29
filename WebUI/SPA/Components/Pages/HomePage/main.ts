import 'reflect-metadata';
import 'zone.js';
import 'chart.js';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HomePageModule } from './home-page.module';




if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        // Before restarting the app, we create a new root element and dispose the old one
        const oldRootElem = document.querySelector('home-page');
        const newRootElem = document.createElement('home-page');
        oldRootElem!.parentNode!.insertBefore(newRootElem, oldRootElem);
        modulePromise.then(appModule => {
            appModule.destroy();
            oldRootElem.parentNode.removeChild(oldRootElem);

        });
    });
} else {
    enableProdMode();
}

// Note: @ng-tools/webpack looks for the following expression when performing production
// builds. Don't change how this line looks, otherwise you may break tree-shaking.
const modulePromise = platformBrowserDynamic().bootstrapModule(HomePageModule);
