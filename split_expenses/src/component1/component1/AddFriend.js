import { useState } from 'react';
import Button from './Button';

export default function AddFriend({ onAddFriend }) {
  const [name, setName] = useState('');

  function addFriend(event) {
    event.preventDefault();
    onAddFriend(name);
    setName('');
  }
  return (
    <div>
      <form onSubmit={addFriend}><br/>
        <h3>Add Friend</h3>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
}