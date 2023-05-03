import React, { useState, useEffect, lazy } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import LoadingScreen from '../../../components/LoadingScreen';
import getPersonalFriendsList from '../../../api/UserMannagement/getFriendsList';
import getUid from '../../../api/UserMannagement/getUid';
import styles from './FriendsList.module.scss';
import acceptFriendReq from '../../../api/UserMannagement/Friends/acceptFriendReq';

const FriendWidget = lazy(() => import('./subComps/FriendWidget'));
const AddFriendsPage = lazy(() => import('./subComps/AddFriendsPage'));
const LoadingScreen = lazy(() => import('../../../components/LoadingScreen'));


// Pro tip: Don't write your code while you're not focused.
// This component is only accessible by the user who is logged in.
export default function FriendsList() {
  const { uid } = useParams()
  const [savedUid, setSavedUid] = useState<string>('');

  // Lists if uids
  const [friendsList, setFriendsList] = useState<string[]>([]);
  const [pendingList, setPendingList] = useState<string[]>([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const isYourFriendsList = async () => {
      setLoading(true);
      await getUid().then((results) => setSavedUid(`${results}`));

      // Check if the uid is the same as the logged in user
      if (uid !== savedUid) {
        setLoading(false);
        return;
      }
    }


    const fetchFriendsList = async () => {
      await getPersonalFriendsList().then((results) => {
        console.log({ results });
        setFriendsList(results.friends);
        setPendingList(results.friendRequests);
        setFriendRequestsSent(results.friendRequestsSent);
      });
    }

    isYourFriendsList().then(() => {
      fetchFriendsList().then(() => {
        setLoading(false);
      });
    });

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
          <Tab>Sent</Tab>
          <Tab>Add</Tab>
        </TabList>

        <TabPanel>
          <Friends list={friendsList} />
        </TabPanel>

        <TabPanel>
          <FriendRequests list={pendingList} />
        </TabPanel>

        <TabPanel>
          <FriendRequestsSent list={friendRequestsSent} />
        </TabPanel>

        <TabPanel>
          <AddFriendsPage uid={uid} />
        </TabPanel>
      </Tabs>
    </div>
  );
}



interface RequestsProps {
  list: string[];
}

function Friends({ list }: RequestsProps) {
  const navigate = useNavigate();

  if (!list.length) {
    return (
      <div>
        <p>Oopsy, it seems like you have no friends atm!</p>
      </div>);
  }

  return (
    <div>
      {list.map((uid, index) => (
        <div
          key={index}
          className={styles.friendWidget}
          onClick={() => navigate(`/u/${uid}/profile`)}
        >
          <FriendWidget
            uid={uid}
            isPnedingFriendRequest={false}
          />
        </div>
      ))}
    </div>
  );
}

function FriendRequests({ list }: RequestsProps) {
  const navigate = useNavigate();

  if (!list.length) {
    return (
      <div>
        <p>Oopsy, it seems like you have no pending friend requests!</p>
      </div>
    )
  }

  return (
    <div>
      {list.map((uid, index) => (
        <div
          key={index}
          className={styles.friendWidget}
          onClick={() => navigate(`/u/${uid}/profile`)}
        >
          <FriendWidget
            uid={uid}
            isPnedingFriendRequest={true}
          />
        </div>
      ))}
    </div>
  );
}

function FriendRequestsSent({ list }: RequestsProps) {
  const navigate = useNavigate();

  if (!list.length) {
    return (
      <div>
        <p>Oopsy, it seems like you have not sent any friend requests!</p>
      </div>
    );
  }

  return (
    <div>
      {list.map((uid, index) => (
        <div
          key={index}
          className={styles.friendWidget}
          onClick={() => navigate(`/u/${uid}/profile`)}
        >
          <FriendWidget
            uid={uid}
            isPnedingFriendRequest={false}
          />
        </div>
      ))}
    </div>
  );
}
