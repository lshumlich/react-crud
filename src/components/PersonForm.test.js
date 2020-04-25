import React from "react";
import { fireEvent, render, screen, act } from '@testing-library/react';

import funcs from "../business/functions";
import PersonForm from './PersonForm';

test('test the basic PersonForm', async () => {
    /*
        create a mock function to simulate the save and cancel
        https://jestjs.io/docs/en/mock-functions
    */
    const mockSaveCallback = jest.fn();
    const mockCancelCallback = jest.fn();

    // create a People controller and a new person
    const peopleCtrl = new funcs.People()
    const person = peopleCtrl.getNewPerson();

    // default a few values
    person.fname = 'Larry';
    person.lname = 'Shumlich';

    // Render the form
    render(<PersonForm person={person} save={mockSaveCallback} cancel={mockCancelCallback}/>);
    // screen.debug()

    // Did the names render correctly
    expect(getValue('fname')).toBe('Larry');
    expect(getValue('lname')).toBe('Shumlich');

    // Update a few values on the form
    updateValue('fname', 'Lorraine');
    updateValue('lname', 'Shumy');
    updateValue('company', 'LM');

    // Trigger a save
    fireEvent.click(
        screen.getByText("Save")
    );

    // The save mock should have been called once
    expect(mockSaveCallback.mock.calls.length).toBe(1);

    // Grab the first parm sent to the mock save object (which should be the person to save)
    const savePerson = mockSaveCallback.mock.calls[0][0];

    // console.log(savePerson);
    expect(savePerson.fname).toBe('Lorraine');
    expect(savePerson.lname).toBe('Shumy');
    expect(savePerson.company).toBe('LM');

    // Trigger a cancel
    fireEvent.click(
        screen.getByText("Cancel")
    );
    // The cancel mock should have been called once
    expect(mockCancelCallback.mock.calls.length).toBe(1);

});


test('test all the attriutes for the basic PersonForm', async () => {
    const dummyData = {
        fname: 'fnamexx',
        lname: 'lnamexx',
        company: 'companyxx',
        address: 'addressxx',
        city: 'cityxx',
        prov: 'provxx',
        post: 'postxx',
    };

    const mockSaveCallback = jest.fn();

    // create a People controller and a new person
    // const peopleCtrl = new funcs.People()
    // const person = peopleCtrl.getNewPerson();
    const person = {};
    for (let k in dummyData) {
        person[k] = dummyData[k];
    }

    // Render the form
    render(<PersonForm person={person} save={mockSaveCallback}/>);
    // screen.debug()

    // make sure every field rendored correctly
    for (let k in dummyData) {
        expect(dummyData[k]).toBe(getValue(k));
    }
    // screen.debug()
    
    // Trigger a save
    fireEvent.click(
        screen.getByText("Save")
    );

    // Grab the first parm sent to the mock save object (which should be the person to save)
    const savePerson = mockSaveCallback.mock.calls[0][0];
    // console.log(savePerson);

    for (let k in savePerson) {
        expect(savePerson[k]).toBe(dummyData[k]);
    }
});

/*
    utility functions to save tons of code
*/
function getValue(name) {
    return document.querySelector(`[name=${name}]`).value;
}

function updateValue(name, value) {
    document.querySelector(`[name=${name}]`).value = value;
}