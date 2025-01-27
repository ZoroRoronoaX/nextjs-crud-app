"use client";
import { useState, useEffect } from 'react';
import UserTable from './components/UsersTable';
import UserForm from './components/UserForm';
import { User } from './types/users';

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => setUsers(data))
    .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const addUser = (user: Partial<User>) => {
    console.log(user);
    
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    })
    .then((res) => res.json())
    .then((newUser) => {
      setUsers((prevUsers) => [...prevUsers, newUser]); // Update the users state
    })
      .catch((error) => console.error('Error:', error));
  };

  const updateUser = (user: Partial<User>) => {
    if (!editingUser) return;
    fetch(`/api/users/${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then(() => {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...user } : u)));
      setEditingUser(null);
    });
  };

  const deleteUser = (id: number) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to delete user with ID ${id}`);
      }
      return res.json();
    })
    .then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    })
    .catch((error) => console.error('Error deleting user:', error));
  };

  return (

    
    <div className="flex flex-col gap-6 padding-6">
    {/* Form Section */}
    <div className="flex-1 user-form padding-6">
      <UserForm
        onSubmit={editingUser ? updateUser : addUser}
        user={editingUser || undefined}
      />
    </div>

    {/* Table Section */}
    <div className="flex-1 user-table-section">
      <UserTable
        users={users}
        onEdit={setEditingUser}
        onDelete={deleteUser}
      />
    </div>
  </div>
  );
};

export default Home;