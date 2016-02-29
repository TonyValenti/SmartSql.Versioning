import {Injectable, Inject, Component} from 'angular2/core';
import {Person} from '../models/Person';
import {eyeColors} from '../models/eyeColors';
import {hairColors} from '../models/hairColors';
import {ClothingSizes} from '../models/ClothingSizes';
import {createEnum} from '../common/enum';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

// Add all operators to Observable
import 'rxjs/Rx';

@Injectable()
export class ServerAPI {

    constructor(private http: Http) { }

    static apiUrl = "http://localhost:47503/api/";

    peopleList: Person[] = [];
    static person: Person;

    /**
     * @description Get person by Instance Id
     * @param {string} instanceId
     * @returns Person
     */
    getPersonByInstanceId(instanceId: string): Observable<Person> {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // If Person is already in memory
        // just return it
        if (ServerAPI.person) {  
            return Observable.create(function (observer) {
                observer.next(ServerAPI.person);
                observer.complete();
            });
        } else {
            var httploc = this.http;
            return Observable.create(function (observer) {
                httploc.post(ServerAPI.apiUrl + 'EntityApi/Details',
                    JSON.stringify({
                        "Key": {
                            "InstanceId": instanceId
                        }
                    }), { headers: headers })
                    .map(res => Person.createRPerson(res.json())).subscribe((person) => {
                        ServerAPI.person = person;
                        observer.next(ServerAPI.person);
                        observer.complete();
                    });
            });                     
        }
    }
   
