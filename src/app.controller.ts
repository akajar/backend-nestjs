import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';

// TODO http://localhost:3000
// aqui solo debes llamar servicios de app.service.ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //decorador con el nombre de un metodo http
  //entre parentesis van las rutas 

  @Get('name')
  getArray(): string[] {
    return this.appService.getNames()
  }

  @Get() 
  getHello(): string {
    return this.appService.getHello();
  }
}
