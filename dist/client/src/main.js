"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const app_module_1 = require("./app/app.module");
const formData = new URLSearchParams();
formData.append('streetAddress', '2610+Union+Blvd');
formData.append('RealEstatePropertyInfor', 'RealEstatePropertyInfor');
formData.append('BoundaryGeography', 'BoundaryGeography');
formData.append('TrashMaintenance', 'TrashMaintenance');
formData.append('findByAddress', 'Find+address');
(0, platform_browser_dynamic_1.platformBrowserDynamic)()
    .bootstrapModule(app_module_1.AppModule)
    .catch((err) => console.error(err));