    /**
     * @description get a json list of
     * @returns Obesrvable list of Persons
     */
    getAllPeople() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(ServerAPI.apiUrl + '/EntityApi/List', '', { headers: headers })
            .map(res => res.json())
            .subscribe((plist) => {

                console.log("People list: ", plist);
                
                // If PeopleList is already in memory
                // just return it
                if (this.peopleList.length > 0) {
                    return Observable.from(this.peopleList).toArray();
                }

                if (localStorage.getItem("people")) {
                    // If data is cached in localStorage, use it
                            
                    for (let personJson of JSON.parse(localStorage.getItem("people"))) {
                        this.peopleList.push(Person.createRPerson(personJson));
                    }

                    return Observable.from(this.peopleList).toArray();
                    //return new Observable<Array<Person>>().share()

                } else {
                    // LocalStorage is empty

                    for (let personJson of plist) {
                        this.peopleList.push(Person.createRPerson(personJson));
                    }

                    return Observable.from(this.peopleList).toArray(); 

                    //  return this.http.get('http://localhost:3000/app/db/data.json').map(res => {

                    //  // Create Person instances and add them to the people list
                    //  for (let personJson of res.json()) {
                    //    this.peopleList.push(Person.createRPerson(personJson));
                    //  }

                    //  //localStorage.setItem("people", JSON.stringify(this.peopleList));

                    //  return this.peopleList;
                    //}).catch(this.logAndPassOn); 
                };

                return Observable.from(this.peopleList).toArray();
            });
    }

    testPersonJSN = {
        "name": "Boban Stojanovski",
        "dob": "1984-09-20",
        "photo": "/content/img/people/bobi.jpg",
        "eyeColor": "Green",
        "hairColor": "Black",
        "ethnicity": "Macedonian",
        "height": "80",
        "heightUnit": 1,
        "weight": "200",
        "weightUnit": 1,
        "sex": "Male",
        "bt": "O-",
        "allergies": [{
            "Name": "Peanuts1",
            "Treatment": "If exposed to Peanuts, inject him with the magic pin and call 911"
        }, {
                "Name": "Peanuts2",
                "Treatment": "If exposed to Peanuts, inject him with the magic pin and call 912"
            }],
        "medications": [{
            "Name": "amoxicillin",
            "Description": "for people with high fever",
            "Usage": "500mg Twice a day"
        }, {
                "Name": "brufen",
                "Description": "for people with high fever also",
                "Usage": "100mg Twice a day"
            }],
        "procedures": [{
            "Name": "Procedure 1",
            "Description": "Did some things ... bla bla 1",
            "Date": "05/02/2013"
        }, {
                "Name": "Procedure 2",
                "Description": "Did some other things also ... bla bla 2",
                "Date": "05/02/2015"
            }],
        "immunizations": [{
            "Name": "Tetanus",
            "Date": "04/06/1999"
        }, {
                "Name": "Bsg",
                "Date": "04/06/1999"
            }],
        "incidents": [{
            "Name": "Broken arm",
            "Description": "He was playinh basket ball and fell",
            "DateTime": "05/02/2013 12:00"
        }, {
                "Name": "Broken rib",
                "Description": "He was playing rugby and broke his rib",
                "DateTime": "02/08/2011 22:00"
            }],
        "governmentId": {
            "SSN": "111-222-333",
            "DLN": "222233335455",
            "TFN": "8889990333",
            "NINO": "11112233115"
        },
        "clothingSizes": {
            "Shirt": "XL",
            "Pants": "M",
            "Shoe": "11",
            "Belt": "80cm",
            "Head": "60cm",
            "Dress": "S"
        },
        "conditions": [{
            "Name": "Asthma",
            "Description": "He has asthma he needs to use an inhaler"
        }, {
                "Name": "Asthma2",
                "Description": "He has asthma he needs to use an inhaler2"
            }],
        "insurances": [{
            "Name": "Blue Cross Blue shield of Nebraska",
            "Details": "Some comments include the phone number and some codes that should go here. This is free text so i can put whatever i want here"
        }, {
                "Name": "Red Cross Red shield of Nebraska",
                "Details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend eu nibh in tempor. Mauris non ultrices tortor. Fusce nec nisi est. Nam vulputate rutrum nunc, nec interdum leo ultricies aliquam. Praesent aliquam posuere mi sit amet mollis. Vestibulum ac ex sed massa venenatis tempus. Vestibulum tortor libero, vulputate ornare gravida bibendum, dignissim id tortor. Integer ac pulvinar nisi. Maecenas vel lobortis justo, sit amet scelerisque magna. Mauris venenatis leo vitae nisl sodales vestibulum. Vivamus bibendum pretium ligula non pharetra. Donec pulvinar tempor massa quis tristique. Aenean ligula mi, bibendum vel orci sit amet, dictum aliquet magna."
            }],
        "emergencyContacts": [{
            "Name": "John Doe",
            "Phone": "0800 123 123"
        }, {
                "Name": "Betty Boop",
                "Phone": "0800 555 333"
            }, {
                "Name": "Pacman",
                "Phone": "0800 444 333"
            }],
        "likes": {
            "Food": ["Pizza", "Apples", "Chocolate"],
            "Music": ["Electro Ambient"],
            "Store": ["BestBuy"],
            "Vehicles": ["Mercedes"],
            "Book": ["The Da Vinci Code"],
            "Beverage": ["Juice"],
            "Movie": ["Matrix"],
            "Show": ["The Big Bang"],
            "Sport": ["Basketball"],
            "Game": ["Starcraft"],
            "Hobby": ["Coding", "Gaming"],
            "Other": ["JS"]
        },
        "dislikes": {
            "Food": ["Bacon"],
            "Music": ["Pop Music"],
            "Store": ["H&M"],
            "Vehicles": ["Nissan", "Daigatsu"],
            "Book": [],
            "Beverage": ["Vodka"],
            "Movie": ["Lost in translation"],
            "Show": ["Kassandra"],
            "Sport": ["Baseball", "Karate"],
            "Game": ["NBA 2015"],
            "Hobby": [],
            "Other": []
        },
        "financials": [{
            "AccName": "Some Account",
            "AccNumber": "123333-000-2222",
            "AccDescription": "My savings account",
            "AccInstitution": "Bank of USA"
        }, {
                "AccName": "Some other account",
                "AccNumber": "123333-222-7777",
                "AccDescription": "My other savings account",
                "AccInstitution": "Bank of Canada"
            }],
        "psychology": {
            "Religion": "Ortodox Christian",
            "ReligiousFrequency": "4 times a month",
            "PolAff": "Republican",
            "LoveLanguage": {
                "wof": true,
                "aos": false,
                "rg": true,
                "qt": true,
                "pt": false
            },
            "AngerLanguage": {
                "r": true,
                "pa": true,
                "av": false,
                "d": false
            }
        },
        "education": {
            "EducationLevel": "Level 100",
            "Certifications": [{
                "Name": "MCPD",
                "StartDate": "2015-09-20",
                "EndDate": "2015-11-20"
            }, {
                    "Name": "MCTS",
                    "StartDate": "2015-06-11",
                    "EndDate": "2015-08-15"
                }]
        }
    };

    addPerson(instanceId: string,name: string) {
        let body = JSON.stringify({
            Values: { Name: name }
        });

        return this.http.post(ServerAPI.apiUrl + "EntityApi/Add", body, new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) }))
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
 $Person = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/EntityApi/Add" -Headers $Headers -Body (ConvertTo-Json @{
        Values = @{
            Name = $EntityName;
        };
    }) 
     */


    private logAndPassOn(error: Error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error);
    }
}
