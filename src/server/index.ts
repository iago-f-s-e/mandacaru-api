import { NestFactory } from '@nestjs/core';
import { Modules } from '@src/modules';
import cors from 'cors';
import helmet from 'helmet';

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../docs/swagger.json';

import * as Settings from './settings';

export async function bootstrap(): Promise<any> { // eslint-disable-line 
  const app = await NestFactory.create(Modules);

  app.use(cors());
  app.use(helmet());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  return app.listen(Settings.PORT, () => {
    console.log('==============================');
    console.log(`Server running on port: ${Settings.PORT} =`);
    console.log('==============================');
  });
}
