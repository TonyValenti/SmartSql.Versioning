import {Pipe, PipeTransform} from 'angular2/core';
/*
 * O-	O+	A-	A+	B-	B+	AB-	AB+ (The + and - spelled out "O Positive")
 *
 * 
 * ///
*/
@Pipe({ name: 'bt' })
export class bloodtype implements PipeTransform {
    transform(value: number, args: string[]): any {
        //var sign = value.slice(-1);

        //remove the sign
        //value = value.slice(0, -1);
        //return value + (sign === "+" ? "-Positive" : "-Negative");
 
        switch (value) {
            case 0:
                return 'Unknown';                
            case 1100:
                return 'A Positive';                
            case 1200:
                return 'A Negative';                
            case 2100:
                return 'B Positive';                
            case 2200:
                return 'B Negative';                
            case 3100:
                return 'AB Positive';                
            case 3200:
                return 'AB Negative';                
            case 4100:
                return 'O Positive';                
            case 4200:
                return 'O Negative';                
            default:
                return 'Select'
        }
    }
}