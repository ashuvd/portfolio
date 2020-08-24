import { Provider } from '@nestjs/common';
import Work from '../models/Work';

export const workProviders: Provider[] = [
  {
    provide: 'WORK_REPOSITORY',
    useValue: Work
  }
]
