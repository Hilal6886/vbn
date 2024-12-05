import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaSpinner } from 'react-icons/fa';

export const UserRoles = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // To check if current user is admin

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Fetch current logged-in user details
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
  
        if (!userData || !userData.id) {
          setError('User not found or not logged in');
          return;
        }
  
        // Fetch the role of the logged-in user
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role_id')
          .eq('user_id', userData.id); // Ensure the user ID is valid
        if (rolesError) throw rolesError;
  
        // Fetch the role details for the user
        const { data: rolesData, error: rolesFetchError } = await supabase
          .from('roles')
          .select('name')
          .in('id', userRoles.map(role => role.role_id)); // Ensure that the role_id is valid
        if (rolesFetchError) throw rolesFetchError;
  
        // Set the user as admin if role matches
        const isAdmin = rolesData.some(role => role.name === 'admin');
        setCurrentUser({ ...userData, isAdmin });
  
        // Fetch users from public_users
        const { data: usersData, error: usersError } = await supabase
          .from('public_users')
          .select('*');
        if (usersError) throw usersError;
  
        // Fetch roles for assigning
        const { data: rolesDataForAssigning, error: rolesErrorForAssigning } = await supabase
          .from('roles')
          .select('*');
        if (rolesErrorForAssigning) throw rolesErrorForAssigning;
  
        setUsers(usersData);
        setRoles(rolesDataForAssigning);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  
  const assignRole = async (userId, roleId) => {
    if (!currentUser || !currentUser.isAdmin) {
      setError('You must be an admin to assign roles.');
      return;
    }
  
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role_id: roleId });
  
      if (error) throw error;
  
      setSuccess('Role assigned successfully!');
    } catch (error) {
      setError('Error assigning role');
      console.error('Error assigning role:', error.message);
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Roles</h2>

      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <FaSpinner className="animate-spin text-xl text-blue-500" />
          <span>Loading users and roles...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
          <strong>Error:</strong> {error}
        </div>
      ) : success ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
          <strong>Success:</strong> {success}
        </div>
      ) : null}

      <div className="overflow-hidden shadow sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assign Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      onChange={(e) => assignRole(user.id, e.target.value)}
                      className="border border-gray-300 p-2 rounded-md"
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRoles;
