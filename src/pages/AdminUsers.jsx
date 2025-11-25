import "./AdminUsers.css"
import { useEffect, useState, useRef } from "react"
import { MoreVertical, Search, Filter, Plus, Edit, Mail, Trash2 } from "lucide-react"

export default function AdminUsers({ setCurrentPage }) {
  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage("Users");
    }
  }, [setCurrentPage]);

  const [searchTerm, setSearchTerm] = useState("");
  
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active", reports: 24, joinDate: "2023-06-15", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Sarah Smith", email: "sarah.smith@example.com", role: "Manager", status: "Active", reports: 18, joinDate: "2023-08-22", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", role: "User", status: "Active", reports: 12, joinDate: "2023-09-10", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Emily Brown", email: "emily.brown@example.com", role: "User", status: "Active", reports: 15, joinDate: "2023-10-05", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "David Lee", email: "david.lee@example.com", role: "Manager", status: "Inactive", reports: 8, joinDate: "2023-11-12", avatar: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Lisa Wang", email: "lisa.wang@example.com", role: "User", status: "Active", reports: 21, joinDate: "2023-07-18", avatar: "https://i.pravatar.cc/150?u=6" },
    { id: 7, name: "Tom Harris", email: "tom.harris@example.com", role: "User", status: "Active", reports: 9, joinDate: "2023-12-01", avatar: "https://i.pravatar.cc/150?u=7" },
    { id: 8, name: "Anna Martinez", email: "anna.martinez@example.com", role: "Manager", status: "Active", reports: 16, joinDate: "2023-05-20", avatar: "https://i.pravatar.cc/150?u=8" },
  ]);

  const [activeActionId, setActiveActionId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveActionId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleActionMenu = (id) => {
    setActiveActionId(activeActionId === id ? null : id);
  };

  const handleEdit = (user) => {
    console.log(`Editing ${user.name}`);
    setActiveActionId(null);
  };

  const handleEmail = (user) => {
    window.location.href = `mailto:${user.email}`;
    setActiveActionId(null);
  };

  const initiateDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
    setActiveActionId(null);
  };

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Users", value: users.length },
    { label: "Active Users", value: users.filter(u => u.status === "Active").length },
    { label: "Admins", value: users.filter(u => u.role === "Admin").length },
    { label: "Managers", value: users.filter(u => u.role === "Manager").length },
  ];

  return (
    <div className="users-container">
      <div className="page-header">
        <div className="page-title">
          <h1>Users</h1>
          <p>Manage user accounts and permissions</p>
        </div>
        <button className="add-btn">
          <Plus size={20} /> Add User
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="controls-bar">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn">
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="table-container">
        <div className="table-header-title">
          <h2>All Users ({filteredUsers.length})</h2>
        </div>
        <div style={{ overflowX: 'auto', minHeight: '400px' }}>
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Reports</th>
                <th>Join Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-profile">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="user-details">
                        <p className="user-name">{user.name}</p>
                        <p className="user-email">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className={`badge role-${user.role.toLowerCase()}`}>{user.role}</span></td>
                  <td><span className={`badge status-${user.status.toLowerCase()}`}>{user.status}</span></td>
                  <td>{user.reports}</td>
                  <td>{user.joinDate}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-wrapper" ref={activeActionId === user.id ? dropdownRef : null}>
                      <button 
                        className={`action-btn ${activeActionId === user.id ? 'active' : ''}`} 
                        onClick={() => toggleActionMenu(user.id)}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeActionId === user.id && (
                        <div className="action-menu">
                          <button onClick={() => handleEdit(user)} className="menu-item">
                            <Edit size={14} /> Edit User
                          </button>
                          <button onClick={() => handleEmail(user)} className="menu-item">
                            <Mail size={14} /> Send Email
                          </button>
                          <div className="menu-divider"></div>
                          <button onClick={() => initiateDelete(user)} className="menu-item delete">
                            <Trash2 size={14} /> Delete User
                          </button>
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

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Are you sure?</h3>
            <p className="modal-text">
              This action cannot be undone. This will permanently delete the user account and all associated data.
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelDelete}>Cancel</button>
              <button className="btn-delete" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
