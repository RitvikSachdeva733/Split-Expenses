import './App.css';
import AddFriend from './component1/component1/AddFriend';
import BillDetails from './component1/component1/BillDetails';
import BillShare from './component1/component1/BillShare';
import FriendsList from './component1/component1/FriendsList';
import { useEffect, useState } from 'react';

function App  ({selectedGroup}) {
  const [friends, setFriends] = useState([]);

  
  useEffect(() => {
    if (selectedGroup) {
      setFriends(selectedGroup.members.map(memberName => ({
        id: generateUniqueId(),
        name: memberName,
        billDetails: []
      })));
    }
  }, [selectedGroup]);
  console.log("the friends list",friends)
  const [selectedFriend, setSelectedFriend] = useState('');


  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000); 
  };
  
  function onBillPaid(billDetails) {
    setFriends((friends) => calculateBill(friends, billDetails));
  }

  function onFriendSelected(friend) {
    setSelectedFriend(friend);
  }

  function calculateBill(friends, billDetails) {
    const amountPrice = Math.round(+billDetails.bill / friends.length);
    const friendDetails = [];

    for (let friend of friends) {
      const singleFriend = { ...friend };
      if (singleFriend.id === +billDetails.friendId) {
        friendDetails.push(singleFriend);
        continue;
      }

      const billings = [];
      let found = false;

      if (singleFriend.billDetails.length) {
        for (var billing of singleFriend.billDetails) {
          if (billing.id === billDetails.friendId) {
            found = true;
            billings.push({ ...billing, ...{ price: billing.price + amountPrice } });
          } else {
            billings.push(billing);
          }
        }
      }

      if (!found) {
        billings.push({ id: billDetails.friendId, name: billDetails.name, price: +amountPrice });
      }

      singleFriend['billDetails'] = billings;
      friendDetails.push(singleFriend);
    }

    return friendDetails;
  }

  return (
    <div className="outer-box">
    <div className="container">
      <h1 className="app-title">Split Bill</h1><br/>
      
      <BillShare friends={friends} onBillPaid={onBillPaid} />
      <FriendsList friends={friends} selectedFriend={onFriendSelected} />
      {selectedFriend && <BillDetails friend={selectedFriend} />}
    </div>
  </div>
  
  );
}

export default App;