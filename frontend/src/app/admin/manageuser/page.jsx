'use client';
import { useState } from 'react';
import { 
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  UserPlus,
  Edit,
  Trash2,
  Shield,
  UserCheck,
  UserX,
  ChevronDown,
  ChevronRight,
  RefreshCcw
} from 'lucide-react';

// Sample user data
const users = [
  {
    id: 'USR-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2024-03-15 14:30',
    department: 'Engineering',
    permissions: ['read', 'write', 'admin']
  },
  {
    id: 'USR-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'Active',
    lastActive: '2024-03-15 13:45',
    department: 'Content',
    permissions: ['read', 'write']
  },
  {
    id: 'USR-003',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    role: 'Viewer',
    status: 'Inactive',
    lastActive: '2024-03-14 09:15',
    department: 'Marketing',
    permissions: ['read']
  },
  {
    id: 'USR-004',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'Editor',
    status: 'Active',
    lastActive: '2024-03-15 15:20',
    department: 'Content',
    permissions: ['read', 'write']
  },
  {
    id: 'USR-005',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'Viewer',
    status: 'Active',
    lastActive: '2024-03-15 11:30',
    department: 'Sales',
    permissions: ['read']
  }
];

export default function ManageUsers() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showUserActions, setShowUserActions] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'Inactive': return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
      case 'Suspended': return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      default: return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Admin': return darkMode ? 'text-purple-400' : 'text-purple-600';
      case 'Editor': return darkMode ? 'text-blue-400' : 'text-blue-600';
      case 'Viewer': return darkMode ? 'text-green-400' : 'text-green-600';
      default: return darkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 shadow-lg border-b border-gray-700' : 'bg-white shadow-md border-b border-gray-200'} transition-colors duration-300`}>
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className={`text-2xl font-semibold ${darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent' : 'text-gray-800'}`}>
            Manage Users
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-lg transition-colors"
            >
              <UserPlus size={20} />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Filters and Search */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                </div>
                <input
                  type="text"
                  className={`pl-10 pr-4 py-2 w-full 
                    ${darkMode ? 'bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-500'} 
                    rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                className={`px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                    : 'bg-gray-100 border border-gray-200 text-gray-700'
                }`}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>

              <select
                className={`px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                    : 'bg-gray-100 border border-gray-200 text-gray-700'
                }`}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>

              <select
                className={`px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                    : 'bg-gray-100 border border-gray-200 text-gray-700'
                }`}
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="content">Content</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
              </select>

              <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                <RefreshCcw size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    User
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Role
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Department
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Status
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Last Active
                  </th>
                  <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                {users.map((user) => (
                  <tr key={user.id} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            {user.name}
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {user.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                          onClick={() => setShowUserActions(showUserActions === user.id ? null : user.id)}
                        >
                          <MoreVertical size={16} className={darkMode ? "text-gray-300" : "text-gray-500"} />
                        </button>
                        {showUserActions === user.id && (
                          <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} rounded-md shadow-lg overflow-hidden z-20`}>
                            <div className="py-1">
                              <button className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <div className="flex items-center space-x-2">
                                  <Edit size={16} />
                                  <span>Edit User</span>
                                </div>
                              </button>
                              <button className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <div className="flex items-center space-x-2">
                                  <Shield size={16} />
                                  <span>Manage Permissions</span>
                                </div>
                              </button>
                              <div className={`my-1 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}></div>
                              <button className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}>
                                <div className="flex items-center space-x-2">
                                  <Trash2 size={16} />
                                  <span>Delete User</span>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md mx-4`}>
            <div className={`px-6 py-4 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Add New User</h2>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                        : 'bg-gray-100 border border-gray-200 text-gray-700'
                    }`}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                        : 'bg-gray-100 border border-gray-200 text-gray-700'
                    }`}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Role
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                        : 'bg-gray-100 border border-gray-200 text-gray-700'
                    }`}
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Department
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                        : 'bg-gray-100 border border-gray-200 text-gray-700'
                    }`}
                  >
                    <option value="engineering">Engineering</option>
                    <option value="content">Content</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </form>
            </div>
            <div className={`px-6 py-4 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'} flex justify-end space-x-3`}>
              <button
                onClick={() => setShowAddUserModal(false)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 rounded-lg transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}