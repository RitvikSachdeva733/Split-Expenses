import { useState } from 'react';
import Button from './Button';

export default function BillShare({ friends, onBillPaid }) {
  const [bill, setBill] = useState('');
  const [friend, setFriend] = useState('');

  function submitBill(event) {
    event.preventDefault();
    const singleFriend = friends.find((fr) => +friend === +fr.id);
    const billDetails = { friendId: friend, name: singleFriend.name, bill };
    onBillPaid(billDetails);
    // Clear the input fields after submission
    setBill('');
    setFriend('');
  }

  return (
    <div className='first'>
      <h2>Share Bill Details</h2>
      <form onSubmit={submitBill}>
        <div>
          <label className="select-label">Select friend who paid the bill: </label>
          <select className="select" value={friend} onChange={(e) => setFriend(e.target.value)}>
            <option value="">Select Friend</option>
            {friends.map((friend) => (
              <option className="option" value={friend.id} key={friend.id}>
                {friend.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="bill-label">Amount Paid:</label>
          <input className="bill-input" type="text" value={bill} onChange={(e) => setBill(e.target.value)} />
        </div>

        <div>
          <Button>Add Bill</Button>
        </div>
      </form>
    </div>
  );
}