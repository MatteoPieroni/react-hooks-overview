import React from 'react';
import { render, wait } from '@testing-library/react';
import moxios from 'moxios';
import '@testing-library/jest-dom/extend-expect';

import { User } from '../User';

// we're not passing reposUrl to avoid having to mock
// the call in ResultsList onMount
const mockResponse = {
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

    it('displays results from a search', () => {
        moxios.stubRequest('test-url', {
          status: 200,
          response: mockResponse,
        });

        wait(() => {
            const { getByText } = render(<User />);

            expect(getByText('test name')).toBeInTheDocument();
            expect(getByText('test blog')).toBeInTheDocument();
            expect(getByText('test location, UK')).toBeInTheDocument();
        })
    })
})