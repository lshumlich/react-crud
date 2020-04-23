
const url = 'http://localhost:5000/';

function hello() {
    return "Hello World";
}

async function postData(url = '', data = {}) {
    // Default options are marked with *

    const response = await fetch(url, {
        method: 'POST',     // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',       // no-cors, *cors, same-origin
        cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',         // manual, *follow, error
        referrer: 'no-referrer',    // no-referrer, *client
        body: JSON.stringify(data)  // body data type must match "Content-Type" header
    });

    const json = await response.json();    // parses JSON response into native JavaScript objects
    json.status = response.status;
    json.statusText = response.statusText;

    return json;
}

class People {

    constructor () {
        this.people = {};
        this.lastKey = 0;
    }

    length() {
        return Object.keys(this.people).length;
    }

    get(key) {
        return this.people[key];
    }

    getNewPerson() {
        return new Person({});
    }

    async getPeople() {
        const data = await postData(url + "all");

        // create a dictionary of people and keep track of the last key
        const people = {};
        data.forEach(x => {
            people[x.key] = x;
            this.lastKey = (x.key > this.lastKey) ? x.key : this.lastKey;
        });

        this.people = people;
    }

    async addOrUpdate(person) {
        let theUrl;

        if (person.key) {
            theUrl = url + "update"
        } else {
            theUrl = url + "add"
            this.lastKey++;
            person.key = this.lastKey;
        }

        await postData(theUrl, person);
        this.people[person.key] = person;
    }
}

class Person {
    static lastKey = 0;
    constructor(obj) {
        const defaults = {fname:"", lname:"", company:"", city:"", prov:"", post:"", key:""}
        const data = {...defaults, ...obj};
        this.fname = data.fname;
        this.lname = data.lname;
        this.company = data.company;
        this.city = data.city;
        this.prov = data.prov;
        this.post = data.post;
        this.key = data.key;
    }

    newKey() {
        Person.lastKey++;
        this.key=Person.lastKey;
    }
}

export default {Person, People, hello, url, postData};