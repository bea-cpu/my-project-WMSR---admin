import React, { useState } from "react"
import "./Topbar.css"
import { Bell, Search, User, LogOut, FileText, AlertTriangle, Calendar } from "lucide-react"

export default function Topbar() {
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleNotif = () => {
    setIsNotifOpen(!isNotifOpen)
    setIsProfileOpen(false)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
    setIsNotifOpen(false)
  }

  return (
    <div className="topbar">

      <div className="topbar-search-wrapper"> 
        <Search size={20} color="#94a3b8" />
        <input 
          type="text" 
          className="topbar-search-input" 
          placeholder="Search reports, users, schedules..." 
        />
      </div>

      <div className="topbar-actions">
        <div className="action-wrapper">
          <button className="notification-button" onClick={toggleNotif}>
            <Bell size={28} strokeWidth={2} />
            <span className="notification-badge">3</span>
          </button>

          {isNotifOpen && (
            <div className="dropdown-menu notification-dropdown">
              <div className="dropdown-header">Notifications</div>
              
              <div className="dropdown-item unread">
                <div className="notif-icon bg-blue-100">
                   <FileText size={18} color="#2563eb"/>
                </div>
                <div className="notif-content">
                  <p className="notif-title">New report submitted</p>
                  <p className="notif-desc">John Doe submitted a carbon footprint report</p>
                  <span className="notif-time">2 minutes ago</span>
                </div>
              </div>

              <div className="dropdown-item">
                 <div className="notif-icon bg-green-100">
                   <User size={18} color="#16a34a"/>
                </div>
                <div className="notif-content">
                  <p className="notif-title">User registration</p>
                  <p className="notif-desc">New user Sarah Smith registered</p>
                  <span className="notif-time">1 hour ago</span>
                </div>
              </div>

              <div className="dropdown-item">
                 <div className="notif-icon bg-orange-100">
                   <AlertTriangle size={18} color="#ea580c"/>
                </div>
                <div className="notif-content">
                  <p className="notif-title">Schedule reminder</p>
                  <p className="notif-desc">Monthly report due tomorrow</p>
                  <span className="notif-time">3 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="action-wrapper">
          <div className="profile-section" onClick={toggleProfile}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" 
              alt="Admin" 
              className="profile-avatar" 
            />
            <div className="profile-info">
              <span className="profile-name">Admin User</span>
              <span className="profile-email">admin@ecotrack.com</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
