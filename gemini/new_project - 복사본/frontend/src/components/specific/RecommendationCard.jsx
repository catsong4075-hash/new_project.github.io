import React from 'react'

function RecommendationCard({ recommendation }) {
  const { title, description, category, icon, priority } = recommendation

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336'
      case 'medium': return '#FF9800'
      case 'low': return '#4CAF50'
      default: return '#2196F3'
    }
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'health': '🏥',
      'career': '💼',
      'love': '💕',
      'finance': '💰',
      'study': '📚',
      'travel': '✈️',
      'social': '👥',
      'hobby': '🎨'
    }
    return icons[category] || '✨'
  }

  return (
    <div className="recommendation-card">
      <div className="card-header">
        <div className="card-icon">
          {icon || getCategoryIcon(category)}
        </div>
        <div className="card-priority">
          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(priority) }}
          >
            {priority === 'high' ? '높음' : 
             priority === 'medium' ? '보통' : '낮음'}
          </span>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      
      <div className="card-footer">
        <span className="card-category">{category}</span>
        <span className="card-time">오늘 추천</span>
      </div>
    </div>
  )
}

export default RecommendationCard 