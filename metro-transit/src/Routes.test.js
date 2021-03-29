import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Routes } from './Components/Routes';

afterEach(cleanup);

it("matches snapshot", () => {
  const { asFragment } = render(<Routes />);
  expect(asFragment()).toMatchSnapshot();
});

  



  