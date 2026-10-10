import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Leaf,
  MapPin,
  Phone,
  Sparkles,
  Waves,
} from "lucide-react";
import BrandMark from "./BrandMark";
import styles from "./therapy.module.css";

const phoneNumber = "+447956273562";
const displayPhone = "07956 273562";
const email = "mark.carnell@icloud.com";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=150A%20Huxley%20Road%2C%20Leyton%2C%20E10%205QY";

export const metadata: Metadata = {
  title: { absolute: "Kinesis Hypnotherapy | Mark Carnell" },
  description:
    "A website and brand concept for Mark Carnell of Kinesis Hypnotherapy in Leyton, London. Explore a personal approach to hypnotherapy and mindfulness.",
  alternates: { canonical: "/therapyexample" },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    title: "Kinesis Hypnotherapy | Mark Carnell",
    description:
      "Personalised hypnotherapy and mindfulness support in Leyton, London.",
    url: "/therapyexample",
  },
};

const services = [
  {
    number: "01",
    title: "Hypnotherapy sessions",
    text: "Personalised one-to-one sessions shaped around your needs and goals.",
    icon: Waves,
  },
  {
    number: "02",
    title: "Mindfulness programmes",
    text: "Mindfulness practices to make a little more room for awareness and ease.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Self-care education",
    text: "Simple ideas and practices to help you look after your everyday wellbeing.",
    icon: BookOpen,
  },
  {
    number: "04",
    title: "Supportive guidance",
    text: "A steady, thoughtful space for reflection, learning and next steps.",
    icon: Compass,
  },
];

const process = [
  {
    number: "01",
    title: "Start with a conversation",
    text: "Call Mark to share what you are looking for and ask any questions.",
  },
  {
    number: "02",
    title: "Shape the approach",
    text: "Explore a personalised session using hypnotherapy and mindfulness practices.",
  },
  {
    number: "03",
    title: "Move at your pace",
    text: "Reflect on what feels helpful and discuss the next step together.",
  },
];

