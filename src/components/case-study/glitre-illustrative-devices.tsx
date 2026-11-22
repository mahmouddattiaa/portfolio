type CustomerScreen = "stations" | "home" | "qr" | "redeem" | "vouchers";
type WorkerScreen = "hub" | "scanner" | "purchase" | "confirmation";

const customerScreens: Record<CustomerScreen, { title: string; eyebrow: string; content: ReactNode }> = {
  stations: { title: "اكتشف المحطات", eyebrow: "محطات قريبة", content: <><div className="glitre-device-search">ابحث عن محطة أو مدينة</div><DeviceRow title="محطة النخيل" detail="القاهرة الجديدة · 1.2 كم" badge="مفتوحة" /><DeviceRow title="محطة المطار" detail="طريق المطار · 3.8 كم" badge="متاحة" /><DeviceRow title="محطة المعادي" detail="شارع النصر · 5.1 كم" badge="مفتوحة" /></> },
  home: { title: "مرحباً، سارة", eyebrow: "رصيد النقاط", content: <><div className="glitre-device-balance"><strong>1,250</strong><span>نقطة متاحة</span></div><div className="glitre-device-primary">عرض رمز الاستخدام مرة واحدة</div><DeviceRow title="قسائمك" detail="قسيمتان متاحتان" badge="عرض" /><DeviceRow title="آخر زيارة" detail="محطة النخيل · اليوم" badge="+ 100" /></> },
  qr: { title: "رمز الاستخدام مرة واحدة", eyebrow: "اعرض الرمز للعامل", content: <><div className="glitre-device-code" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><p className="glitre-device-warning">ينتهي خلال 00:58 · استخدام واحد</p><p className="glitre-device-muted">رسم توضيحي فقط؛ ليس رمزاً صالحاً للمسح.</p></> },
  redeem: { title: "تأكيد الاستبدال", eyebrow: "راجع القسيمة قبل المتابعة", content: <><div className="glitre-device-voucher"><strong>قهوة مجانية</strong><span>محطة النخيل</span><b>500 نقطة</b></div><p className="glitre-device-muted">سيتم خصم النقاط بعد تأكيد الخادم.</p><div className="glitre-device-primary">تأكيد الاستبدال</div><div className="glitre-device-secondary">العودة</div></> },
  vouchers: { title: "قسائمي", eyebrow: "متاح للاستبدال", content: <><DeviceRow title="غسيل سيارة" detail="صالح حتى 30 ديسمبر" badge="استبدل" /><DeviceRow title="قهوة مجانية" detail="صالح حتى 15 يناير" badge="500 نقطة" /><div className="glitre-device-muted">تظهر حالة القسيمة بعد تأكيد الخادم.</div></> },
};

const workerScreens: Record<WorkerScreen, { title: string; eyebrow: string; content: ReactNode }> = {
  hub: { title: "Station hub", eyebrow: "Assigned station · Al Nakheel", content: <><div className="glitre-device-station">Station 014 <span>Connected</span></div><div className="glitre-device-primary">Scan a customer purchase</div><div className="glitre-device-secondary">Consume a voucher</div><DeviceRow title="Recent activity" detail="Read-only · current session" badge="View" /></> },
  scanner: { title: "Scan customer QR", eyebrow: "Customer eligibility · server returned", content: <><div className="glitre-device-scan"><span /><b>SCAN</b></div><DeviceRow title="Customer" detail="S••• A••••" badge="Eligible" /><p className="glitre-device-muted">Masked identity only. The server decides eligibility.</p></> },
  purchase: { title: "Purchase entry", eyebrow: "Review before submitting", content: <><div className="glitre-device-field"><span>Amount</span><strong>EGP 100.00</strong></div><div className="glitre-device-field"><span>Category</span><strong>Fuel purchase</strong></div><div className="glitre-device-field"><span>Payment method</span><strong>Card</strong></div><div className="glitre-device-primary">Submit purchase</div></> },
  confirmation: { title: "Purchase confirmed", eyebrow: "Server response received", content: <><div className="glitre-device-confirm-icon" aria-hidden="true">✓</div><div className="glitre-device-balance"><strong>+ 100</strong><span>points awarded</span></div><DeviceRow title="Transaction reference" detail="TXN-•••-4821" badge="Saved" /><p className="glitre-device-muted">Success is shown only after confirmation. No POS device is represented.</p></> },
};

export function GlitreCustomerIllustration({ screen }: { screen: CustomerScreen }) {
  const item = customerScreens[screen];
  return <Illustration title={item.title} eyebrow={item.eyebrow} dir="rtl" kind="customer">{item.content}</Illustration>;
}

export function GlitreWorkerIllustration({ screen }: { screen: WorkerScreen }) {
  const item = workerScreens[screen];
  return <Illustration title={item.title} eyebrow={item.eyebrow} dir="ltr" kind="worker">{item.content}</Illustration>;
}

function Illustration({ title, eyebrow, dir, kind, children }: { title: string; eyebrow: string; dir: "ltr" | "rtl"; kind: string; children: ReactNode }) {
  return <figure className="glitre-illustrative-device" dir={dir} data-product={kind} aria-label={`${title}, illustrative screen`}><div className="glitre-device-top"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /></div><div className="glitre-device-screen"><p className="glitre-device-eyebrow">{eyebrow}</p><h3>{title}</h3><div className="glitre-device-content">{children}</div><nav aria-label="Illustrative app navigation"><span>Home</span><span>Activity</span><span>Profile</span></nav></div><figcaption><strong>{title}</strong><span>Illustrative screen · from the approved design specification, not a device capture.</span></figcaption></figure>;
}

function DeviceRow({ title, detail, badge }: { title: string; detail: string; badge: string }) {
  return <div className="glitre-device-row"><span><strong>{title}</strong><small>{detail}</small></span><b>{badge}</b></div>;
}
import type { ReactNode } from "react";
