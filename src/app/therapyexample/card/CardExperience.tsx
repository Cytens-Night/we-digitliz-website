"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Mail,
  MapPin,
  Phone,
  QrCode,
  Share2,
} from "lucide-react";
import BrandMark from "../BrandMark";
import styles from "./card.module.css";

const phoneNumber = "+447956273562";
const displayPhone = "07956 273562";
const email = "mark.carnell@icloud.com";
const cardUrl = "https://wedigitlize.com/therapyexample/card";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=150A%20Huxley%20Road%2C%20Leyton%2C%20E10%205QY";

export default function CardExperience() {
  const [showQr, setShowQr] = useState(false);
  const [notice, setNotice] = useState("");

  async function shareCard() {
    const shareData = {
      title: "Mark Carnell · Kinesis Hypnotherapy",
      text: "Mark Carnell — personalised hypnotherapy and mindfulness in Leyton, London.",
      url: typeof window === "undefined" ? cardUrl : window.location.href,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        setNotice("Card shared.");
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setNotice("Card link copied. You can share it in a message.");
    } catch {
      setNotice("Open your browser menu to copy or share this card.");
    }
  }

  function saveContact() {
    const contact = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Carnell;Mark;;;",
      "FN:Mark Carnell",
      "ORG:Kinesis Hypnotherapy",
      "TITLE:Hypnotherapist",
      "TEL;TYPE=CELL,VOICE:+447956273562",
      "EMAIL;TYPE=INTERNET:mark.carnell@icloud.com",
      "ADR;TYPE=WORK:;;150A Huxley Road;Leyton;London;E10 5QY;United Kingdom",
      "URL:https://wedigitlize.com/therapyexample",
      "NOTE:Hypnotherapy and mindfulness support in Leyton, London.",
      "END:VCARD",
    ].join("\r\n");
    const file = new Blob([contact], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Mark-Carnell-Kinesis-Hypnotherapy.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Mark's contact file is ready to save.");
  }

  return (
    <main className={styles.cardPage} id="main-content">
      <div className={styles.conceptBar}>
        <span><i /> Digital business card concept</span>
        <span>Designed for Mark Carnell · Kinesis Hypnotherapy</span>
      </div>

      <header className={styles.header}>
        <a className={styles.brandLockup} href="/therapyexample">
          <BrandMark className={styles.headerMark} />
          <span>
            <strong>Kinesis</strong>
            <small>HYPNOTHERAPY</small>
          </span>
        </a>
        <a className={styles.backLink} href="/therapyexample">
          <ArrowLeft aria-hidden="true" size={15} />
          <span>Back to the website</span>
        </a>
      </header>

      <section aria-labelledby="card-title" className={styles.cardHero}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>
            <span />
            MARK CARNELL <i>·</i> LEYTON, LONDON
          </p>
          <h1 id="card-title">
            A simple way<br />
            to <em>connect.</em>
          </h1>
          <p className={styles.introLead}>
            A digital contact card with everything in one place. Call Mark,
            save his details, share the card or get directions.
          </p>

          <div className={styles.introActions}>
            <a className={styles.primaryAction} href={"tel:" + phoneNumber}>
              <Phone aria-hidden="true" size={16} />
              Call Mark
              <span>{displayPhone}</span>
            </a>
            <button className={styles.shareAction} onClick={shareCard} type="button">
              <Share2 aria-hidden="true" size={16} />
              Share the card
            </button>
          </div>

          <div className={styles.introFooter}>
            <span className={styles.introFooterMark}><BrandMark className={styles.introMark} /></span>
            <p>
              Personalised hypnotherapy<br />
              <span>Mindfulness · Self-care · Wellbeing</span>
            </p>
          </div>
        </div>

        <div className={styles.phoneStage}>
          <div aria-hidden="true" className={styles.stageOrbit} />
          <div aria-hidden="true" className={styles.stageOrbitInner} />
          <span className={styles.stageCaption}>KINESIS / CONTACT 01</span>
          <div className={styles.phoneSideKey} />
          <div className={styles.phoneShell}>
            <div className={styles.phoneRim}>
              <div className={styles.dynamicIsland}><i /><i /></div>
              <div className={styles.phoneScreen}>
                <div className={styles.statusBar}>
                  <span>9:41</span>
                  <span className={styles.statusSignals}><i /><i /><i /></span>
                </div>

                <div className={styles.screenHeader}>
                  <a className={styles.screenBrand} href="/therapyexample" aria-label="Kinesis Hypnotherapy website">
                    <BrandMark className={styles.screenMark} />
                    <span>KINESIS<br /><small>HYPNOTHERAPY</small></span>
                  </a>
                  <button
                    aria-label={showQr ? "Return to Mark's contact details" : "Show QR code"}
                    className={styles.qrToggle}
                    onClick={() => setShowQr((value) => !value)}
                    type="button"
                  >
                    {showQr ? <ArrowLeft aria-hidden="true" size={17} /> : <QrCode aria-hidden="true" size={17} />}
                  </button>
                </div>

                {showQr ? (
                  <div className={styles.qrScreen}>
                    <span className={styles.qrEyebrow}>SCAN TO CONNECT</span>
                    <div className={styles.qrCode}>
                      <QRCodeSVG
                        bgColor="#fffdf8"
                        fgColor="#263f38"
                        level="M"
                        size={172}
                        title="Scan to open Mark Carnell's digital contact card"
                        value={cardUrl}
                      />
                    </div>
                    <h2>Keep in touch.</h2>
                    <p>Scan to open Mark&apos;s digital card.</p>
                    <button className={styles.qrBack} onClick={() => setShowQr(false)} type="button">
                      Back to Mark&apos;s card <ArrowRight aria-hidden="true" size={14} />
                    </button>
                  </div>
                ) : (
                  <div className={styles.profileScreen}>
                    <div className={styles.profileHero}>
                      <div
                        aria-label="Portrait image from the current Kinesis Hypnotherapy website"
                        className={styles.profilePhoto}
                        role="img"
                      />
                      <span className={styles.profileHalo} />
                    </div>
                    <p className={styles.profileEyebrow}>HYPNOTHERAPIST</p>
                    <h2>Mark <em>Carnell</em></h2>
                    <p className={styles.profileLocation}>Leyton, London</p>
                    <a className={styles.phoneCall} href={"tel:" + phoneNumber}>
                      <Phone aria-hidden="true" size={16} />
                      Call Mark
                    </a>
                    <button className={styles.saveButton} onClick={saveContact} type="button">
                      <Download aria-hidden="true" size={15} />
                      Save contact
                    </button>
                    <div className={styles.phoneDetails}>
                      <a href={"mailto:" + email}>
                        <Mail aria-hidden="true" size={14} />
                        <span>Email</span>
                        <ArrowRight aria-hidden="true" size={13} />
                      </a>
                      <a href={mapUrl} rel="noreferrer" target="_blank">
                        <MapPin aria-hidden="true" size={14} />
                        <span>Directions</span>
                        <ArrowRight aria-hidden="true" size={13} />
                      </a>
                    </div>
                    <span className={styles.profileTagline}>Make space for a calmer way forward.</span>
                  </div>
                )}
              </div>
              <div aria-hidden="true" className={styles.phoneHomeIndicator} />
            </div>
          </div>
          <div className={styles.stageFoot}>
            <BrandMark className={styles.stageFootMark} />
            <span>CALM · CLARITY · CHANGE</span>
            <i />
          </div>
        </div>
      </section>

      <section aria-label="Contact actions" className={styles.actionSection}>
        <div className={styles.actionIntro}>
          <p>Everything you need, one tap away.</p>
          <span>Mark Carnell · Kinesis Hypnotherapy</span>
        </div>
        <div className={styles.actionGrid}>
          <a href={"tel:" + phoneNumber}>
            <span className={styles.actionIcon}><Phone aria-hidden="true" size={17} /></span>
            <span><strong>Call Mark</strong><small>{displayPhone}</small></span>
            <ArrowRight aria-hidden="true" size={15} />
          </a>
          <button onClick={saveContact} type="button">
            <span className={styles.actionIcon}><Download aria-hidden="true" size={17} /></span>
            <span><strong>Save contact</strong><small>Add to your address book</small></span>
            <ArrowRight aria-hidden="true" size={15} />
          </button>
          <a href={"mailto:" + email}>
            <span className={styles.actionIcon}><Mail aria-hidden="true" size={17} /></span>
            <span><strong>Send an email</strong><small>{email}</small></span>
            <ArrowRight aria-hidden="true" size={15} />
          </a>
          <a href={mapUrl} rel="noreferrer" target="_blank">
            <span className={styles.actionIcon}><MapPin aria-hidden="true" size={17} /></span>
            <span><strong>View location</strong><small>Leyton, London</small></span>
            <ArrowRight aria-hidden="true" size={15} />
          </a>
        </div>
        <div aria-live="polite" className={styles.notice} role="status">
          {notice && (
            <>
              <Check aria-hidden="true" size={15} />
              <span>{notice}</span>
            </>
          )}
        </div>
      </section>

      <footer className={styles.footer}>
        <a className={styles.footerBrand} href="/therapyexample">
          <BrandMark className={styles.footerMark} />
          <span><strong>Kinesis</strong><small>HYPNOTHERAPY</small></span>
        </a>
        <p>Digital business card concept by <a href="/">WeDigitlize</a></p>
        <a className={styles.footerPhone} href={"tel:" + phoneNumber}>
          <Phone aria-hidden="true" size={14} /> {displayPhone}
        </a>
      </footer>

      <div className={styles.mobileBar}>
        <a href={"tel:" + phoneNumber}><Phone aria-hidden="true" size={16} /> Call Mark</a>
        <button onClick={saveContact} type="button"><Download aria-hidden="true" size={16} /> Save contact</button>
      </div>
    </main>
  );
}
