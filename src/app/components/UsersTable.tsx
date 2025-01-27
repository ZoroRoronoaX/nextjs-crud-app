"use client";

import React from "react";
import { User } from "../types/users";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UsersTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="user-table">
        <thead>
          <tr>
            <th className="user-table-header">Name</th>
            <th className="user-table-header">Email</th>
            <th className="user-table-header text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={user.id}
              className={`user-table-cell ${
                idx % 2 === 0 ? "user-table-row-even" : "user-table-row-odd"
              } user-table-row-hover`}
            >
              <td className="user-table-cell">{user.name}</td>
              <td className="user-table-cell">{user.email}</td>
              <td className="user-table-cell user-table-row">
                <button
                  onClick={() => onEdit(user)}
                  className="user-table-button-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="user-table-button-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <p className="no-user-found-label">
          No users found. Add a new user to get started!
        </p>
      )}
    </div>
  );
};

export default UsersTable;
