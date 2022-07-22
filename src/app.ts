import 'reflect-metadata';
import 'module-alias/register';

import { bootstrapMicroframework } from 'microframework-w3tec';

import { eventDispatchLoader } from './loaders/eventDispatchLoader';
import { expressLoader } from './loaders/expressLoader';
import { homeLoader } from './loaders/homeLoader';
import { iocLoader } from './loaders/iocLoader';
import { swaggerLoader } from './loaders/swaggerLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { winstonLoader } from './loaders/winstonLoader';
import { banner } from './utils/banner';
import { Logger } from './utils/logger';

const log = new Logger(__filename);

bootstrapMicroframework({
  /**
   * APP MODULES
   */
  loaders: [winstonLoader, iocLoader, eventDispatchLoader, typeormLoader, expressLoader, swaggerLoader, homeLoader],
})
  .then(() => banner(log))
  .catch((error) => log.error('Application is crashed: ' + error));
