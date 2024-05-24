import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import path to your firebase configuration
import './grouptab.css';
import App from '../App';
import Modal from './Modal';

const GroupTab = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [memberName, setMemberName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(selectedGroup);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const groupsCollection = collection(db, 'groups');
      const groupsSnapshot = await getDocs(groupsCollection);
      const groupsData = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroups(groupsData);
    };

    fetchGroups();
  }, []);

  const handleAddGroup = async () => {
    if (!groupName.trim()) {
      return;
    }
    const newGroup = { groupName: groupName, members: [] };
    try {
      const docRef = await addDoc(collection(db, 'groups'), newGroup);
      const groupData = { id: docRef.id, ...newGroup }; // Include the ID of the newly added document
      const updatedGroups = [...groups, groupData];
      setGroups(updatedGroups);
      setGroupName('');
    } catch (error) {
      console.error('Error adding group: ', error);
    }
  };
  

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleAddMember = async () => {
    if (!selectedGroup || !memberName.trim()) {
      return;
    }
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id
        ? { ...group, members: [...group.members, memberName] }
        : group
    );
    setGroups(updatedGroups);
    setMemberName('');

    try {
      const groupDoc = doc(db, 'groups', selectedGroup.id);
      await updateDoc(groupDoc, { members: updatedGroups.find(group => group.id === selectedGroup.id).members });
    } catch (error) {
      console.error('Error updating group members: ', error);
    }
  };

  const handleDeleteGroup = async (group) => {
    try {
      await deleteDoc(doc(db, 'groups', group.id));
      const updatedGroups = groups.filter((g) => g.id !== group.id);
      setGroups(updatedGroups);
    } catch (error) {
      console.error('Error deleting group: ', error);
    }
  };

  return (
    <div className='main'>
      <div className='left-container'>
        <input className='in1'
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button className="add-button" onClick={handleAddGroup}>
          Add
        </button>
        {groups.length === 0 ? (
          <p>No groups available</p>
        ) : (
          groups.map((group) => (
            <div
              key={group.id}
              className={`group-card ${selectedGroup && selectedGroup.id === group.id ? 'selected' : ''}`}
              onClick={() => handleGroupClick(group)}
            >
              <div className='group-info'>
                <h3 className='gname'>{group.groupName}</h3>
                <button className="add-button" onClick={() => handleDeleteGroup(group)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="right-container">
        {selectedGroup && (
          <div>
            <div className="member-actions">
              <input className='in2'
                type="text"
                placeholder="Member Name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
              <button className="add" onClick={handleAddMember}>
                Add
              </button>
              <button className='add' onClick={openModal}>split</button>

              {isModalOpen && (
                <Modal onClose={closeModal}>
                  <App selectedGroup={selectedGroup} />
                </Modal>
              )}
              <button className="add">Expense</button>
            </div>
            <h2>Group Members:</h2>
            <div className="members-container">
              {selectedGroup.members.map((member, index) => (
                <div key={index} className="member-card">
                  <h3 className='mem'>{member}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupTab;
