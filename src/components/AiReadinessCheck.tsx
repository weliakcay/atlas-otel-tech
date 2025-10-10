"use client";

import { useMemo, useState } from "react";
import styles from "./AiReadinessCheck.module.css";

type QuestionAnswer = "evet" | "hayir" | "";

type Question = {
  id: string;
  text: string;
  importance: string;
};

const QUESTIONS: Question[] = [
  {
    id: "serp",
    text: "Google’da otel adınızı aradığınızda resmi web siteniz ilk sırada çıkıyor mu?",
    importance:
      "Arama motoru görünürlüğü, yapay zekâ aramalarının temelidir. İlk sayfada yoksanız, AI tabanlı sonuçlarda da görünmezsiniz.",
  },
  {
    id: "roomListing",
    text:
      "Sitenizde oda tipleri fiyat, fotoğraf, açıklama ve müsaitlik bilgisiyle açıkça listelenmiş mi?",
    importance:
      "AI sistemleri verileri okunabilir formatta ister. Bilgiler PDF veya görselde ise algoritmalar analiz edemez.",
  },
  {
    id: "speed",
    text: "Ziyaretçiler siteyi telefon veya tablette açtığında sayfa 3 saniyeden kısa sürede yükleniyor mu?",
    importance:
      "Hızlı siteler hem sıralamada öne çıkar hem de AI sistemlerine doğru kullanıcı verisi sağlar.",
  },
  {
    id: "multilingual",
    text: "Sayfanız İngilizce, Almanca, Rusça veya başka dillerde de otomatik olarak görüntülenebiliyor mu?",
    importance:
      "Çok dilli içerik, yapay zekânın global misafir davranışlarını öğrenmesini sağlar; tek dil görünürlüğünüzü sınırlar.",
  },
  {
    id: "messaging",
    text:
      "Ziyaretçiler tek dokunuşla sizi arayabiliyor, WhatsApp veya online asistan aracılığıyla mesaj gönderebiliyor mu?",
    importance:
      "Her çağrı ve mesaj AI için bir öğrenme verisidir. Kolay iletişim yoksa veri akışı da durur.",
  },
  {
    id: "campaigns",
    text: "Güncel kampanyalar, özel fiyatlar veya son dakika fırsatları düzenli olarak paylaşılabiliyor mu?",
    importance:
      "Dinamik içerikler SEO’yu güçlendirir; AI rezervasyon motorları da sizi aktif işletme olarak etiketler.",
  },
  {
    id: "faq",
    text:
      "Misafirlerin en çok sorduğu sorular (check-in, otopark, evcil hayvan politikası vb.) sitenizde listelenmiş mi?",
    importance:
      "Bu bilgiler HotelAI Assistant gibi sistemlerin eğitim setidir; eksikler gelecekteki AI iletişiminde boşluk yaratır.",
  },
  {
    id: "kvkk",
    text:
      "İletişim formunuz KVKK onayı, otomatik yanıt ve veri kaydı/analiz sistemiyle entegre mi?",
    importance:
      "Yapay zekâ optimizasyonu izinli ve analiz edilebilir verilerle çalışır. Bu yapı yoksa davranış analizi mümkün olmaz.",
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

    const emailEntry = formData.get("email");
    if (!emailEntry || (typeof emailEntry === "string" && emailEntry.trim() === "")) {
      setMessage("Lütfen raporu gönderebilmemiz için e-posta adresinizi yazın.");
      return;
    }

    const email = typeof emailEntry === "string" ? emailEntry.trim() : emailEntry.toString();

    const payload = {
      email,
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

      const result = (await response.json().catch(() => null)) as
        | { status?: string; message?: string }
        | null;

      if (!response.ok || (result?.status && result.status !== "ok")) {
        throw new Error(result?.message ?? "Gönderim başarısız");
      }

      setStatus("success");
      setMessage(result?.message ?? "Analiziniz kısa süre içinde mail adresinize gönderilecektir.");
      window.setTimeout(() => {
        event.currentTarget.reset();
      }, 0);
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
      const errorMessage =
        error instanceof Error && error.message
          ? error.message
          : "Beklenmeyen bir hata oluştu, lütfen tekrar deneyin.";
      setMessage(errorMessage);
      setStatus("error");
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
          <h2 id="ai-check-heading">Siteniz Yapay Zekâ Çağına Hazır mı?</h2>
          <p>AI entegrasyonları veriyi sever. Siteniz bu verileri gerçekten kullanabiliyor mu?</p>
          <p>
            8 kısa soruyla öğrenin — sonucu e-postanıza gönderelim, uzmanlarımız ücretsiz analiz etsin.
          </p>
        </header>
        {status === "success" ? (
          <div className={styles.successState} role="status" aria-live="polite">
            <h3>Teşekkürler! Skorunuz: {score} / 8</h3>
            <p>{resultMessage}</p>
            <div className={styles.successActions}>
              <a className={styles.primaryCta} href="https://wa.me/00905549001093" target="_blank">
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
                  <p className={styles.importance}>
                    <strong>Neden önemli:</strong> {question.importance}
                  </p>
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
            <div className={styles.emailCapture}>
              <label htmlFor="ai-email">E-posta *</label>
              <input
                id="ai-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="ornek@oteliniz.com"
              />
              <p className={styles.emailHint}>
                Raporu ücretsiz analizle birlikte bu adrese gönderiyoruz. Spam klasörünü kontrol etmeyi unutmayın.
              </p>
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
