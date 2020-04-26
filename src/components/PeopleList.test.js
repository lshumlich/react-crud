import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';

import PeopleList from './PeopleList';

test('test the basic PeopleList', () => {

    // set up the callbacks to test later
    const mockShowOneCallback = jest.fn();
    const mockOnAddCallback = jest.fn();
    // set up test data
    const people = {
        1:{key:'key1',fname:'Larry'},
        2:{key:'key2',fname:'Lorraine'},
    };

    // Render the form
    render(<PeopleList
        people={people}
        showOne={mockShowOneCallback}
        onAdd={mockOnAddCallback}
    />);
    
    // screen.debug()

    // If this is not found the test will fail
    screen.getByText(/peoplelist/i);
    
    click('Larry');

    expect(mockShowOneCallback.mock.calls.length).toBe(1);
    expect(mockShowOneCallback.mock.calls[0][0]).toBe('key1');
    
    click('Lorraine');

    expect(mockShowOneCallback.mock.calls.length).toBe(2);
    expect(mockShowOneCallback.mock.calls[1][0]).toBe('key2');
    
    expect(mockOnAddCallback.mock.calls.length).toBe(0);
    click('Add');

    expect(mockOnAddCallback.mock.calls.length).toBe(1);
    expect(mockShowOneCallback.mock.calls.length).toBe(2);
});

function click (txt) {
    fireEvent.click(
        screen.getByText(txt)
    );
}