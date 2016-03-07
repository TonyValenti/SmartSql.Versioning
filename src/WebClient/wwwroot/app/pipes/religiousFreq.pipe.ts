import {Pipe, PipeTransform} from 'angular2/core';
 
@Pipe({ name: 'religiousFreq' })
export class religiousFreq implements PipeTransform {
    transform(value: number, args: string[]): any { 
        switch (value) {
            case 0:
                return 'Never';
            case 1000:
                return 'Several times per year';
            case 2000:
                return 'Once or twice per month';
            case 3000:
                return 'Every week';

            default:
                return 'Select'
        }
    }
}
