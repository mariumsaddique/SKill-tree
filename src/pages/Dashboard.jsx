import React, { useState, useEffect } from 'react';
import img from "../assets/imgs/overview/Frame 1171275857.png";
import img1 from "../assets/imgs/overview/mission.png";
import img2 from "../assets/imgs/overview/Frame 1171275859.png";
import img3 from "../assets/imgs/overview/xp.png";


const Dashboard = () => {
  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    const iconsLink = document.createElement('link');
    iconsLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css';
    iconsLink.rel = 'stylesheet';
    document.head.appendChild(iconsLink);
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(iconsLink);
    };
  }, []);
  const [timeframe, setTimeframe] = useState('Last 30 days');
  
  // Mock data - in real app, this would come from Firebase
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 245,
    totalSkills: 42,
    totalMissions: 1320,
    xpAdjustments: 85,
    skills: [
      { name: 'Critical Thinking', status: 'In Progress', xpRequired: 500, completed: 2, progress: 75 },
      { name: 'Problem Solving', status: 'Locked', xpRequired: 400, completed: 0, progress: 0 },
      { name: 'Communication Skills', status: 'Achieved', xpRequired: 600, completed: 5, progress: 100 },
      { name: 'Team Collaboration', status: 'Achieved', xpRequired: 350, completed: 3, progress: 100 },
      { name: 'Leadership', status: 'Locked', xpRequired: 800, completed: 0, progress: 0 }
    ],
    recentActivity: [
      { type: 'Mission', text: 'Ali completed Mission 1 - Critical Thinking (+30 XP)', time: '2 hours ago' },
      { type: 'Skill', text: 'Sara mastered Skill: Communication Skills', time: '4 hours ago' },
      { type: 'Mission', text: 'Fatima completed Mission 5 - Leadership (+40 XP)', time: '6 hours ago' },
      { type: 'Skill', text: 'Omar unlocked Skill: Problem Solving', time: '8 hours ago' },
      { type: 'Mission', text: 'Fatima completed Mission 2 - Leadership (+30 XP)', time: '1 day ago' }
    ]
  });

  // Circular progress component
  const CircularProgress = ({ percentage, label, sublabel }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="d-flex flex-column align-items-center">
        <div className="position-relative">
          <svg width="120" height="120" className="transform-rotate">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#e9ecef"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={percentage >= 80 ? "#28a745" : percentage >= 50 ? "#ffc107" : "#fd7e14"}
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out', transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }}
            />
          </svg>
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <div className="h4 mb-0 fw-bold">{percentage}%</div>
            <small className="text-muted">{label}</small>
          </div>
        </div>
        <small className="text-muted mt-2">{sublabel}</small>
      </div>
    );
  };

  const ProgressBar = ({ percentage, color = 'primary' }) => (
    <div className="progress" style={{ height: '6px' }}>
      <div 
        className={`progress-bar bg-${color}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
      ></div>
    </div>
  );

  
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch(status) {
        case 'Achieved': return 'success';
        case 'In Progress': return 'warning';
        case 'Locked': return 'secondary';
        default: return 'primary';
      }
    };
    
    return (
      <span className={`badge bg-${getStatusColor(status)} bg-opacity-10 text-${getStatusColor(status)}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="container-fluid " style={{backgroundColor:"#cccccc45",
    height: "100vh",
    overflowY: "scroll"}}>

      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="mb-0 fw-bold">Overview</h2>
          <div className="dropdown mt-2" >
            <button 
              className="btn bg-white rounded-5  dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown"
              
            >
              {timeframe}
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={() => setTimeframe('Last 7 days')}>Last 7 days</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => setTimeframe('Last 30 days')}>Last 30 days</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => setTimeframe('Last 90 days')}>Last 90 days</a></li>
            </ul>
          </div>
        </div>
      </div>

   <div className="row mb-4 g-3">
  <div className="col-lg-3 col-md-6">
    <div className="card h-100 border-0 shadow-sm">
       <div className="row">
       <div style={{marginLeft:"10px", marginTop:"10px"}}>
           <img src={img} alt="users" width="" height="40" />
       </div>
        </div>
      <div className="card-body d-flex align-items-center" style={{marginBottom:"20px"}}>
        <div >
          <div className="text-muted small">Total Users</div>
          <div  className="text-muted small" > <span className="h3 mb-0 fw-bold text-dark">{dashboardData.totalUsers}</span> Users</div>
        </div>
      </div>
    </div>
  </div>

  <div className="col-lg-3 col-md-6">
    <div className="card h-100 border-0 shadow-sm">
       <div className="row">
       <div style={{marginLeft:"10px", marginTop:"10px"}}>
           <img src={img1} alt="users" width="" height="40" />
       </div>
        </div>
      <div className="card-body d-flex align-items-center" style={{marginBottom:"20px"}}>
        <div >
          <div className="text-muted small">Total Skills</div>
          <div  className="text-muted small" > <span className="h3 mb-0 fw-bold text-dark">{dashboardData.totalSkills}</span>   Skills available</div>
        </div>
      </div>
    </div>
  </div>

  <div className="col-lg-3 col-md-6">
   <div className="card h-100 border-0 shadow-sm">
       <div className="row">
       <div style={{marginLeft:"10px", marginTop:"10px"}}>
           <img src={img2} alt="users" width="" height="40" />
       </div>
        </div>
      <div className="card-body d-flex align-items-center" style={{marginBottom:"20px"}}>
        <div >
          <div className="text-muted small">Total Missions / XP</div>
          <div  className="text-muted small" > <span className="h3 mb-0 fw-bold text-dark">{dashboardData.totalMissions.toLocaleString()}</span> missions (45,000 XP)</div>
        </div>
      </div>
    </div>
  </div>

  <div className="col-lg-3 col-md-6">
     <div className="card h-100 border-0 shadow-sm">
       <div className="row">
       <div style={{marginLeft:"10px", marginTop:"10px"}}>
           <img src={img3} alt="users" width="" height="40" />
       </div>
        </div>
      <div className="card-body d-flex align-items-center" style={{marginBottom:"20px"}}>
        <div >
          <div className="text-muted small">XP Adjustments</div>
          <div  className="text-muted small" > <span className="h3 mb-0 fw-bold text-dark">{dashboardData.xpAdjustments} XP</span>  Adjustments this month</div>
        </div>
      </div>
    </div>
  </div>
