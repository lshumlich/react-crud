import React from "react";
import { fireEvent, render, screen, act } from '@testing-library/react';

import funcs from "../business/functions";
import PersonForm from './PersonForm';

test('test plumbing 1', async () => {
    let x1;
    /*
        create a mock function to simulate the save and cancel
        https://jestjs.io/docs/en/mock-functions
    */
    const mockSaveCallback = jest.fn();

    // create a People controler
    const peopleCtrl = new funcs.People()
    const person = peopleCtrl.getNewPerson();
    person.fname = 'Larry';
    person.lname = 'Shumlich';

    // Documentation and sample debug code
    // https://testing-library.com/docs/dom-testing-library/api-queries
    // screen.debug();
    // let value = document.querySelector("[name=lname]");
    // screen.debug(value);

    act(() => {
        // Render the form
        render(<PersonForm person={person} save={mockSaveCallback} />);

        // Change the first name
        fireEvent.change(
            screen.querySelector("[name=fname]"),
            { target: { value: 'Lorraine' } }
        );

        // ************ Roman Big Note: I can not get the second change to work. I have tried everything...
        // Change the last name
        fireEvent.change(
            document.querySelector("[name=lname]"),
            { target: { value: 'Shumy' } }
        );

        // Trigger a save
        fireEvent.click(
            screen.getByText("Save")
        );
    });

    // The save mock should have been called once
    expect(mockSaveCallback.mock.calls.length).toBe(1);

    // Grab the parm sent to the mock save object
    const savePerson = mockSaveCallback.mock.calls[0][0];
    // console.log(savePerson);
    expect(savePerson.fname).toBe('Lorraine');
    expect(savePerson.lname).toBe('Shumy');

    let value = document.querySelector("[name=lname]");
    screen.debug(value);
    console.log(value.value);

});
/*
    This was a just play test
*/
test('from the book', async () => {
    const mockSaveCallback = jest.fn();
    // create a People controler
    const peopleCtrl = new funcs.People()
    const person = peopleCtrl.getNewPerson();
    render(<PersonForm person={person} save={mockSaveCallback} />);

    let input = screen.getByTestId('fname');
    // let input = screen.getByRole("[name=lname]");
    // let input = document.querySelector("[name=lname]");
    // let input = document.querySelector("[name=lname]");
    // screen.debug(input);

    // // const { input } = setup()
    // fireEvent.change(input, { target: { value: '23' } })
    // screen.debug(input);
    // // expect(input.value).toBe('23') // need to make a change so React registers "" as a change
    // act(() => {

    //     // rerender(<PersonForm person={person} save={mockSaveCallback} />);
    // Only the first one works. 
    await fireEvent.change(input, { target: { value: 'Shumy1' } })
    await fireEvent.change(input, { target: { value: 'Shumy2' } })
    await fireEvent.change(input, { target: { value: 'Shumy3' } })
    await fireEvent.change(input, { target: { value: 'Shumy4' } })
    //     screen.debug(input);
    // });
    // // expect(input.value).toBe('Shumy') // need to make a change so React registers "" as a change
    // // fireEvent.change(input, { target: { value: '' } })
    // // expect(input.value).toBe('')
    // // The save mock should have been called once
    // fireEvent.click(
    //     screen.getByText("Save")
    // );
    // expect(mockSaveCallback.mock.calls.length).toBe(1);

    // // Grab the parm sent to the mock save object
    // const savePerson = mockSaveCallback.mock.calls[0][0];
    // console.log(savePerson);
    let input1 = document.querySelector("[name=lname]");
    screen.debug(input1);
})

