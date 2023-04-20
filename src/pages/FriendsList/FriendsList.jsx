import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LoadingScreen from '../../components/LoadingScreen';
import getFriendsList from '../../api/UserMannagement/getFriendsList';
import getUid from '../../api/UserMannagement/getUid';


export default function FriendsList() {
  const { uid } = useParams()
  const [savedUid, setSavedUid] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [pendingList, setPendingList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await getUid().then((results) => setSavedUid(results));

      // Check if the uid is the same as the logged in user
      if (uid !== savedUid) {
        setLoading(false);
        return;
      }

      await getFriendsList(uid).then((results) => {
        console.log({ results });
        setFriendsList(results.friends);
        setPendingList(results.pending);
        setLoading(false);
      });
    }

    fetch();
  }, []);


  if (loading) {
    return (
      <LoadingScreen text={'Fetching data'} />
    );
  }

  if (savedUid !== uid) {
    return (
      <div>
        <h1>Oops! Seems like that's not your account... What a shame...</h1>
      </div>
    );
  }

  return (
    <div>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Friends</Tab>
          <Tab>Pending</Tab>
        </TabList>

        <TabPanel>
          <Friends friends={friendsList} />
        </TabPanel>

        <TabPanel>
          <FriendRequests requests={pendingList} />
        </TabPanel>
      </Tabs>
    </div>
  );
}


function Friends({ friends }) {
  return (
    <div>
      Friends
    </div>
  );
}

function FriendRequests({ requests }) {
  return (
    <div>
      Pending Friend Requests
    </div>
  );
}