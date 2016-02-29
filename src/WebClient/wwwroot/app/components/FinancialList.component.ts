import { Component, Inject } from 'angular2/core';
import { ServerAPI } from '../services/ServerAPI.service';
import { FinanceSvc } from '../services/Finance.service';
import { SelectedPersonDirective } from '../directives/SelectedPerson.directive';
import { Person } from '../models/Person';
import { Financial } from '../models/Financial';
import { Router, RouteParams } from 'angular2/router';

@Component({
    selector: 'financial',
    templateUrl: '../app/templates/financial.html',
    directives: [SelectedPersonDirective],
    providers: [FinanceSvc]
})
export class FinancialList {

    selectedDude: Person;
    financialArr: Financial[];

    isAddFinancial;
    selectedIndex = -1;
    tempFinancial: any = new Financial("", "", "", "", "");

    constructor( @Inject(ServerAPI) private _serverAPI, private _finSvc: FinanceSvc, private _routeParams: RouteParams) {
        let instanceId = this._routeParams.get('instanceId');

        if (!instanceId) {
            alert(`No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e`);
        }

        var self = this;

        _serverAPI.getPersonByInstanceId(instanceId).subscribe(p => {
            self.selectedDude = p;
            self.financialArr = this.selectedDude.financials;

        }, error => alert(`Server error. Try again later`));
    }

    editFinancial(event, i, isAddFinancial) {
        event.preventDefault();
        this.selectedIndex = i;

        if (isAddFinancial) {
            this.tempFinancial = new Financial("", "", "", "","");
        } else {
            this.tempFinancial = new Financial(this.financialArr[i].Name, this.financialArr[i].AccountNumber, this.financialArr[i].Description, this.financialArr[i].Institution, this.financialArr[i].InstanceId);
        }
        $('#editFinancialModal').modal("show");
    }

    saveFinancial(event) {
        event.preventDefault();

        if (this.selectedIndex === -1) {
            // is Add
            var fin = new Financial(this.tempFinancial.AccountName,
                this.tempFinancial.AccountNumber,
                this.tempFinancial.AccountDescription,
                this.tempFinancial.AccountInstitution, "");

            this.financialArr.push(fin);


            this._finSvc.addFinancial(this.selectedDude.instanceId, fin).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editFinancialModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            // is Edit
            if (this.financialArr[this.selectedIndex] !== this.tempFinancial) {
                this.financialArr[this.selectedIndex] = this.tempFinancial;

                this._finSvc.updateFinancial(this.tempFinancial.InstanceId, this.tempFinancial).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editFinancialModal').modal('hide');
                }, error => alert(`Server error. Try again later`));
            }          
        }

        $('#editFinancialModal').modal("hide");
    }

    closeFinancialEdit(event) {
        event.preventDefault();

        this.tempFinancial = {};

        $('#editFinancialModal').modal("hide");
    }

    deleteFinancial(event, index) {
        event.preventDefault();

        this._finSvc.archiveFinancial(this.financialArr[index].InstanceId).subscribe(result => {
            console.log(result);  
        }, error => alert(`Server error. Try again later`));

        this.financialArr.splice(index, 1);

        $('#editFinancialModal').modal("hide");
    }
}
