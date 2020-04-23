
global.fetch = require('node-fetch');
import funcs from "./functions";

test('test plumbing', () => {
    // console.log("Plumbing Works");
    expect(funcs.hello()).toBe("Hello World");
});

test('test postdata gives a good error if api server not started', async () => {
    try {
        // dummy url:port that does not exist
        const url = 'http://localhost:5678/';
        const data = await funcs.postData(url);
        // The above line should throw an error and we should never get to the next line
        expect("").toBe("This bad port # should have caused an exception.");
    }
    catch (e) {
        expect(e.code).toBe("ECONNREFUSED");
    }
    finally {
    }
});

test('test getNewPerson', () => {
    const peopleCtrl = new funcs.People();
    const p1 = peopleCtrl.getNewPerson();

    expect(p1.fname).toBe('');
    expect(p1.lname).toBe('');
    expect(p1.company).toBe('');
});

test('test load People from api', async () => {

    const peopleCtrl = new funcs.People();

    try {
        const url = funcs.url;
        const postData = funcs.postData;

        // clear the server (delete all the data on the server)
        let data = await postData(url + 'clear');

        let person;
        await peopleCtrl.getPeople();

        expect(peopleCtrl.length()).toBe(0);

        person = peopleCtrl.getNewPerson();
        person.fname = "Larry";
        await peopleCtrl.addOrUpdate(person);

        await peopleCtrl.getPeople();
        expect(peopleCtrl.length()).toBe(1);

        person = peopleCtrl.getNewPerson();
        person.fname = "Lorraine";
        await peopleCtrl.addOrUpdate(person);

        await peopleCtrl.getPeople();
        expect(peopleCtrl.length()).toBe(2);

        person = peopleCtrl.get('1');
        expect(person.fname).toBe('Larry');
        person = peopleCtrl.get('2');
        expect(person.fname).toBe('Lorraine');

        person = peopleCtrl.get('1');
        person.fname = "Lars";
        person.lname = "Shumlich";
        await peopleCtrl.addOrUpdate(person);

        await peopleCtrl.getPeople();
        person = peopleCtrl.get('1');
        expect(person.fname).toBe('Lars');
        person = peopleCtrl.get('2');
        expect(person.fname).toBe('Lorraine');

        // Test the last key works
        expect(peopleCtrl.lastKey).toBe(2);
        const peopleCtrl2 = new funcs.People();
        await peopleCtrl2.getPeople();
        expect(peopleCtrl2.lastKey).toBe(2);


    } catch (e) {
        console.log("*** Start the server dummy ***");
        console.log(e);
        expect("").toBe(e.message);
    }
});

/*
    This tests an interesting problem found in user testing.
    When an instance of a Person Class is copied into a simple object
    the Person methods are not copied only the properties are copied.
*/
test('test load person instance from person copy', async () => {

    const peopleCtrl = new funcs.People();

    // clear the server (delete all the data on the server)
    let data = await funcs.postData(funcs.url + 'clear');

    let person;
    person = peopleCtrl.getNewPerson();
    person.fname = "Larry";
    // console.log(person);
    const newPerson = { ...person };
    // console.log(newPerson);

    await peopleCtrl.addOrUpdate(newPerson);
});
/*
    Make sure addOrUpdate updates the internal storage
*/
test('test addOrUpdate updates internal storage', async () => {

    // clear the server (delete all the data on the server)
    let data = await funcs.postData(funcs.url + 'clear');
    funcs.Person.lastKey = 0;
    const peopleCtrl = new funcs.People();
    
    let p1, p2, k1, k2;
    p1 = peopleCtrl.getNewPerson();
    p1.fname = "Larry";
    await peopleCtrl.addOrUpdate(p1);

    // console.log(peopleCtrl.people);
    
    p2 = peopleCtrl.get('1');
    expect(p2.fname).toBe('Larry');

    p2.fname = "Lars";
    await peopleCtrl.addOrUpdate(p2);
    p1 = peopleCtrl.get('1');
    expect(p1.fname).toBe('Lars');
});
