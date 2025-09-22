import React, { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import MissionModal from "./MissionModal";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const MissionManagementDashboard = () => {
  const [missions, setMissions] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "missions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMissions(data);
    });
    return () => unsub();
  }, []);

  const handleSave = async (newMission) => {
    try {
      const docRef = await addDoc(collection(db, "missions"), {
        ...newMission,
        status: "Active",
        createdAt: serverTimestamp(),
      });


      setMissions((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...newMission,
          status: "Active",
          createdAt: new Date(),
        },
      ]);

      setShowModal(false);
    } catch (error) {
      console.error("Error saving mission:", error);
    }
  };

  const totalMissions = missions.length;
  const completedMissions = missions.filter((m) => m.status === "Completed").length;
  const awaitingMissions = missions.filter((m) => m.status === "Awaiting").length;
  const lockedMissions = missions.filter((m) => m.status === "Locked").length;

  const filteredMissions = missions.filter((mission) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Active" && mission.status === "Active") ||
      (activeTab === "Locked" && mission.status === "Locked") ||
      (activeTab === "Completed" && mission.status === "Completed") ||
      (activeTab === "Awaiting Approval" && mission.status === "Awaiting");

    const matchesSearch =
      mission.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredMissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMissions = filteredMissions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getRowColor = (status) => {
    switch (status) {
      case "Active":
        return "table-warning";
      case "Completed":
        return "table-success";
      case "Awaiting":
        return "table-primary";
      case "Locked":
        return "table-danger";
      default:
        return "table-light";
    }
  };

  const getStatusBadge = (status) => {
    return "badge bg-dark text-white";
  };

  return (
    <div className="d-flex vh-80">
      <div className="flex-grow-1 bg-light">
        <div className="p-4">
    
          <div className="mb-4">
            <h5>Mission KPIs</h5>
            <div className="row g-3">
              <div className="col-md-3">
                <div className="card border-0" style={{ backgroundColor: "#e6602b6a" }}>
                  <div className="card-body text-center">
                    <h3 className="card-title text-white">{totalMissions}</h3>
                    <p className="card-text text-white mb-0">Total</p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-0" style={{ backgroundColor: "#1a932e6e" }}>
                  <div className="card-body text-center">
                    <h3 className="card-title text-white">{completedMissions}</h3>
                    <p className="card-text text-white mb-0">Completed</p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-0" style={{ backgroundColor: "#2b5de670" }}>
                  <div className="card-body text-center">
                    <h3 className="card-title text-white">{awaitingMissions}</h3>
                    <p className="card-text text-white mb-0">Awaited</p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-0" style={{ backgroundColor: "#ffe73177" }}>
                  <div className="card-body text-center">
                    <h3 className="card-title text-dark">{lockedMissions}</h3>
                    <p className="card-text text-dark mb-0">Locked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="card border-0 shadow-sm">
            <div className="card-header border-bottom-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Current Mission List</h5>
              <button
                className="btn d-flex align-items-center"
                onClick={() => setShowModal(true)}
                style={{
                  backgroundColor: "#f97316",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                <Plus size={16} className="me-2" />
                Create New Mission
              </button>

              <MissionModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
              />
            </div>

            <div className="card-body p-0">
              <ul className="nav nav-tabs border-bottom">
                {["All", "Active", "Locked", "Completed", "Awaiting Approval"].map(
                  (tab) => (
                    <li className="nav-item" key={tab}>
                      <button
                        className={`nav-link ${
                          activeTab === tab ? "active custom-active-tab" : ""
                        }`}
                        onClick={() => {
                          setActiveTab(tab);
                          setCurrentPage(1);
                        }}
                      >
                        {tab}
                      </button>
                    </li>
                  )
                )}
              </ul>

              <div className="table-responsive">
                <table className="table table-hover mt-3 mb-0">
                  <thead className="table-white">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Skills</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Repetition</th>
                      <th>Calendar Day</th>
                      <th>Time Slot</th>
                      <th>Completion Logic</th>
                      <th>Created At</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMissions.map((mission) => (
                      <tr key={mission.id} className={getRowColor(mission.status)}>
                        <td>{mission.title}</td>
                        <td>{mission.description}</td>
                        <td>{mission.skills?.join(", ")}</td>
                        <td>{mission.missionType}</td>
                        <td>
                          <span className={getStatusBadge(mission.status)}>
                            {mission.status}
                          </span>
                        </td>
                        <td>{mission.repetition ? "Yes" : "No"}</td>
                        <td>{mission.calendarDay}</td>
                        <td>{mission.timeSlot}</td>
                        <td>{mission.completionLogic}</td>
                        <td>
                          {mission.createdAt?.seconds
                            ? new Date(mission.createdAt.seconds * 1000).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>
                          <button className="btn btn-link p-0">
                            <Edit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center p-3">
                <div className="d-flex align-items-center">
                  <span className="me-2">Show</span>
                  <select
                    className="form-select form-select-sm me-2"
                    style={{ width: "auto" }}
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>Row</span>
                </div>

                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      >
                        &laquo;
                      </button>
                    </li>
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const page = i + 1;
                      return (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? "active" : ""}`}
                        >
                          <button className="page-link" onClick={() => setCurrentPage(page)}>
                            {page}
                          </button>
                        </li>
                      );
                    })}
                    <li
                      className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionManagementDashboard;
