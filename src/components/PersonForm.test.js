import React from "react";
import { fireEvent, render, screen, act } from '@testing-library/react';

import funcs from "../business/functions";
import PersonForm from './PersonForm';

test('test the basic PersonForm', async () => {
    /*
        create a mock function to simulate the save, cancel, and userMsg
        https://jestjs.io/docs/en/mock-functions
    */
    const mockSaveCallback = jest.fn();
    const mockCancelCallback = jest.fn();
    const mockUserMsgCallback = jest.fn();

    // create a People controller and a new person
    const peopleCtrl = new funcs.People()
    const person = peopleCtrl.getNewPerson();

    // default a few values
    person.fname = 'Larry';
    person.lname = 'Shumlich';

    // Render the form
    render(<PersonForm 
        person={person} 
        save={mockSaveCallback} 
        cancel={mockCancelCallback}
        userMsg={mockUserMsgCallback}
        />);
    // screen.debug()

    // Did the names render correctly
    expect(getValue('fname')).toBe('Larry');
    expect(getValue('lname')).toBe('Shumlich');

    // Update a few values on the form
    updateValue('fname', 'Lorraine');
    updateValue('lname', 'Shumy');
    updateValue('company', 'LM');

    // Trigger a save
    click('Save');

    // The save mock should have been called once
    expect(mockSaveCallback.mock.calls.length).toBe(1);

    // Grab the first parm sent to the mock save object (which should be the person to save)
    const savePerson = mockSaveCallback.mock.calls[0][0];

    // console.log(savePerson);
    expect(savePerson.fname).toBe('Lorraine');
    expect(savePerson.lname).toBe('Shumy');
    expect(savePerson.company).toBe('LM');

    // Trigger a cancel
    click('Cancel');

    // The cancel mock should have been called once
    expect(mockCancelCallback.mock.calls.length).toBe(1);

});


test('test all the attriutes render and are saved for the basic PersonForm', async () => {
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
    const mockUserMsgCallback = jest.fn();

    const person = {};
    for (let k in dummyData) {
        person[k] = dummyData[k];
    }

    // Render the form
    render(<PersonForm 
        person={person} 
        save={mockSaveCallback} 
        userMsg={mockUserMsgCallback}
        />);
    // screen.debug()

    // make sure every field rendored correctly
    for (let k in dummyData) {
        expect(dummyData[k]).toBe(getValue(k));
    }
    // screen.debug()
    
    // Trigger a save
    click('Save');

    // Grab the first parm sent to the mock save object 
    //    (which should be the person to save)
    const savePerson = mockSaveCallback.mock.calls[0][0];

    // console.log(savePerson);
    for (let k in savePerson) {
        expect(savePerson[k]).toBe(dummyData[k]);
    }
});


test('test validation works', async () => {

    const person = {};
    const mockSaveCallback = jest.fn();
    const mockUserMsgCallback = jest.fn();

    // Render the form
    render(<PersonForm 
        person={person} 
        save={mockSaveCallback}
        userMsg={mockUserMsgCallback}
        />);
    // screen.debug()
    
    // Trigger a save to see what errors we get
    click('Save');

    // Should not have done a save
    expect(mockSaveCallback.mock.calls.length).toBe(0);
    // Should have sent a message to the user
    expect(mockUserMsgCallback.mock.calls.length).toBe(1);
    expect(mockUserMsgCallback.mock.calls[0][0]).toMatch(/first name/i);

    updateValue('fname', 'xxx');
    click('Save');
    expect(mockUserMsgCallback.mock.calls.length).toBe(2);
    expect(mockUserMsgCallback.mock.calls[1][0]).toMatch(/last name/i);

    updateValue('lname', 'xxx');
    click('Save');
    expect(mockSaveCallback.mock.calls.length).toBe(1);
    expect(mockUserMsgCallback.mock.calls.length).toBe(3);
    expect(mockUserMsgCallback.mock.calls[2][0]).toMatch(/saved/i);

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

function click (txt) {
    fireEvent.click(
        screen.getByText(txt)
    );
}