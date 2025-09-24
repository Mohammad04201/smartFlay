import React from 'react';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{
      background: 'var(--primary-navy)',
      boxShadow: 'var(--soft-shadow)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.2)'
    }}>
      <div className="container">

        {/* شعار الموقع */}
        <Link className="navbar-brand fw-bold" to="/" style={{ fontSize: '1.5rem', color: 'var(--jordan-white)' }}>
          <i className="fas fa-plane me-2" style={{ color: 'var(--accent-gold)' }}></i>
          SmartFly Jordan
        </Link>

        {/* زر فتح/إغلاق القائمة في الموبايل */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* روابط القائمة */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ transition: 'var(--smooth-transition)' }}>
                <i className="fas fa-home me-1"></i> الرئيسية
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/flights" style={{ transition: 'var(--smooth-transition)' }}>
                <i className="fas fa-plane-departure me-1"></i> الرحلات
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/airlines" style={{ transition: 'var(--smooth-transition)' }}>
                <i className="fas fa-building me-1"></i> شركات الطيران
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-flight" style={{ transition: 'var(--smooth-transition)' }}>
                <i className="fas fa-plus me-1"></i> إضافة رحلة
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/data-manager" style={{ transition: 'var(--smooth-transition)' }}>
                <i className="fas fa-database me-1"></i> إدارة البيانات
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/smart-chat" style={{ transition: 'var(--smooth-transition)' }}>
                <i className="fas fa-comments me-1"></i> الدردشة الذكية
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
