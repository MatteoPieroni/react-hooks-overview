import React from 'react';
import { render, wait } from '@testing-library/react';
import moxios from 'moxios';
import '@testing-library/jest-dom/extend-expect';

import { ResultsList } from '../ResultsList';

const mockResponse = [
    {
      id: 1,
      name: 'test 1',
      html_url: 'test url 1',
      description: 'test desc 1'
    },
    {
      id: 2,
      name: 'test 2',
      html_url: 'test url 2',
      description: 'test desc 2'
    },
]

describe('ResultsList', () => {
    beforeEach(function () {
      moxios.install()
    })

    afterEach(function () {
      moxios.uninstall()
    })

    it('fetches repos onMount', async () => {
      moxios.stubRequest('test-url', {
        status: 200,
        response: mockResponse,
      });
      const { getByText } = render(<ResultsList url="test-url" />);

      await wait(() => {
        expect(getByText('test 1')).toBeInTheDocument();
        expect(getByText('test 2')).toBeInTheDocument();
      });
    })
})