import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Report = () => {
  // Exact data from the design
  const skillData = [
    { name: 'Communication', value: 85, color: '#6366F1', score: 85 },
    { name: 'Leadership', value: 70, color: '#10B981', score: 70 },
    { name: 'Teamwork', value: 60, color: '#F59E0B', score: 60 },
    { name: 'Problem Solving', value: 43, color: '#06B6D4', score: 43 },
    { name: 'Time Management', value: 35, color: '#8B5CF6', score: 35 },
    { name: 'Creativity', value: 17, color: '#EF4444', score: 17 },
    { name: 'Critical Thinking', value: 25, color: '#EC4899', score: 25 },
    { name: 'Adaptability', value: 55, color: '#84CC16', score: 55 }
  ];

  const missionData = [
    { title: 'Active Listening Exercise', skill: 'Communication', completion: 85, time: '10 mins' },
    { title: 'Persuasive Speaking Task', skill: 'Communication', completion: 60, time: '15 mins' },
    { title: 'Crisis Management Drill', skill: 'Leadership', completion: 30, time: '25 mins' },
    { title: 'Innovation Brainstorm', skill: 'Critical Thinking', completion: 20, time: '20 mins' },
    { title: 'Team Collaboration Game', skill: 'Team Management', completion: 75, time: '18 mins' },
    { title: 'Time Blocking Exercise', skill: 'Time Management', completion: 55, time: '22 mins' },
    { title: 'Creative Storytelling', skill: 'Creativity', completion: 40, time: '17 mins' }
  ];

  const notifications = [
    {
      text: 'Congratulations! You\'re excellent Level 5 in the Quarterly Goal Clarity topic during the period',
      time: '10 mins',
      tag: 'Changing'
    },
    {
      text: 'Tim: A new badge has been added to your profile and your daily report ranking is updated',
      time: '15 mins', 
      tag: 'Changing'
    },
    {
      text: 'Tim: Your Final Collaborative Workshop is scheduled for Friday at 3:00 PM. Don\'t forget to prepare your project outline before joining',
      time: '40 mins',
      tag: 'Changing'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '24px' }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Left Section - Skill Completion Report */}
        <div style={{ 
          flex: '2', 
          minWidth: '500px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '32px'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '32px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Skill Completion Report
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            
            {/* Chart Section */}
            <div style={{ position: 'relative', width: '320px', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillData}
                    cx="50%"
                    cy="50%"
                    innerRadius={85}
                    outerRadius={135}
                    paddingAngle={1}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {skillData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center number */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: '700', 
                  color: '#1f2937',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  333
                </div>
              </div>
            </div>

    
            <div style={{ flex: '1' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {skillData.map((skill, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: skill.color,
                      marginTop: '4px',
                      flexShrink: 0
                    }}></div>
                    <div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#374151',
                        lineHeight: '1.4',
                        marginBottom: '2px'
                      }}>
                        {skill.name}
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#6b7280', 
                        fontWeight: '500' 
                      }}>
                        {skill.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          flex: '1', 
          minWidth: '320px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '32px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '24px' 
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#1f2937',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Notifications
            </h2>
            <div style={{ fontSize: '20px' }}>🔔</div>
          </div>

          <p style={{ 
            color: '#6b7280', 
            fontSize: '14px', 
            marginBottom: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            You have 21 unread messages
          </p>

          {/* Tab buttons */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <button style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Messages
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Events
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              System Errors
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#10b981', 
              marginBottom: '4px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Latest Updates
            </div>
            <div style={{ fontSize: '12px', color: '#10b981' }}>Changelog</div>
          </div>

          {/* Notification items */}
          {notifications.map((notification, index) => (
            <div key={index} style={{ 
              borderBottom: index < notifications.length - 1 ? '1px solid #f3f4f6' : 'none',
              paddingBottom: '16px',
              marginBottom: '16px'
            }}>
              <p style={{ 
                fontSize: '13px', 
                color: '#374151', 
                lineHeight: '1.5', 
                marginBottom: '12px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                {notification.text}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#6b7280',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {notification.time}
                  </span>
                  <span style={{
                    backgroundColor: '#dcfce7',
                    color: '#16a34a',
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {notification.tag}
                  </span>
                </div>
                
                <button style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  Start Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Mission Engagement Report */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '32px',
        marginTop: '24px'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#1f2937', 
          marginBottom: '32px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          Mission Engagement Report
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'separate',
            borderSpacing: '0'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ 
                  padding: '16px 24px', 
                  textAlign: 'left', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  Mission Title
                </th>
                <th style={{ 
                  padding: '16px 24px', 
                  textAlign: 'left', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  Skill
                </th>
                <th style={{ 
                  padding: '16px 24px', 
                  textAlign: 'left', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  Completion Rate
                </th>
                <th style={{ 
                  padding: '16px 24px', 
                  textAlign: 'left', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  Average Time Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {missionData.map((mission, index) => (
                <tr key={index} style={{ 
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                  transition: 'background-color 0.2s'
                }}>
                  <td style={{ 
                    padding: '20px 24px', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#1f2937',
                    borderBottom: '1px solid #f3f4f6',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {mission.title}
                  </td>
                  <td style={{ 
                    padding: '20px 24px', 
                    fontSize: '14px', 
                    color: '#6b7280',
                    borderBottom: '1px solid #f3f4f6',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {mission.skill}
                  </td>
                  <td style={{ 
                    padding: '20px 24px',
                    borderBottom: '1px solid #f3f4f6'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '80px',
                        height: '8px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${mission.completion}%`,
                          height: '100%',
                          backgroundColor: '#3b82f6',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                      <span style={{ 
                        fontSize: '14px', 
                        color: '#374151', 
                        fontWeight: '500',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}>
                        {mission.completion}%
                      </span>
                    </div>
                  </td>
                  <td style={{ 
                    padding: '20px 24px', 
                    fontSize: '14px', 
                    color: '#6b7280',
                    borderBottom: '1px solid #f3f4f6',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {mission.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="flex: '2'"] {
            min-width: 100% !important;
          }
          div[style*="flex: '1'"] {
            min-width: 100% !important;
          }
          div[style*="display: 'flex'"][style*="gap: '40px'"] {
            flex-direction: column !important;
            gap: 20px !important;
          }
          div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="padding: '32px'"] {
            padding: 16px !important;
          }
          div[style*="padding: '24px'"] {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Report;