import React, { useState } from 'react';

const UserProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    timeZone: '',
    email: 'alexarawles@gmail.com'
  });

  const [permissions, setPermissions] = useState({
    createMissions: { admin: true, mentor: true, user: true },
    approveMissionCompletion: { admin: true, mentor: true, user: false },
    viewUserProgress: { admin: true, mentor: true, user: true },
    manageRolesPermissions: { admin: false, mentor: false, user: false },
    sendNotifications: { admin: true, mentor: true, user: true },
    exportReports: { admin: true, mentor: false, user: true },
    removeDeactivateUsers: { admin: false, mentor: true, user: true },
    seeStudentPhotos: { admin: true, mentor: true, user: true }
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permissionKey, role) => {
    setPermissions(prev => ({
      ...prev,
      [permissionKey]: {
        ...prev[permissionKey],
        [role]: !prev[permissionKey][role]
      }
    }));
    
    // Console log to show which permission was changed
    console.log(`Permission changed: ${permissionKey} for ${role} role`);
    console.log('Updated permissions:', {
      ...permissions,
      [permissionKey]: {
        ...permissions[permissionKey],
        [role]: !permissions[permissionKey][role]
      }
    });
  };

  const handleSave = () => {
    if (activeTab === 'profile') {
      console.log('Saving profile data:', formData);
      alert('Profile saved successfully!');
    } else if (activeTab === 'userrole&permissions') {
      console.log('Saving permissions:', permissions);
      alert('Permissions saved successfully!');
    } else {
      console.log(`Saving ${activeTab} settings`);
      alert(`${activeTab} settings saved successfully!`);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      nickName: '',
      gender: '',
      country: '',
      language: '',
      timeZone: '',
      email: 'alexarawles@gmail.com'
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion request submitted.');
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f5f5f5', minHeight: '90vh', padding: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm" style={{ borderRadius: '12px', border: 'none' }}>
            {/* Navigation Tabs */}
            <div className="card-header bg-white" style={{ borderBottom: '1px solid #e9ecef', borderRadius: '12px 12px 0 0' }}>
              <ul className="nav nav-tabs card-header-tabs border-0">
                {['Profile', 'General', 'Notifications', 'User Role & Permissions', 'Integration'].map((tab) => (
                  <li className="nav-item" key={tab}>
                    <button 
                      className={`nav-link ${activeTab === tab.toLowerCase().replace(/\s+/g, '') ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.toLowerCase().replace(/\s+/g, ''))}
                      style={{
                        border: 'none',
                        color: activeTab === tab.toLowerCase().replace(/\s+/g, '') ? '#2d3436' : '#6c757d',
                        fontWeight: activeTab === tab.toLowerCase().replace(/\s+/g, '') ? '600' : '400',
                        borderBottom: activeTab === tab.toLowerCase().replace(/\s+/g, '') ? '3px solid #8B4513' : '3px solid transparent',
                        backgroundColor: 'transparent',
                        padding: '12px 16px'
                      }}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-body p-4">
              {activeTab === 'profile' && (
                <>
                  {/* Profile Section */}
                  <div className="d-flex align-items-center mb-4">
                    <div className="position-relative me-3">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" 
                        alt="Alexa Rawles"
                        className="rounded-circle"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h5 className="mb-1" style={{ fontWeight: '600', color: '#2d3436' }}>Alexa Rawles</h5>
                      <p className="text-muted mb-0" style={{ fontSize: '14px' }}>alexarawles@gmail.com</p>
                    </div>
                  </div>

                  <div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="fullName" className="form-label" style={{ fontWeight: '500', color: '#2d3436' }}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Your First Name"
                          style={{ 
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="nickName" className="form-label" style={{ fontWeight: '500', color: '#2d3436' }}>
                          Nick Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nickName"
                          name="nickName"
                          value={formData.nickName}
                          onChange={handleInputChange}
                          placeholder="Your First Name"
                          style={{ 
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="gender" className="form-label" style={{ fontWeight: '500', color: '#2d3436' }}>
                          Gender
                        </label>
                        <select
                          className="form-select"
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          style={{ 
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="">Your First Name</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="country" className="form-label" style={{ fontWeight: '500', color: '#2d3436' }}>
                          Country
                        </label>
                        <select
                          className="form-select"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          style={{ 
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="">Your First Name</option>
                          <option value="us">United States</option>
                          <option value="uk">United Kingdom</option>
                          <option value="ca">Canada</option>
                          <option value="au">Australia</option>
                          <option value="de">Germany</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="language" className="form-label" style={{ fontWeight: '500', color: '#2d3436' }}>
                          Language
                        </label>
                        <select
                          className="form-select"
                          id="language"
                          name="language"
                          value={formData.language}
                          onChange={handleInputChange}
                          style={{ 
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="">Your First Name</option>
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="zh">Chinese</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="timeZone" className="form-label" style={{ fontWeight: '500', color: '#2d3436' }}>
                          Time Zone
                        </label>
                        <select
                          className="form-select"
                          id="timeZone"
                          name="timeZone"
                          value={formData.timeZone}
                          onChange={handleInputChange}
                          style={{ 
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="">Your First Name</option>
                          <option value="pst">PST (UTC-8)</option>
                          <option value="est">EST (UTC-5)</option>
                          <option value="gmt">GMT (UTC+0)</option>
                          <option value="cet">CET (UTC+1)</option>
                        </select>
                      </div>
                    </div>


                    <div className="mb-4">
                      <label className="form-label" style={{ fontWeight: '500', color: '#2d3436', marginBottom: '12px' }}>
                        My email Address
                      </label>
                      <div className="d-flex align-items-center p-3 bg-light rounded" style={{ border: '1px solid #e9ecef' }}>
                        <div className="me-3">
                          <i className="fas fa-envelope text-primary"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div style={{ fontWeight: '500', fontSize: '14px', color: '#2d3436' }}>
                            {formData.email}
                          </div>
                          <small className="text-muted">1 month ago</small>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="btn btn-link p-0 mt-2" 
                        style={{ fontSize: '14px', textDecoration: 'none', color: '#6c5ce7' }}
                      >
                        + Add Email Address
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={handleDeleteAccount}
                        style={{
                          borderRadius: '8px',
                          padding: '10px 20px',
                          fontWeight: '500',
                          fontSize: '14px'
                        }}
                      >
                        Delete account
                      </button>
                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-secondary me-3"
                          onClick={handleCancel}
                          style={{
                            borderRadius: '8px',
                            padding: '10px 24px',
                            fontWeight: '500',
                            fontSize: '14px'
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn text-white"
                          onClick={handleSave}
                          style={{
                            backgroundColor: '#6c5ce7',
                            borderColor: '#6c5ce7',
                            borderRadius: '8px',
                            padding: '10px 24px',
                            fontWeight: '500',
                            fontSize: '14px'
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

   
              {activeTab === 'general' && (
                <div className="text-center py-5">
                  <h5 className="text-muted">General Settings</h5>
                  <p className="text-muted">General configuration options will be displayed here.</p>
                </div>
              )}


              {activeTab === 'notifications' && (
                <div className="text-center py-5">
                  <h5 className="text-muted">Notification Settings</h5>
                  <p className="text-muted">Notification preferences will be configured here.</p>
                </div>
              )}

           
              {activeTab === 'userrole&permissions' && (
                <div>
         

                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th style={{ fontWeight: '600', color: '#2d3436', padding: '16px 0' }}>Permission</th>
                          <th className="text-center" style={{ fontWeight: '600', color: '#2d3436', padding: '16px 0' }}>Admin</th>
                          <th className="text-center" style={{ fontWeight: '600', color: '#2d3436', padding: '16px 0' }}>Mentor</th>
                          <th className="text-center" style={{ fontWeight: '600', color: '#2d3436', padding: '16px 0' }}>User</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            key: 'createMissions',
                            title: 'Create Missions',
                            description: 'Allow creating new missions with title, XP, and requirements.'
                          },
                          {
                            key: 'approveMissionCompletion',
                            title: 'Approve Mission Completion',
                            description: 'Permission to review and approve completed missions.'
                          },
                          {
                            key: 'viewUserProgress',
                            title: 'View User Progress',
                            description: 'Access detailed reports on user skill and mission progress.'
                          },
                          {
                            key: 'manageRolesPermissions',
                            title: 'Manage Roles & Permissions',
                            description: 'Control what each role can do in the system.'
                          },
                          {
                            key: 'sendNotifications',
                            title: 'Send Notifications',
                            description: 'Send custom in-app or email notifications to users.'
                          },
                          {
                            key: 'exportReports',
                            title: 'Export Reports',
                            description: 'Generate downloadable reports in PDF/Excel format.'
                          },
                          {
                            key: 'removeDeactivateUsers',
                            title: 'Remove/Deactivate Users',
                            description: 'Delete accounts or remove users from the platform.'
                          },
                          {
                            key: 'seeStudentPhotos',
                            title: 'See Student Photos',
                            description: 'Providers can see student profile photos.'
                          }
                        ].map((permission, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #f8f9fa' }}>
                            <td style={{ padding: '20px 0' }}>
                              <div>
                                <div style={{ fontWeight: '500', color: '#2d3436', marginBottom: '4px' }}>
                                  {permission.title}
                                </div>
                                <div style={{ fontSize: '12px', color: '#636e72', lineHeight: '1.4' }}>
                                  {permission.description}
                                </div>
                              </div>
                            </td>
                            <td className="text-center" style={{ padding: '20px 0' }}>
                              <div className="form-check form-switch d-flex justify-content-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={permissions[permission.key]?.admin || false}
                                  onChange={() => handlePermissionChange(permission.key, 'admin')}
                                  style={{
                                    transform: 'scale(1.3)',
                                    cursor: 'pointer'
                                  }}
                                />
                                <style jsx>{`
                                  .form-check-input:checked {
                                    background-color: #fd7f28 !important;
                                    border-color: #fd7f28 !important;
                                  }
                                `}</style>
                              </div>
                            </td>
                            <td className="text-center" style={{ padding: '20px 0' }}>
                              <div className="form-check form-switch d-flex justify-content-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={permissions[permission.key]?.mentor || false}
                                  onChange={() => handlePermissionChange(permission.key, 'mentor')}
                                  style={{
                                    transform: 'scale(1.3)',
                                    cursor: 'pointer'
                                  }}
                                />
                              </div>
                            </td>
                            <td className="text-center" style={{ padding: '20px 0' }}>
                              <div className="form-check form-switch d-flex justify-content-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={permissions[permission.key]?.user || false}
                                  onChange={() => handlePermissionChange(permission.key, 'user')}
                                  style={{
                                    transform: 'scale(1.3)',
                                    cursor: 'pointer'
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


              {activeTab === 'integration' && (
                <div className="text-center py-5">
                  <h5 className="text-muted">Integration Settings</h5>
                  <p className="text-muted">Third-party integrations will be managed here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

   
      <style>{`
        .form-check-input:checked {
          background-color: #fd7f28 !important;
          border-color: #fd7f28 !important;
        }
        .form-check-input:focus {
          border-color: #fd7f28 !important;
          box-shadow: 0 0 0 0.25rem rgba(253, 127, 40, 0.25) !important;
        }
      `}</style>

      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />
    </div>
  );
};

export default UserProfileSettings;