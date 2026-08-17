import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KeplerFold } from "@/components/kepler-fold";
import { RouteHero } from "@/components/route-hero";

const capabilities = ["الاتجاه", "التجربة", "البناء", "التطوير"];
const approach = [
  "نستمع جيداً",
  "نحدد الأولوية",
  "نحول الفكرة إلى واقع",
  "نطور بعناية",
];

export default function ArabicHomePage() {
  return (
    <>
      <RouteHero
        className="atelier-hero-ar"
        titleId="arabic-hero-title"
        kicker="استوديو مستقل للمنتجات الرقمية"
        title="منتجات رقمية مدروسة تدفع أعمالك إلى الأمام."
        lead="نتعاون مع فرق طموحة في الخليج وحول العالم لنصمم ونبني منتجات يحبها الناس وتساعد الأعمال على النمو."
        actions={
          <>
            <Link className="atelier-primary-action" href="/contact">
              ابدأ الحديث معنا <ArrowLeft aria-hidden="true" />
            </Link>
            <Link className="atelier-secondary-action" href="#approach">
              اكتشف أسلوب عملنا <ArrowLeft aria-hidden="true" />
            </Link>
          </>
        }
      />

      <p className="atelier-language-notice" lang="en" dir="ltr">
        Arabic preview — language review in progress.
      </p>

      <section
        className="atelier-capabilities"
        id="services"
        aria-labelledby="arabic-capabilities-heading"
      >
        <KeplerFold className="capability-fragment" />
        <div className="shell atelier-capability-layout">
          <div>
            <h2 id="arabic-capabilities-heading">
              فكر واضح.
              <br />
              تنفيذ جميل.
              <br />
              تسليم يعتمد عليه.
            </h2>
            <p>
              من تحديد الاتجاه إلى الإطلاق والتطوير المستمر، نجمع الاستراتيجية
              والتصميم والهندسة حول هدف واحد واضح.
            </p>
          </div>
          <ul className="atelier-capability-list atelier-capability-list-ar">
            {capabilities.map((label, index) => (
              <li key={label}>
                <span className="arabic-capability-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="atelier-approach"
        id="approach"
        aria-labelledby="arabic-approach-heading"
      >
        <KeplerFold className="approach-fragment" />
        <div className="shell">
          <div className="atelier-approach-intro">
            <p className="atelier-kicker">أسلوب عملنا</p>
            <h2 id="arabic-approach-heading">
              أسلوب عمل مدروس، مصمم حول احتياجات أعمالك.
            </h2>
          </div>
          <ol className="atelier-approach-steps atelier-approach-steps-ar">
            {approach.map((title, index) => (
              <li key={title}>
                <span className="atelier-step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="atelier-step-dot" aria-hidden="true" />
                <h3>{title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="atelier-assurance"
        aria-label="السياق والعمل مع الاستوديو"
      >
        <article className="atelier-work-disclosure" id="work">
          <div>
            <p className="atelier-kicker">أعمال خاصة بطبيعتها</p>
            <h2>أعمال مناسبة، نشاركها مع سياقها.</h2>
            <p>
              الكثير من أعمالنا خاص. نشارك أمثلة مناسبة مباشرة، بعد الحصول على
              الإذن، مع توضيح القرارات التي شكلت كل تجربة.
            </p>
            <Link
              className="atelier-secondary-action atelier-secondary-dark"
              href="/contact"
            >
              ابدأ الحديث معنا <ArrowLeft aria-hidden="true" />
            </Link>
          </div>
        </article>
        <article className="atelier-founder-assurance" id="studio">
          <KeplerFold className="assurance-fold-fragment" />
          <div>
            <p className="atelier-kicker">بقيادة المؤسس</p>
            <h2>شريك واحد مسؤول معك من أول حديث حتى الإطلاق.</h2>
            <p>
              تعمل مباشرة مع المؤسس وفريق متخصص يبقى قريباً من منتجك واحتياجات
              أعمالك.
            </p>
            <Link className="atelier-secondary-action" href="/mahmoud">
              تعرف على الاستوديو <ArrowLeft aria-hidden="true" />
            </Link>
          </div>
        </article>
      </section>

      <section
        className="atelier-final-cta"
        aria-labelledby="arabic-final-cta-heading"
      >
        <KeplerFold className="final-fold-fragment" />
        <div className="shell atelier-final-content">
          <p className="atelier-kicker">هل أنت مستعد للبدء؟</p>
          <h2 id="arabic-final-cta-heading">حدثنا عما تريد بناءه.</h2>
          <div>
            <Link className="atelier-primary-action" href="/contact">
              ابدأ الحديث معنا <ArrowLeft aria-hidden="true" />
            </Link>
            <p>محادثة قصيرة قد توفر أسابيع من التخمين.</p>
          </div>
        </div>
      </section>
    </>
  );
}
