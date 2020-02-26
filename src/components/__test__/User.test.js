import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import moxios from 'moxios';
import '@testing-library/jest-dom/extend-expect';

import { User } from '../User';

// we're not passing reposUrl to avoid having to mock
// the call in ResultsList onMount
const mockResponse = {
  id: 1,
  name: 'test name',
  blog: 'test blog',
  location: 'test location, UK',
};

describe('User', () => {
    beforeEach(function () {
      moxios.install()
    })

    afterEach(function () {
      moxios.uninstall()
    })

    it('displays results from a search', async () => {
        moxios.stubRequest('https://api.github.com/users/test', {
          status: 200,
          response: mockResponse,
        });
        const { getByText, getByLabelText } = render(<User />);

        fireEvent.change(getByLabelText('What username do you want to view?'), {
          target: { value: 'test' }
        });
        fireEvent.click(getByText('Submit'));

        await wait(() => {
            expect(getByText('test name')).toBeInTheDocument();
            expect(getByText('test blog')).toBeInTheDocument();
            expect(getByText('test location, UK')).toBeInTheDocument();
        });
    })
})