</div>


      <div className="row g-4">

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pb-0">
              <h5 className="mb-0">Skill Summary Table</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th className="border-0">Skill Name</th>
                      <th className="border-0">Unlock Status</th>
                      <th className="border-0">XP Required</th>
                      <th className="border-0">Mission Completed</th>
                      <th className="border-0">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.skills.map((skill, index) => (
                      <tr key={index} className="border-0">
                        <td className="fw-medium border-0">{skill.name}</td>
                        <td className="border-0"><StatusBadge status={skill.status} /></td>
                        <td className="border-0">{skill.xpRequired} XP</td>
                        <td className="border-0">{skill.completed}/{skill.completed + 3} completed</td>
                        <td style={{ width: '120px' }} className="border-0">
                          <div className="d-flex align-items-center gap-2">
                            <div className="position-relative" style={{ width: '40px', height: '40px' }}>
                              <svg width="40" height="40" className="position-absolute">
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="16"
                                  stroke="#e9ecef"
                                  strokeWidth="3"
                                  fill="none"
                                />
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="16"
                                  stroke={skill.progress >= 80 ? "#28a745" : skill.progress >= 50 ? "#ffc107" : "#fd7e14"}
                                  strokeWidth="3"
                                  fill="none"
                                  strokeDasharray={100.53}
                                  strokeDashoffset={100.53 - (skill.progress / 100) * 100.53}
                                  strokeLinecap="round"
                                  style={{ 
                                    transition: 'stroke-dashoffset 0.5s ease-in-out', 
                                    transform: 'rotate(-90deg)', 
                                    transformOrigin: '20px 20px' 
                                  }}
                                />
                              </svg>
                              <div className="position-absolute top-50 start-50 translate-middle">
                                <small className="fw-bold" style={{ fontSize: '10px' }}>{skill.progress}%</small>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-4">
          {/* Overall Platform Progress */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Overall Platform Progress</h6>
              <small className="text-muted">All</small>
            </div>
            <div className="card-body text-center">
              <CircularProgress percentage={66} label="Completed" />
              <div className="row mt-4">
                <div className="col-3 text-center">
                  <div className="text-success fw-bold">33%</div>
                  <small className="text-muted">Achieved</small>
                </div>
                <div className="col-3 text-center">
                  <div className="text-primary fw-bold">120</div>
                  <small className="text-muted">Skills Achieved</small>
                </div>
                <div className="col-3 text-center">
                  <div className="text-warning fw-bold">180</div>
                  <small className="text-muted">Skills Delayed</small>
                </div>
                <div className="col-3 text-center">
                  <div className="text-danger fw-bold">100</div>
                  <small className="text-muted">Skills Locked</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm ">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Recent Activity Feed</h6>
              <div className="d-flex gap-1">
                <span className="badge bg-primary" style={{ fontSize: '10px' }}>All</span>
                <span className="badge bg-outline-secondary" style={{ fontSize: '10px' }}>Missions</span>
              </div>
            </div>
            <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {dashboardData.recentActivity.slice(0, 4).map((activity, index) => (
                <div key={index} className="d-flex align-items-start mb-3">
                  <div className={`rounded-circle p-1 me-2 bg-${activity.type === 'Mission' ? 'primary' : 'success'} bg-opacity-10`} style={{ width: '24px', height: '24px' }}>
                    <i className={`bi ${activity.type === 'Mission' ? 'bi-target' : 'bi-star-fill'} text-${activity.type === 'Mission' ? 'primary' : 'success'}`} style={{ fontSize: '10px' }}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-medium" style={{ fontSize: '12px' }}>{activity.text}</div>
                    <small className="text-muted" style={{ fontSize: '10px' }}>{activity.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card" style={{background:"transparent" , border:"none", borderRadius:"20px"}}>
            <div className="card-header bg-white round-5 " style={{borderRadius:"20px"}}>
              <h6 className="mb-2 mt-3">Quick Actions</h6>
            </div>
            <div className="card-body d-flex flex-column justify-content-center">
              <div className="d-grid gap-2">
                <button className="btn  btn-sm d-flex align-items-center justify-content-between" style={{ fontSize:"20px", background:"#e65f2b", color:"white", borderRadius:"20px"}}>
                  <span>Create Missions</span>
                  <i className="bi bi-plus" style={{ height:"30px", width:"30px", background:"white", marginBottom:"2px",color:"#e65f2b", borderRadius:"50%"}}></i>
                </button>
                <button className="btn  btn-sm d-flex align-items-center justify-content-between" style={{ fontSize:"20px", background:"#e65f2b", color:"white",borderRadius:"20px"}}>
                  <span>Create Skills</span>
                    <i className="bi bi-plus" style={{ height:"30px", width:"30px", background:"white", marginBottom:"2px",color:"#e65f2b", borderRadius:"50%"}}></i>
              
                </button>
                <button className="btn  btn-sm d-flex align-items-center justify-content-between" style={{ fontSize:"20px", background:"#e65f2b", color:"white",borderRadius:"20px"}}>
                  <span>Add User</span>
                  <i className="bi bi-plus" style={{ height:"30px", width:"30px", background:"white", marginBottom:"2px",color:"#e65f2b", borderRadius:"50%"}}></i>
              
                </button>
                <button className="btn  btn-sm d-flex align-items-center justify-content-between" style={{ fontSize:"20px", background:"#e65f2b", color:"white",borderRadius:"20px"}}>
                  <span>Create Admin</span>
                  <i className="bi bi-plus" style={{ height:"30px", width:"30px", background:"white", marginBottom:"2px",color:"#e65f2b", borderRadius:"50%"}}></i>
              
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0 fw-bold">Skill Tree Snapshot</h5>
            </div>
            <div className="card-body d-flex flex-column justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="skill-tree-container position-relative" style={{ height: '400px', padding: '30px 20px' }}>
        
                <svg width="100%" height="100%" className="position-absolute top-0 start-0" style={{ zIndex: 1 }}>
                  <defs>
                    <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                      <polygon points="0 0, 6 2, 0 4" fill="#d1d5db" />
                    </marker>
                  </defs>
                  
     
                  <line x1="50%" y1="65" x2="30%" y2="115" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                  <line x1="50%" y1="65" x2="70%" y2="115" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                  
             
                  <line x1="30%" y1="155" x2="50%" y2="205" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                  <line x1="70%" y1="155" x2="50%" y2="205" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                  
       
                  <line x1="50%" y1="245" x2="50%" y2="295" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                </svg>
                
      
                <div className="position-absolute" style={{ top: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                  <div className="rounded-pill px-4 py-2 fw-normal" style={{ 
                    backgroundColor: '#c3f0ca', 
                    color: '#2d5016', 
                    fontSize: '13px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    Critical Thinking
                  </div>
                </div>

      
                <div className="position-absolute" style={{ top: '120px', left: '30%', transform: 'translateX(-50%)', zIndex: 2 }}>
                  <div className="rounded-pill px-3 py-2 fw-normal" style={{ 
                    backgroundColor: '#fed7aa', 
                    color: '#9a3412', 
                    fontSize: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    Problem Solving
                  </div>
                </div>

                {/* Level 2 - Communication (Completed - Soft Green) */}
                <div className="position-absolute" style={{ top: '120px', left: '70%', transform: 'translateX(-50%)', zIndex: 2 }}>
                  <div className="rounded-pill px-3 py-2 fw-normal" style={{ 
                    backgroundColor: '#c3f0ca', 
                    color: '#2d5016', 
                    fontSize: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    Communication
                  </div>
                </div>

                {/* Level 3 - Team Collaboration (In Progress - Soft Orange) */}
                <div className="position-absolute" style={{ top: '210px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                  <div className="rounded-pill px-3 py-2 fw-normal" style={{ 
                    backgroundColor: '#fed7aa', 
                    color: '#9a3412', 
                    fontSize: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    Team Collaboration
                  </div>
                </div>

                {/* Level 4 - Leadership (Locked - Soft Gray) */}
                <div className="position-absolute" style={{ top: '300px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                  <div className="rounded-pill px-3 py-2 fw-normal" style={{ 
                    backgroundColor: '#e5e7eb', 
                    color: '#6b7280', 
                    fontSize: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    Leadership
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;