export default function TherapyExamplePage() {
  return (
    <main className={styles.site} id="main-content">
      <div className={styles.conceptBar}>
        <div className={styles.conceptBarInner}>
          <span className={styles.conceptLabel}>
            <span className={styles.conceptDot} />
            Website &amp; brand concept
          </span>
          <span className={styles.conceptByline}>
            Created by WeDigitlize for Mark Carnell
          </span>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brandLockup} href="#top" aria-label="Kinesis Hypnotherapy home">
            <BrandMark className={styles.logoMark} />
            <span className={styles.brandName}>
              <strong>Kinesis</strong>
              <span>HYPNOTHERAPY</span>
            </span>
          </a>

          <nav aria-label="Main navigation" className={styles.navLinks}>
            <a href="#approach">Approach</a>
            <a href="#services">Support</a>
            <a href="#mark">About Mark</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className={styles.headerActions}>
            <a className={styles.cardLink} href="/therapyexample/card">
              Digital card <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <a className={styles.headerCall} href={"tel:" + phoneNumber}>
              <Phone aria-hidden="true" size={16} />
              <span>Call Mark</span>
            </a>
          </div>
        </div>
      </header>

      <section aria-labelledby="hero-title" className={styles.hero} id="top">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Kinesis Hypnotherapy <span className={styles.eyebrowDivider}>/</span> Leyton, London
            </p>
            <h1 id="hero-title">
              Make room for a <em>calmer</em> way forward.
            </h1>
            <p className={styles.heroLead}>
              Personalised hypnotherapy and mindfulness support, centred on you
              and the changes you would like to explore.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={"tel:" + phoneNumber}>
                <Phone aria-hidden="true" size={17} />
                Call Mark
                <span>{displayPhone}</span>
              </a>
              <a className={styles.secondaryButton} href="#approach">
                Explore the approach <ArrowRight aria-hidden="true" size={16} />
              </a>
            </div>
            <p className={styles.heroNote}>
              A personal conversation is a simple place to begin.
            </p>
            <div aria-hidden="true" className={styles.heroSignature}>
              <span />
              <span />
              <span />
              <small>Calm · Clarity · Change</small>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div
              aria-label="Sunset image from the current Kinesis Hypnotherapy website"
              className={styles.heroPhoto}
              role="img"
            />
            <div aria-hidden="true" className={styles.heroOrbit} />
            <div className={styles.heroImageLabel}>
              <span className={styles.heroImageLine} />
              <span>A quieter moment</span>
              <span className={styles.heroImageNumber}>01 — 03</span>
            </div>
            <div className={styles.heroSeal}>
              <BrandMark className={styles.heroSealMark} />
              <span>Make space<br />to breathe</span>
            </div>
            <a className={styles.imageNote} href="#contact">
              Your first step can be a call <ArrowRight aria-hidden="true" size={14} />
            </a>
          </div>
        </div>
      </section>

      <div aria-label="Services offered" className={styles.serviceRibbon} role="group">
        <span>Personalised hypnotherapy</span>
        <i aria-hidden="true" />
        <span>Mindfulness</span>
        <i aria-hidden="true" />
        <span>Self-care</span>
        <i aria-hidden="true" />
        <span>Supportive guidance</span>
      </div>

      <section aria-labelledby="approach-title" className={styles.approach} id="approach">
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>
              <span className={styles.sectionNumber}>01</span>
              A PERSON-CENTRED APPROACH
            </p>
            <h2 id="approach-title">
              Your story first.<br />
              <em>Your next step, together.</em>
            </h2>
          </div>
          <div className={styles.approachBody}>
            <p>
              There is no single script for personal change. Mark combines
              hypnotherapy, mindfulness practices and positive suggestion in an
              approach shaped around your individual aims.
            </p>
            <p>
              The first step is simply to talk about what matters to you, what
              you hope to work towards, and whether this feels like the right
              kind of support.
            </p>
            <a className={styles.textLink} href="#contact">
              Talk with Mark <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
        <div className={styles.approachFoot}>
          <span className={styles.approachFootMark}><BrandMark className={styles.smallMark} /></span>
          <p>Thoughtful support, shaped around the person in front of you.</p>
          <span className={styles.approachFootLine} />
        </div>
      </section>

      <section aria-labelledby="services-title" className={styles.services} id="services">
        <div className={styles.sectionInner}>
          <div className={styles.servicesHeading}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.sectionNumber}>02</span>
                WAYS TO WORK TOGETHER
              </p>
              <h2 id="services-title">
                Support that can <em>meet you where you are.</em>
              </h2>
            </div>
            <p className={styles.servicesLead}>
              Different forms of support can work together. Mark can help you
              explore what suits your goals.
            </p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map(({ number, title, text, icon: Icon }) => (
              <article className={styles.serviceCard} key={number}>
                <div className={styles.serviceCardTop}>
                  <span className={styles.serviceNumber}>{number}</span>
                  <span className={styles.serviceIcon}>
                    <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contact" aria-label={"Ask Mark about " + title}>
                  Ask Mark <ArrowRight aria-hidden="true" size={15} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className={styles.process}>
        <div className={styles.sectionInner}>
          <div className={styles.processLead}>
            <p className={styles.eyebrow}>
              <span className={styles.sectionNumber}>03</span>
              WHAT TO EXPECT
            </p>
            <h2 id="process-title">
              One step at a time.
              <em>At your pace.</em>
            </h2>
            <p>
              You do not need to have everything figured out before reaching
              out. Start with a question and take it from there.
            </p>
            <a className={styles.textLink} href={"tel:" + phoneNumber}>
              <Phone aria-hidden="true" size={15} /> Call {displayPhone}
            </a>
          </div>
          <div className={styles.processSteps}>
            {process.map((step) => (
              <article className={styles.processStep} key={step.number}>
                <div className={styles.processStepNumber}>{step.number}</div>
                <div className={styles.processStepCopy}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <ArrowUpRight aria-hidden="true" className={styles.processArrow} size={19} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="mark-title" className={styles.about} id="mark">
        <div className={styles.aboutInner}>
          <div className={styles.aboutPortrait}>
            <div
              aria-label="Portrait image from Mark Carnell's current Kinesis Hypnotherapy website"
              className={styles.portraitPhoto}
              role="img"
            />
            <span className={styles.portraitCaption}>
              <span>MARK CARNELL</span>
              <span>HYPNOTHERAPIST · LEYTON</span>
            </span>
            <div className={styles.portraitBadge}>
              <Leaf aria-hidden="true" size={21} strokeWidth={1.4} />
              <span>A personal<br />approach</span>
            </div>
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.sectionNumber}>04</span>
              A LITTLE ABOUT THE PRACTICE
            </p>
            <h2 id="mark-title">
              Meet <em>Mark.</em>
            </h2>
            <p>
              Mark Carnell offers hypnotherapy and mindfulness support in
              Leyton, London. His approach brings together personalised
              sessions, mindful practices and positive suggestion.
            </p>
            <p>
              Each conversation starts with your aims, so the support can be
              considered around what you want to work towards.
            </p>
            <a className={styles.aboutCardLink} href="/therapyexample/card">
              <span className={styles.aboutCardIcon}><BrandMark className={styles.aboutCardMark} /></span>
              <span>
                <strong>Keep Mark&apos;s details close</strong>
                <small>Open the digital contact card</small>
              </span>
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="identity-title" className={styles.identity}>
        <div className={styles.identityInner}>
          <div className={styles.identityCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.sectionNumber}>05</span>
              THE KINESIS IDENTITY
            </p>
            <h2 id="identity-title">
              Calm, considered<br />
              <em>and distinctly human.</em>
            </h2>
            <p>
              The visual direction pairs soft sage and warm ivory with deep
              forest green and a small brass accent. The flowing-line symbol
              suggests movement, balance and a new direction.
            </p>
            <a
              className={styles.logoDownload}
              download="Kinesis-Hypnotherapy-Logo.svg"
              href="/therapyexample/kinesis-hypnotherapy.svg"
            >
              Download the SVG logo <ArrowDownRightIcon />
            </a>
          </div>
          <div className={styles.identityBoard}>
            <div className={styles.identityLogo}>
              <BrandMark className={styles.identityMark} />
              <span className={styles.identityWordmark}>
                <strong>Kinesis</strong>
                <small>HYPNOTHERAPY</small>
              </span>
              <span className={styles.identityRule} />
              <span className={styles.identityTagline}>A CALMER WAY FORWARD</span>
            </div>
            <div className={styles.palette}>
              <div className={styles.paletteSwatch}>
                <span className={styles.swatchForest} />
                <small>Forest</small>
              </div>
              <div className={styles.paletteSwatch}>
                <span className={styles.swatchSage} />
                <small>Sage</small>
              </div>
              <div className={styles.paletteSwatch}>
                <span className={styles.swatchLinen} />
                <small>Linen</small>
              </div>
              <div className={styles.paletteSwatch}>
                <span className={styles.swatchBrass} />
                <small>Brass</small>
              </div>
            </div>
            <p className={styles.identityType}>
              <span>TYPE</span>
              <b>Warm editorial serif</b>
              <i>Clear, modern sans serif</i>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className={styles.faq}>
        <div className={styles.sectionInner}>
          <div className={styles.faqHeading}>
            <p className={styles.eyebrow}>
              <span className={styles.sectionNumber}>06</span>
              YOUR QUESTIONS
            </p>
            <h2 id="faq-title">A few things you may be wondering.</h2>
            <p>Something else on your mind? Call Mark and ask.</p>
            <a className={styles.textLink} href={"tel:" + phoneNumber}>
              <Phone aria-hidden="true" size={15} /> Call Mark
            </a>
          </div>
          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary>
                What support does Mark offer?
                <span aria-hidden="true" />
              </summary>
              <p>
                Mark offers personalised hypnotherapy sessions, mindfulness
                programmes, self-care education and supportive guidance. Call
                to discuss what may fit your aims.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>
                Can I speak with Mark before arranging a session?
                <span aria-hidden="true" />
              </summary>
              <p>
                Yes. Call or email Mark to talk through what you are looking
                for, ask questions and find out more about the approach.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>
                Where is the practice based?
                <span aria-hidden="true" />
              </summary>
              <p>
                The practice is listed in Leyton, London. Please contact Mark
                before travelling to confirm arrangements.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>
                Is hypnotherapy a replacement for medical care?
                <span aria-hidden="true" />
              </summary>
              <p>
                No. Hypnotherapy should not replace medical advice, diagnosis
                or treatment. If you have a health concern, speak with a
                qualified healthcare professional.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-title" className={styles.contact} id="contact">
        <div className={styles.contactInner}>
          <div className={styles.contactCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.contactDot} />
              YOUR FIRST STEP
            </p>
            <h2 id="contact-title">
              Let&apos;s start<br />
              <em>with a conversation.</em>
            </h2>
            <p>
              Call Mark to talk about what you are looking for and ask any
              questions. There is no need to have all the answers before you
              get in touch.
            </p>
            <a className={styles.contactCall} href={"tel:" + phoneNumber}>
              <Phone aria-hidden="true" size={17} />
              Call Mark <span>{displayPhone}</span>
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>
          <div className={styles.contactDetails}>
            <a className={styles.contactDetail} href={"mailto:" + email}>
              <span className={styles.contactIcon}><ArrowUpRight aria-hidden="true" size={17} /></span>
              <span>
                <small>EMAIL MARK</small>
                <strong>{email}</strong>
              </span>
              <ArrowUpRight aria-hidden="true" className={styles.contactExternal} size={17} />
            </a>
            <a className={styles.contactDetail} href={mapUrl} rel="noreferrer" target="_blank">
              <span className={styles.contactIcon}><MapPin aria-hidden="true" size={17} /></span>
              <span>
                <small>LEYTON, LONDON</small>
                <strong>150A Huxley Road, E10 5QY</strong>
              </span>
              <ArrowUpRight aria-hidden="true" className={styles.contactExternal} size={17} />
            </a>
            <a className={styles.contactCard} href="/therapyexample/card">
              <span className={styles.contactCardMark}><BrandMark className={styles.contactCardLogo} /></span>
              <span>
                <strong>Take the digital card with you</strong>
                <small>Save Mark&apos;s details or share them easily</small>
              </span>
              <ArrowRight aria-hidden="true" size={17} />
            </a>
            <p className={styles.contactSmall}>
              Please contact Mark before visiting to confirm arrangements.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <a className={styles.brandLockup} href="#top" aria-label="Kinesis Hypnotherapy home">
            <BrandMark className={styles.logoMark} />
            <span className={styles.brandName}>
              <strong>Kinesis</strong>
              <span>HYPNOTHERAPY</span>
            </span>
          </a>
          <p className={styles.footerThought}>A calmer way forward.</p>
          <a className={styles.footerCall} href={"tel:" + phoneNumber}>
            <Phone aria-hidden="true" size={15} /> {displayPhone}
          </a>
        </div>
        <div className={styles.footerBottom}>
          <p>
            Hypnotherapy is a complementary wellbeing approach and is not a
            substitute for medical advice or treatment.
          </p>
          <span>Website concept by <a href="/">WeDigitlize</a></span>
        </div>
      </footer>

      <div className={styles.mobileDock}>
        <a href={"tel:" + phoneNumber}>
          <Phone aria-hidden="true" size={17} />
          <span>Call Mark</span>
        </a>
        <a href="/therapyexample/card">
          <BrandMark className={styles.mobileDockMark} />
          <span>Digital card</span>
        </a>
      </div>
    </main>
  );
}

function ArrowDownRightIcon() {
  return <ArrowRight aria-hidden="true" size={16} className={styles.downloadArrow} />;
}
