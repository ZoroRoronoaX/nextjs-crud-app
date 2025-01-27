"use client";

import React, { useState, useEffect } from "react";
import { User } from "../types/users";

interface UserFormProps {
  onSubmit: (user: Partial<User>) => void;
  user?: User;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="user-form-label">
        {user ? "Edit User" : "Add New User"}
      </h2>
      <div className="mb-4">
        <label className="user-form-label-name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="user-form-input"
          placeholder="Enter name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="user-form-label-name">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="user-form-input"
          placeholder="Enter email"
          required
        />
      </div>
      <button type="submit" className="user-form-button">
        {user ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;