import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { db } from "../config/firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";

export default function MissionModal({ show, onClose, onSave, missionToEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [],
    repetition: false,
    completionLogic: "Check Mark",
    calendarDay: "",
    timeSlot: "",
    missionType: "Individual",
  });

  useEffect(() => {
    if (missionToEdit) setFormData({ ...missionToEdit });
    else
      setFormData({
        title: "",
        description: "",
        skills: [],
        repetition: false,
        completionLogic: "Check Mark",
        calendarDay: "",
        timeSlot: "",
        missionType: "Individual",
      });
  }, [missionToEdit]);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSkillToggle = (skill) =>
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));

  const handleSubmit = async () => {
    if (!formData.title) return alert("Title is required");
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{missionToEdit ? "Edit Mission" : "Create Mission"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Row>
 
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter title here"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe the mission"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigned Skills</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {["Leadership", "Communication", "Problem Solving"].map((skill) => (
                  <Button
                    key={skill}
                    variant={formData.skills.includes(skill) ? "warning" : "outline-secondary"}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
              <Form.Label className="mb-0">Repetition</Form.Label>
              <Form.Check
                type="switch"
                checked={formData.repetition}
                onChange={(e) => handleChange("repetition", e.target.checked)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Completion Logic</Form.Label>
              <Form.Select
                value={formData.completionLogic}
                onChange={(e) => handleChange("completionLogic", e.target.value)}
              >
                <option>Check Mark</option>
                <option>Approval</option>
                <option>Time Based</option>
              </Form.Select>
            </Form.Group>
          </Col>

  
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>Calendar Control</Form.Label>
              <div className="d-flex gap-2 flex-wrap">
                {["Sun", "Mon", "Tue", "Wed", "Thu"].map((day, i) => (
                  <div
                    key={day}
                    className={`calendar-day ${
                      formData.calendarDay === day ? "selected" : ""
                    }`}
                    onClick={() => handleChange("calendarDay", day)}
                  >
                    {day}
                    <br />
                    <small>{i + 3}</small>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Available Time</Form.Label>
              <ToggleButtonGroup
                type="radio"
                name="times"
                value={formData.timeSlot}
                onChange={(val) => handleChange("timeSlot", val)}
                className="flex-wrap"
              >
                {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"].map((time, i) => (
                  <ToggleButton
                    key={i}
                    id={`t${i}`}
                    value={time}
                    variant={formData.timeSlot === time ? "warning" : "outline-secondary"}
                    className="me-2 mb-2"
                  >
                    {time}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Mission Type</Form.Label>
              <Form.Select
                value={formData.missionType}
                onChange={(e) => handleChange("missionType", e.target.value)}
              >
                <option>Individual</option>
                <option>Team</option>
                <option>Reflection</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="warning"
              className="w-100 text-white fw-bold"
              onClick={handleSubmit}
            >
              {missionToEdit ? "Update Mission" : "Create Mission"}
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
