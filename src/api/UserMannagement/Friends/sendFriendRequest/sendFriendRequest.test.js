import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import sendFriendRequest from './sendFriendRequest';

jest.mock('axios');

describe('sendFriendRequest', () => {
  it('should send friend request to server with correct parameters', () => {
    const uid = '123';
    const token = 'fakeToken';
    localStorage.setItem('token', token);
    const url = 'http://localhost:4000';

    const expectedData = {
      sendToUid: uid,
    };
    const expectedHeaders = {
      Authorization: `Bearer ${token}`,
    };

    sendFriendRequest(uid);

    expect(axios.post).toHaveBeenCalledWith(`${url}/user/friendRequest`, expectedData, { headers: expectedHeaders });
  });
});
