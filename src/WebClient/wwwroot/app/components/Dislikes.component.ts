import {Component, Inject} from 'angular2/core';
import {ServerAPI} from '../services/ServerAPI.service';
import {SelectedPersonDirective} from '../directives/SelectedPerson.directive';
import {Person} from '../models/Person';

@Component({
  selector: 'dislikes',
  templateUrl: '../app/templates/dislikes.html',
  directives: [SelectedPersonDirective]
})
export class Dislikes {

  selectedDude: Person;
  dislikesData;
  dislikesProps = [];

  editTypeOfDisLike;

  constructor( @Inject(ServerAPI) private _serverAPI) {

    _serverAPI.getAllPeople().subscribe(people => {
      this.selectedDude = people[0];
      this.dislikesData = people[0].dislikes;

      for (let prop in this.dislikesData) {
        if (this.dislikesData.hasOwnProperty(prop)) {
          this.dislikesProps.push([prop]);
        }
      }
    }, error => alert(`Server error. Try again later`));
  }

  editDisLikes(event, editTypeOfDisLike) {
    event.preventDefault();

    this.editTypeOfDisLike = editTypeOfDisLike;

    $('#editDisLikes').modal('show');
  }

  saveDisLike($event, newValue) {
    event.preventDefault();

    this.dislikesData[this.editTypeOfDisLike] = newValue;

    $('#editDisLikes').modal('hide');
  }

  closeDisLikeModal(event, txtDisLike) {
    event.preventDefault();

    txtDisLike.value = this.dislikesData[this.editTypeOfDisLike];

    $('#editDisLikes').modal('hide');
  }

  deleteDisLikes($event, typeOfLike) {
    event.preventDefault();

    this.dislikesData[typeOfLike] = "";

    $('#editDisLikes').modal('hide');
  }
}
