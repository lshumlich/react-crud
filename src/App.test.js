import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  const fakePeople = [
    { key: 'k1', fname: 'Larry' },
    { key: 'k2', fname: 'Lorraine' },
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakePeople)
    })
  );
  await act(async () => {
    render(<App />);
  });

  // screen.debug();

  screen.getByText(/learn react/i);

  // This should be the default page
  screen.getByText(/peoplelist/i);

  await act(async () => {
    await click('Larry');
  });

  screen.getByText(/person form/i);

  await act(async () => {
    await click('Cancel');
  });

  screen.getByText(/peoplelist/i);

  // const linkElement = getByText(/learn react/i);

  // expect(linkElement).toBeInTheDocument();
});

function click(txt) {
  fireEvent.click(
    screen.getByText(txt)
  );
}
