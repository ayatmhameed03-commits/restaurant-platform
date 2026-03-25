function Contact() {
  return (
    <div className="page-card">
      <h1>تواصل معنا</h1>
      <p className="form-subtitle">
        يسعدنا تواصلك معنا لأي استفسار أو ملاحظة تخص منصة إدارة المطاعم.
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📧</div>
          <h3>البريد الإلكتروني</h3>
          <p>Ayat_habib@gmil.com  </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📞</div>
          <h3>رقم الهاتف</h3>
          <p>0523824342</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📍</div>
          <h3>العنوان</h3>
          <p>فلسطين - أم الفحم</p>
        </div>
      </div>
    </div>
  )
}

export default Contact