import { Provider } from '@nestjs/common';
import Skill from '../models/Skill';

export const skillProviders: Provider[] = [
  {
    provide: 'SKILL_REPOSITORY',
    useValue: Skill
  }
]
