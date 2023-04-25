import { Header, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @Header('Access-Control-Allow-Origin', '*')
  getHello(): string {
    return 'Hello World!';
  }
}
