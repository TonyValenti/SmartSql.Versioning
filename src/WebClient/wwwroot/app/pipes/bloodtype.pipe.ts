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
                break;
            case 1100:
                return 'A Positive';
                break;
            case 1200:
                return 'A Negative';
                break;
            case 2100:
                return 'B Positive';
                break;
            case 2200:
                return 'B Negative';
                break;
            case 3100:
                return 'AB Positive';
                break;
            case 3200:
                return 'AB Negative';
                break;
            case 4100:
                return 'O Positive';
                break;
            case 4200:
                return 'O Negative';
                break;
            default:
                return 'Select'
        }
    }
}
