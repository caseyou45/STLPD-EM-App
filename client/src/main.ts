import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

const formData = new URLSearchParams();
formData.append('streetAddress', '2610+Union+Blvd');
formData.append('RealEstatePropertyInfor', 'RealEstatePropertyInfor');
formData.append('BoundaryGeography', 'BoundaryGeography');
formData.append('TrashMaintenance', 'TrashMaintenance');
formData.append('findByAddress', 'Find+address');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
