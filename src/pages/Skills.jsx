import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import SkillModal from "./SkillModal";
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const skillsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSkills(skillsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Skills</h3>
        <Button onClick={() => setShowModal(true)}>Add New Skill</Button>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Skill Name</th>
            <th>Max XP</th>
            <th>Subskills</th>
            <th>Missions</th>
            <th>Theme</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>{skill.name}</td>
              <td>{skill.maxXP}</td>
              <td>{skill.subskills?.join(", ") || "—"}</td>
              <td>{skill.missions?.join(", ") || "—"}</td>
              <td>{skill.theme}</td>
              <td>{skill.createdAt?.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <SkillModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
