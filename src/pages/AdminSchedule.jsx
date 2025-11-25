import React, { useState } from "react";
import "./AdminSchedule.css";
import { FaTrashAlt, FaRecycle, FaLeaf, FaPlus, FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsCalendar4Event } from "react-icons/bs";

const AdminSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([
    { id: 1, day: "Monday", date: "Jan 22", type: "General Waste", start: "07:00", end: "09:00" },
    { id: 2, day: "Tuesday", date: "Jan 23", type: "Organic Waste", start: "07:00", end: "09:00" },
    { id: 3, day: "Tuesday", date: "Jan 23", type: "Recyclables", start: "07:00", end: "09:00" },
    { id: 4, day: "Wednesday", date: "Jan 24", type: "Organic Waste", start: "07:00", end: "09:00" },
    { id: 5, day: "Thursday", date: "Jan 25", type: "General Waste", start: "07:00", end: "09:00" },
    { id: 6, day: "Friday", date: "Jan 26", type: "Recyclables", start: "07:00", end: "09:00" },
    { id: 7, day: "Friday", date: "Jan 26", type: "Organic Waste", start: "10:00", end: "12:00" },
    { id: 8, day: "Sunday", date: "Jan 28", type: "Recyclables", start: "07:00", end: "09:00" },
  ]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [formData, setFormData] = useState({
    day: "Monday",
    type: "General Waste",
    start: "07:00",
    end: "09:00",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeSelect = (type) => setFormData({ ...formData, type });

  const handleAddSchedule = () => {
    const newSchedule = {
      id: schedules.length + 1,
      day: formData.day,
      date: "New Date",
      type: formData.type,
      start: formData.start,
      end: formData.end,
    };
    setSchedules([...schedules, newSchedule]);
    handleCloseModal();
  };

  const handleDelete = (id) => setSchedules(schedules.filter((item) => item.id !== id));

  const getIcon = (type) => {
    if (type === "General Waste") return <FaTrashAlt />;
    if (type === "Recyclables") return <FaRecycle />;
    if (type === "Organic Waste") return <FaLeaf />;
    return <FaTrashAlt />;
  };

  const getTypeClass = (type) => {
    if (type === "General Waste") return "type-general";
    if (type === "Recyclables") return "type-recycle";
    if (type === "Organic Waste") return "type-organic";
    return "";
  };

  return (
    <div className="admin-container">
      <div className="header-section">
        <div>
          <h1>Weekly Schedule</h1>
          <p className="subtitle">Manage collection times and waste types</p>
        </div>
        <button className="btn-add" onClick={handleOpenModal}><FaPlus /> Add Schedule</button>
      </div>

      <div className="guide-section">
        <h4>Waste Type Guide</h4>
        <div className="guide-cards">
          <div className="guide-card general">
            <div className="icon-box"><FaTrashAlt /></div>
            <div><h5>General Waste</h5><p>Non-recyclable items</p></div>
          </div>
          <div className="guide-card recycle">
            <div className="icon-box"><FaRecycle /></div>
            <div><h5>Recyclables</h5><p>Paper, plastic, glass</p></div>
          </div>
          <div className="guide-card organic">
            <div className="icon-box"><FaLeaf /></div>
            <div><h5>Organic Waste</h5><p>Food scraps, garden waste</p></div>
          </div>
        </div>
      </div>

      <h4 className="section-title">Weekly Overview</h4>
      <div className="schedule-grid">
        {daysOfWeek.map((day, index) => {
          const daySchedules = schedules.filter(s => s.day === day);
          const dateDisplay = `Jan ${22 + index}`;
          return (
            <div className="day-card" key={day}>
              <div className="day-header">
                <span className="day-name">{day}</span>
                <span className="day-date">{dateDisplay}</span>
              </div>

              <div className="day-body">
                {daySchedules.length > 0 ? daySchedules.map(item => (
                  <div key={item.id} className={`schedule-item ${getTypeClass(item.type)}`}>
                    <div className="item-icon">{getIcon(item.type)}</div>
                    <div className="item-info">
                      <span className="item-type">{item.type}</span>
                      <span className="item-time">{item.start} AM - {item.end} AM</span>
                    </div>
                    <div className="hover-actions">
                      <button className="action-btn edit"><FaPen /></button>
                      <button className="action-btn delete" onClick={() => handleDelete(item.id)}><FaTrashAlt /></button>
                    </div>
                  </div>
                )) : (
                  <div className="no-collection">
                    <BsCalendar4Event className="no-col-icon"/>
                    <p>No Collection</p>
                    <span>Enjoy your day off!</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="reminders-box">
        <h4>Important Reminders</h4>
        <ul>
          <li>Place bins at the curb by 7:00 AM on collection day</li>
          <li>Ensure lids are closed and bins are not overflowing</li>
          <li>Separate waste types properly to avoid collection delays</li>
          <li>Check for holiday schedule changes on our website</li>
        </ul>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Collection Schedule</h3>
              <button className="close-btn" onClick={handleCloseModal}><IoMdClose /></button>
            </div>

            <div className="modal-body">
              <label>Day of Week</label>
              <select name="day" value={formData.day} onChange={handleInputChange} className="custom-select">
                {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              <label>Waste Type</label>
              <div className="type-selector">
                {["General Waste", "Recyclables", "Organic Waste"].map(type => (
                  <div 
                    key={type} 
                    className={`type-option ${formData.type === type ? 'selected' : ''}`}
                    onClick={() => handleTypeSelect(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>

              <div className="time-row">
                <div className="time-group">
                  <label>Start Time</label>
                  <div className="time-input-wrapper">
                    <input type="time" name="start" value={formData.start} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="time-group">
                  <label>End Time</label>
                  <div className="time-input-wrapper">
                    <input type="time" name="end" value={formData.end} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCloseModal}>Cancel</button>
              <button className="btn-submit" onClick={handleAddSchedule}>Add Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;
