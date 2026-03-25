
function About() {
  return (
    <div className="page-card">
      <h1>من نحن</h1>
      <p className="form-subtitle">
        منصة إدارة المطاعم تهدف الى تسهيل تجربة المستخدم
        وأصحاب المطاعم من خلال واجهة عصرية وعملية.
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>رؤيتنا</h3>
          <p>
            تقديم تجربة رقمية حديثة تساعد على إدارة المطاعم والحجوزات
            بسهولة ووضوح.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>هدفنا</h3>
          <p>
            ربط المستخدم بالمطاعم المميزة وتسهيل عمليات الحجز والإدارة من خلال
            منصة واحدة متكاملة.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3>فكرتنا</h3>
          <p>
            إنشاء نظام ذكي يسهّل عرض المطاعم، إضافة البيانات، إدارة الحجوزات،
            وتحسين تجربة العميل.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About