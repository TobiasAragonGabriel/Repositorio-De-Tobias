import { Pipe, PipeTransform } from '@angular/core';

interface MyElement {
  Nombre: string;
  Apellido: string;
}

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(element: MyElement): string {
    if (!element || typeof element.Nombre !== 'string' || typeof element.Apellido !== 'string') {
      return "";
    }
    return `${element.Nombre} ${element.Apellido}`;
  }

}
