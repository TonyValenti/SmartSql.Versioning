import {Pipe, PipeTransform} from 'angular2/core';
 
@Pipe({ name: 'eduLevel' })
export class eduLevel implements PipeTransform {
    transform(value: number, args: string[]): any {
        switch (value) {
            case 0:
                return 'None';
                break;
            case 1000:
                return 'High School';
                break;
            case 2000:
                return 'Technical School';
                break;
            case 3000:
                return 'Some College';
                break
            case 4000:
                return 'Associates Degree';
                break;
            case 5000:
                return 'Batchelors Degree';
                break;
            case 6000:
                return 'Graduate Student';
                break;
            case 7000:
                return 'Masters Degree';
                break;
            case 8000:
                return 'Doctoral Degree';
                break;
            default:
                return 'Select'
        }
    }

}