import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getNames(): string[] {
    return ['aaaaaa','ffff']
  }
}
