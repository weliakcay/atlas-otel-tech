"use client";

import { useMemo, useState } from "react";
import styles from "./AiReadinessCheck.module.css";

type QuestionAnswer = "evet" | "hayir" | "";

const QUESTIONS = [
  {
    id: "schemaHotel",
    text: "Otel sayfalarınızda schema.org/Hotel işaretlemesi var mı?",
  },
  {
    id: "roomJsonLd",
    text: "Oda tipleri JSON-LD ile tanımlı mı?",
  },
  {
    id: "cwv",
    text: "Core Web Vitals (LCP, CLS, INP) yeşil bölgede mi?",
  },
  {
    id: "hreflang",
    text: "Çok dilli sayfalarda hreflang etiketleri doğru mu?",
  },
  {
    id: "whatsapp",
    text: "WhatsApp/wa.me kısa yol ve tel: linkleri mevcut mu?",
  },
  {
    id: "prices",
    text: "Fiyat verisi makinece çıkarılabilir bloklarda mı (tablo/list)?",
  },
  {
    id: "faq",
    text: "SSS bölümü var ve FAQPage şemasıyla işaretli mi?",
  },
  {
    id: "forms",
    text: "Formlar (iletişim/teklif) spam korumalı ve zorunlu KVKK onaylı mı?",
  },
];

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export function AiReadinessCheck() {
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>(
    () =>
      QUESTIONS.reduce(
        (acc, question) => {
          acc[question.id] = "";
          return acc;
        },
        {} as Record<string, QuestionAnswer>,
      ),
  );
  const [score, setScore] = useState<number | null>(null);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [message, setMessage] = useState("");

  const resultMessage = useMemo(() => {
    if (score === null) {
      return "";
    }
    if (score <= 3) {
      return "Kritik uyumsuzluklar var. Core ile 7 günde temelinizi kuralım.";
    }
    if (score <= 6) {
      return "Yaklaştınız. Proof ile fiyat/yorum + SEO işaretlemeleri ekleyelim.";
    }
    return "Harika. Direct ile online ödeme/rezervasyona geçelim.";
  }, [score]);

  const handleAnswerChange = (questionId: string, value: QuestionAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const missingAnswer = QUESTIONS.some((question) => !formData.get(question.id));
    if (missingAnswer) {
      setMessage("Lütfen tüm soruları cevaplayın.");
      return;
    }

    const payload = {
      fullName: formData.get("fullName"),
      hotelName: formData.get("hotelName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      website: formData.get("website"),
      preferredPackage: formData.get("preferredPackage"),
      answers: QUESTIONS.map((question) => ({
        question: question.text,
        answer: formData.get(question.id),
      })),
    };

    const computedScore = payload.answers.filter(
      (answer) => answer.answer === "evet",
    ).length;

    setScore(computedScore);
    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "ai-readiness-check",
          score: computedScore,
        }),
      });

      if (!response.ok) {
        throw new Error("Gönderim başarısız");
      }

      setStatus("success");
      setMessage("Raporunuz e-posta ile paylaşıldı. Teşekkürler!");
      event.currentTarget.reset();
      setAnswers(
        QUESTIONS.reduce(
          (acc, question) => {
            acc[question.id] = "";
            return acc;
          },
          {} as Record<string, QuestionAnswer>,
        ),
      );
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Beklenmeyen bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setScore(null);
    setMessage("");
  };

  return (
    <section id="ai-check" className={styles.section} aria-labelledby="ai-check-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>AI-Uyum Check</span>
          <h2 id="ai-check-heading">8 kısa soruyla sitenizin AI’ye hazır olup olmadığını görün.</h2>
          <p>
            AI entegrasyonları veriyi sever. Siteniz hazır mı? Sonucu e-postanıza gönderelim ve
            uzmanlarımız değerlendirsin.
          </p>
        </header>
        {status === "success" ? (
          <div className={styles.successState} role="status" aria-live="polite">
            <h3>Teşekkürler! Skorunuz: {score} / 8</h3>
            <p>{resultMessage}</p>
            <div className={styles.successActions}>
              <a className={styles.primaryCta} href="https://wa.me/905312223344" target="_blank">
                WhatsApp’tan görüşelim
              </a>
              <a className={styles.secondaryCta} href="#demo-form">
                Demo planlayın
              </a>
              <button type="button" onClick={handleReset} className={styles.resetButton}>
                Yeniden değerlendirin
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} aria-describedby="ai-form-message">
            <div className={styles.questions}>
              {QUESTIONS.map((question, index) => (
                <fieldset key={question.id} className={styles.fieldset}>
                  <legend>
                    <span className={styles.questionIndex}>{index + 1}</span>
                    {question.text}
                  </legend>
                  <div className={styles.options}>
                    <label>
                      <input
                        type="radio"
                        name={question.id}
                        value="evet"
                        required
                        checked={answers[question.id] === "evet"}
                        onChange={() => handleAnswerChange(question.id, "evet")}
                      />
                      <span>Evet</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={question.id}
                        value="hayir"
                        checked={answers[question.id] === "hayir"}
                        onChange={() => handleAnswerChange(question.id, "hayir")}
                      />
                      <span>Hayır</span>
                    </label>
                  </div>
                </fieldset>
              ))}
            </div>
            <div className={styles.leadFields}>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName">Ad Soyad *</label>
                <input id="fullName" name="fullName" type="text" required autoComplete="name" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="hotelName">Otel Adı *</label>
                <input id="hotelName" name="hotelName" type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">E-posta *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Telefon *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="website">Mevcut Site URL</label>
                <input id="website" name="website" type="url" placeholder="https://siteniz.com" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="preferredPackage">Tercih Edilen Paket *</label>
                <select id="preferredPackage" name="preferredPackage" required defaultValue="core">
                  <option value="core">Core</option>
                  <option value="proof">Proof</option>
                  <option value="direct">Direct</option>
                </select>
              </div>
            </div>
            <div className={styles.actions}>
              <label className={styles.checkbox}>
                <input type="checkbox" name="kvkk" required />
                <span>
                  KVKK onayını kabul ediyorum.{" "}
                  <a href="/kvkk" target="_blank" rel="noreferrer">
                    KVKK Aydınlatma Metni
                  </a>
                </span>
              </label>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Gönderiliyor..." : "Raporu E-postama Gönder"}
              </button>
            </div>
            {message && (
              <p id="ai-form-message" className={styles.formMessage} role="status">
                {message}
              </p>
            )}
          </form>
        )}
        {score !== null && status !== "success" && (
          <div className={styles.resultPreview} role="status" aria-live="polite">
            <p>
              Şu anki skorunuz: <strong>{score}</strong> / 8
            </p>
            <p>{resultMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}
