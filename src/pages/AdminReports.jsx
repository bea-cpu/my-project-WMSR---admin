import "./AdminReports.css"
import { useState, useEffect, useRef } from "react"
import { 
  MoreVertical, Search, Filter, Download, Plus, Eye, Trash2,
  TriangleAlert, CheckCircle, Clock, Loader, FileText,
  ArrowLeft, MapPin, User, Phone, Mail, Save, Image as ImageIcon
} from "lucide-react"

export default function AdminReports({ setCurrentPage }) {
  const [openActionIndex, setOpenActionIndex] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState(""); 
  const menuRef = useRef(null);

  useEffect(() => {
    if (setCurrentPage) setCurrentPage("Reports");
    
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenActionIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCurrentPage]); 

  const toggleMenu = (index, e) => {
    e.stopPropagation(); 
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  const handleViewDetails = (report) => {
    const fullReportData = {
      ...report,
      description: "Trash was not picked up on Tuesday morning as scheduled. The bin is currently overflowing and attracting pests. This is the second week in a row.",
      priority: "Low", 
      email: "jane.doe@example.com",
      phone: "(555) 123-4567",
      submittedDate: "October 24, 2023",
      photos: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop"
      ]
    };
    
    setSelectedReport(fullReportData);
    setStatusToUpdate(fullReportData.status);
    setOpenActionIndex(null); 
  };

  const handleBackToList = () => {
    setSelectedReport(null);
  };

  const handleSaveChanges = () => {
    alert(`Success! Report status updated to: ${statusToUpdate}`);
    setSelectedReport(prev => ({...prev, status: statusToUpdate}));
  };

  const reports = [
    { id: "R-1024", subId: "RPT-2024-8492", type: "Illegal Dumping", iconCategory: "danger", reporter: "Jane Doe", location: "Sector 4, Corner Ave", date: "2024-05-15", status: "Pending" },
    { id: "R-1025", subId: "RPT-2024-002", type: "Overflowing Bin", iconCategory: "waste", reporter: "Sarah Smith", location: "Central Park Main Gate", date: "2024-05-14", status: "In Progress" },
    { id: "R-1026", subId: "RPT-2024-003", type: "Missed Collection", iconCategory: "waste", reporter: "Mike Johnson", location: "123 Maple Avenue, Springfield", date: "2024-05-14", status: "Resolved" },
    { id: "R-1027", subId: "RPT-2024-004", type: "Hazardous Waste", iconCategory: "danger", reporter: "Emily Brown", location: "Industrial Zone B", date: "2024-05-13", status: "Pending" },
  ];

  const getReportIcon = (category) => category === "danger" ? <TriangleAlert size={20} className="icon-danger" /> : <Trash2 size={20} className="icon-waste" />;
  const getIconBgClass = (category) => category === "danger" ? "bg-danger-light" : "bg-waste-light";
  const getStatusIcon = (status) => {
    if (status === "Pending") return <TriangleAlert size={14} />;
    if (status === "In Progress") return <Loader size={14} />;
    if (status === "Resolved") return <CheckCircle size={14} />;
    return <FileText size={14} />;
  }

  if (selectedReport) {
    return (
      <div className="reports-page detail-view-mode">
        <div className="detail-top-nav">
          <button onClick={handleBackToList} className="back-button">
            <ArrowLeft size={18} /> Back to Reports List
          </button>
        </div>

        <div className="detail-content-card">
          <div className="detail-header">
            <div className="header-left">
              <h1>Report Details</h1>
              <p className="subtitle">Submitted on {selectedReport.submittedDate}</p>
            </div>
            <div className={`status-badge-lg ${selectedReport.status.toLowerCase().replace(" ", "-")}`}>
              {getStatusIcon(selectedReport.status)} {selectedReport.status}
            </div>
          </div>

          <hr className="divider" />

          <div className="detail-section">
            <h3 className="section-title text-blue">
              <FileText size={20} /> Incident Overview
            </h3>
            
            <div className="overview-grid">
              <div className="info-box">
                <label>ISSUE TYPE</label>
                <div className="info-value big-text">{selectedReport.type}</div>
              </div>

              <div className="info-box">
                <label>PRIORITY LEVEL</label>
                <div className="priority-wrapper">
                  <div className={`priority-badge ${selectedReport.priority.toLowerCase()}`}>
                    <TriangleAlert size={14} /> {selectedReport.priority}
                  </div>
                </div>
              </div>

              <div className="info-box1 full-width">
                <label>LOCATION</label>
                <div className="info-value flex-center">
                  <MapPin size={18} className="text-gray" /> 
                  <span className="location-text">{selectedReport.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Description</h3>
            <div className="description-box">{selectedReport.description}</div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Attached Photos</h3>
            <div className="photos-grid">
              {selectedReport.photos && selectedReport.photos.map((url, i) => (
                <div key={i} className="photo-frame">
                  <img src={url} alt={`Evidence ${i}`} />
                </div>
              ))}
            </div>
          </div>

          <hr className="divider" />

          <div className="detail-section">
            <h3 className="section-title"><User size={18} /> Reporter Information</h3>
            <div className="contact-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" value={selectedReport.reporter} disabled />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" value={selectedReport.phone} disabled />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="text" value={selectedReport.email} disabled />
              </div>
            </div>
          </div>

          <div className="detail-footer">
            <div className="footer-left">
              <span className="footer-label">Update Report Status:</span>
              <select 
                className="status-select" 
                value={statusToUpdate}
                onChange={(e) => setStatusToUpdate(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            
            <button className="btn-save-light" onClick={handleSaveChanges}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-page" onClick={() => setOpenActionIndex(null)}>
      <div className="reports-header">
        <div className="header-text">
          <h1>Reports</h1>
          <p>Manage and review environmental tracking reports</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> New Report
        </button>
      </div>

      <div className="reports-controls">
        <div className="reports-search-wrapper">
          <Search className="reports-search-icon" size={18} />
          <input type="text" placeholder="Search reports..." className="reports-search-input" />
        </div>
        <div className="reports-action-buttons">
          <button className="btn-secondary"><Filter size={16} /> Filter</button>
          <button className="btn-secondary"><Download size={16} /> Export</button>
        </div>
      </div>

      <div className="reports-count">All Reports ({reports.length})</div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>REPORT ID</th>
              <th>REPORT TYPE</th>
              <th>SUBMITTED BY</th>
              <th>LOCATION</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th className="text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx}>
                <td className="font-bold text-dark">{report.id}</td>
                <td>
                  <div className="report-type-wrapper">
                    <div className={`report-icon-box ${getIconBgClass(report.iconCategory)}`}>
                      {getReportIcon(report.iconCategory)}
                    </div>
                    <div>
                      <span className="report-title">{report.type}</span>
                      <div className="report-subtitle">{report.subId}</div>
                    </div>
                  </div>
                </td>
                <td className="font-medium text-dark">{report.reporter}</td>
                <td className="text-gray">{report.location}</td>
                <td className="text-gray">{report.date}</td>
                <td>
                  <span className={`status-badge ${report.status.toLowerCase().replace(" ", "-")}`}>
                    {getStatusIcon(report.status)} {report.status}
                  </span>
                </td>
                <td className="text-right action-cell">
                  <div className="action-wrapper">
                    <button 
                      className={`btn-icon ${openActionIndex === idx ? 'active' : ''}`}
                      onClick={(e) => toggleMenu(idx, e)}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openActionIndex === idx && (
                      <div className="action-menu" ref={menuRef}>
                        <button className="menu-item" onClick={() => handleViewDetails(report)}>
                          <Eye size={14} /> View Details
                        </button>
                        <div className="menu-divider"></div>
                        <button className="menu-item delete">
                          <Trash2 size={14} /> Delete
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
  )
}
