import React, { useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function SkillModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    maxXP: "",
    subskills: [],
    missions: [],
    theme: "primary",
  });
  const [subskillInput, setSubskillInput] = useState("");
  const [missionInput, setMissionInput] = useState("");

  const handleAddSubskill = () => {
    if (subskillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        subskills: [...prev.subskills, subskillInput.trim()],
      }));
      setSubskillInput("");
    }
  };


  const handleAddMission = () => {
    if (missionInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        missions: [...prev.missions, missionInput.trim()],
      }));
      setMissionInput("");
    }
  };

  const handleSave = async () => {
    if (!formData.name) return alert("Skill name required!");
    try {
      await addDoc(collection(db, "skills"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      handleClose();
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Skills Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
   
          <div className="col-md-6">
            <Form>
           
              <Form.Group className="mb-3">
                <Form.Label>Skill Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter skill name..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Group>

       
              <Form.Group className="mb-3">
                <Form.Label>Maximum XP</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 500XP"
                  value={formData.maxXP}
                  onChange={(e) =>
                    setFormData({ ...formData, maxXP: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Add Sub Skill</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Enter sub skill..."
                    value={subskillInput}
                    onChange={(e) => setSubskillInput(e.target.value)}
                  />
                  <Button variant="primary" className="ms-2" onClick={handleAddSubskill}>
                    +
                  </Button>
                </div>
                <div className="mt-2">
                  {formData.subskills.map((s, i) => (
                    <Badge bg="success" key={i} className="me-2">
                      {s}
                    </Badge>
                  ))}
                </div>
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Assign Missions</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Assign mission..."
                    value={missionInput}
                    onChange={(e) => setMissionInput(e.target.value)}
                  />
                  <Button variant="warning" className="ms-2" onClick={handleAddMission}>
                    +
                  </Button>
                </div>
                <div className="mt-2">
                  {formData.missions.map((m, i) => (
                    <Badge bg="info" key={i} className="me-2">
                      {m}
                    </Badge>
                  ))}
                </div>
              </Form.Group>

         
              <Form.Group className="mb-3">
                <Form.Label>Select Theme</Form.Label>
                <div className="d-flex gap-2 mt-2">
                  {["primary", "success", "warning", "danger", "info"].map((color) => (
                    <div
                      key={color}
                      className={`rounded-circle bg-${color}`}
                      style={{ width: "25px", height: "25px", cursor: "pointer" }}
                      onClick={() => setFormData({ ...formData, theme: color })}
                    ></div>
                  ))}
                </div>
              </Form.Group>
            </Form>
          </div>

      
          <div className="col-md-6 text-center">
            <h5 className="mb-3">Skill Tree Preview</h5>
            <div className="d-flex flex-column align-items-center">
              <div
                className={`rounded-circle bg-${formData.theme} text-white d-flex justify-content-center align-items-center mb-2`}
                style={{ width: "60px", height: "60px" }}
              >
                S
              </div>
              <p>{formData.name || "Skill Name"}</p>

        
              <div className="d-flex justify-content-between w-75 mt-3 flex-wrap">
                {formData.subskills.slice(0, 2).map((sub, i) => (
                  <div key={i} className="d-flex flex-column align-items-center">
                    <div
                      className={`rounded-circle bg-${formData.theme} text-white d-flex justify-content-center align-items-center`}
                      style={{ width: "45px", height: "45px" }}
                    >
                      S
                    </div>
                    <p className="small mt-1">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={handleSave}>
          Create Skill
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
