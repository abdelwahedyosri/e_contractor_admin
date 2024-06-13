import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtmlTags'
})
export class StripHtmlTagsPipe implements PipeTransform {
  transform(value: string): string {
    const regex = /(<([^>]+)>)/gi;
    return value.replace(regex, '');
  }
}