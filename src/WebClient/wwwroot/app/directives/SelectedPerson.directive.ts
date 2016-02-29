import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {Person} from '../models/Person';

@Component({
  selector: 'selected-person',
  templateUrl: '../app/templates/selectedPerson.html',
  directives: [FORM_DIRECTIVES]
})
export class SelectedPersonDirective {

  // Prop from parent component
  @Input() selectedPerson: Person;

  constructor() {

  }

  openChangeName(event,isAdd) {
      event.preventDefault();
      if (isAdd) {

      }
    $('#editPersonNameModal').modal('show');
  }

  closeChangeName(event, txtName : HTMLInputElement) {
    event.preventDefault();
    txtName.value = this.selectedPerson.name;
    $('#editPersonNameModal').modal('hide');
  }

  changeName(event, txtNameVal) {
    event.preventDefault();
    this.selectedPerson.name = txtNameVal;
    $('#editPersonNameModal').modal('hide');
  }
}
