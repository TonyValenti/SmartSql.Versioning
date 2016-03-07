import {Pipe, PipeTransform} from 'angular2/core';
 
@Pipe({ name: 'eduLevel' })
export class eduLevel implements PipeTransform {
    transform(value: number, args: string[]): any {
        switch (value) {
            case 0:
                return 'None';                
            case 1000:
                return 'High School';                
            case 2000:
                return 'Technical School';                
            case 3000:
                return 'Some College';
            case 4000:
                return 'Associates Degree';                
            case 5000:
                return 'Batchelors Degree';                
            case 6000:
                return 'Graduate Student';                
            case 7000:
                return 'Masters Degree';                
            case 8000:
                return 'Doctoral Degree';                
            default:
                return 'Select'
        }
    }

}