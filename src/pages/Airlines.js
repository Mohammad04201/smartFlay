import React from 'react';

const Airlines = () => {
  const airlines = [
    {
      id: 1,
      name: 'الخطوط الأردنية الملكية',
      nameEn: 'Royal Jordanian',
      code: 'RJ',
      logo: '🇯🇴',
      description: 'الناقل الوطني للمملكة الأردنية الهاشمية',
      founded: '1963',
      headquarters: 'عمان، الأردن',
      fleet: '26 طائرة',
      destinations: '40+ وجهة',
      website: 'www.rj.com',
      color: 'primary'
    },
    {
      id: 2,
      name: 'طيران الأردن',
      nameEn: 'Jordan Aviation',
      code: 'R5',
      logo: '🇯🇴',
      description: 'شركة طيران أردنية خاصة متخصصة في الرحلات المجدولة والمستأجرة',
      founded: '1998',
      headquarters: 'عمان، الأردن',
      fleet: '12 طائرة',
      destinations: '25+ وجهة',
      website: 'www.jordanaviation.jo',
      color: 'success'
    },
    {
      id: 3,
      name: 'أجنحة العرب الأردنية',
      nameEn: 'Arab Wings',
      code: 'AW',
      logo: '🇯🇴',
      description: 'شركة طيران أردنية تقدم خدمات الطيران المحلي والإقليمي',
      founded: '1975',
      headquarters: 'عمان، الأردن',
      fleet: '8 طائرات',
      destinations: '15+ وجهة',
      website: 'www.arabwings.com.jo',
      color: 'warning'
    },
    {
      id: 4,
      name: 'الجزيرة للطيران الأردن',
      nameEn: 'Jazeera Airways Jordan',
      code: 'J9',
      logo: '🇯🇴',
      description: 'فرع أردني من شركة الجزيرة للطيران الكويتية',
      founded: '2019',
      headquarters: 'عمان، الأردن',
      fleet: '6 طائرات',
      destinations: '12+ وجهة',
      website: 'www.jazeeraairways.com',
      color: 'info'
    }
  ];

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--jordan-royal)' }}>
            <i className="fas fa-plane me-3" style={{ color: 'var(--jordan-gold)' }}></i>
            شركات الطيران الأردنية
          </h1>
          <p className="lead" style={{ color: 'var(--jordan-stone)' }}>
            تعرف على شركات الطيران الأردنية الرائدة الشريكة مع SmartFly
          </p>
        </div>
      </div>

      <div className="row g-4">
        {airlines.map(airline => (
          <div key={airline.id} className="col-lg-6 col-xl-4">
            <div className={`card h-100 border-0 shadow-sm bg-${airline.color} bg-opacity-10`}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2rem' }}>
                    {airline.logo}
                  </div>
                  <div>
                    <h4 className="mb-1" style={{ color: 'var(--jordan-royal)' }}>{airline.name}</h4>
                    <small className="text-muted">{airline.nameEn}</small>
                    <span className={`badge bg-${airline.color}`}>
                      {airline.code}
                    </span>
                  </div>
                </div>

                <p className="text-muted mb-3">{airline.description}</p>

                <div className="row text-center mb-3">
                  <div className="col-6">
                    <div className="text-muted small">تأسست</div>
                    <div className="fw-bold">{airline.founded}</div>
                  </div>
                  <div className="col-6">
                    <div className="text-muted small">المقر الرئيسي</div>
                    <div className="fw-bold">{airline.headquarters}</div>
                  </div>
                </div>

                <div className="row text-center mb-3">
                  <div className="col-6">
                    <div className="text-muted small">الأسطول</div>
                    <div className="fw-bold">{airline.fleet}</div>
                  </div>
                  <div className="col-6">
                    <div className="text-muted small">الوجهات</div>
                    <div className="fw-bold">{airline.destinations}</div>
                  </div>
                </div>

                <hr />

                <div className="d-grid">
                  <a
                    href={`https://${airline.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      background: 'var(--jordan-royal)',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    <i className="fas fa-external-link-alt me-2"></i>
                    زيارة الموقع الرسمي
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="row mt-5 pt-5">
        <div className="col-12">
          <div className="bg-light p-5 rounded">
            <h3 className="text-center mb-4" style={{ color: 'var(--jordan-royal)' }}>
              <i className="fas fa-star me-2" style={{ color: 'var(--jordan-gold)' }}></i>
              لماذا تختار SmartFly؟
            </h3>
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-shield-alt mb-3" style={{ fontSize: '2rem', color: 'var(--jordan-royal)' }}></i>
                <h5 style={{ color: 'var(--jordan-royal)' }}>الأمان والموثوقية</h5>
                <p className="text-muted">شراكتنا مع أفضل شركات الطيران الأردنية تضمن رحلات آمنة وموثوقة</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-tags mb-3" style={{ fontSize: '2rem', color: 'var(--jordan-gold)' }}></i>
                <h5 style={{ color: 'var(--jordan-royal)' }}>أفضل الأسعار</h5>
                <p className="text-muted">نوفر لك أفضل العروض والأسعار من جميع شركات الطيران الأردنية</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-headset mb-3" style={{ fontSize: '2rem', color: 'var(--jordan-sage)' }}></i>
                <h5 style={{ color: 'var(--jordan-royal)' }}>دعم 24/7</h5>
                <p className="text-muted">فريق الدعم متاح على مدار الساعة لمساعدتك في أي وقت</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airlines; 