import {Pipe, PipeTransform} from 'angular2/core';
/*
 * Description for the GovernmentId class fields
 *   SSN - Social Security Number  
 *   DLN - Drivers License Number 
 *   TFN - Tax File Number  
 *   NIN - National Insurance Number
 * Usage:
 *   value | gidfull:exponent
 * Example:
 *   {{ "SSN" |  gidfull}}
 *   formats to: Social Security Number
*/
@Pipe({ name: 'gidfull' })
export class Gidfull implements PipeTransform {
	transform(value: string, args: string[]): any {
		switch (value) {
			case "SSN":
				return "Social Security Number";
			case "DLN": 
				return "Drivers License Number";
			case "TFN": 
				return "Tax File Number";
			case "NIN":  
				return "National Insurance Number";
		}
		return  "Default"
	}
}