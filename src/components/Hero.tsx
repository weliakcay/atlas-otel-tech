"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

const TRUST_ITEMS = [
  { label: "Otel & restoranlar için uçtan uca operasyon yönetimi" },
  { label: "Donanım + yazılım + eğitim tek pakette" },
  { label: "AI destekli misafir iletişimi ve satış artırma" },
  { label: "Antalya ve çevresinde yerinde kurulum & destek" },
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Wave parameters
    const waves = [
      { amplitude: 30, frequency: 0.015, speed: 0.3, color: "rgba(243, 156, 18, 0.08)" },
      { amplitude: 25, frequency: 0.02, speed: 0.5, color: "rgba(23, 162, 184, 0.12)" },
      { amplitude: 20, frequency: 0.025, speed: 0.4, color: "rgba(10, 61, 98, 0.08)" },
    ];

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flowing waves
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 5) {
          const mouseInfluence = Math.exp(
            -Math.pow((x - mouseX) / 200, 2) - Math.pow((canvas.height * 0.6 - mouseY) / 200, 2)
          );
          const y =
            canvas.height * 0.6 +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            mouseInfluence * 30;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, canvas.height * 0.4, 0, canvas.height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, wave.color.replace(/[\d.]+\)/, "0.02)"));

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add wave outline
        ctx.strokeStyle = wave.color.replace(/[\d.]+\)/, "0.2)");
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw floating particles
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        const x = (canvas.width / particleCount) * i + (Math.sin(time + i) * 50);
        const y = canvas.height * 0.3 + Math.cos(time * 0.5 + i * 0.5) * 60;
        const size = 3 + Math.sin(time + i) * 2;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(23, 162, 184, 0.15)";
        ctx.fill();
      }

      // Draw gradient orbs with mouse interaction
      const orbs = [
        { x: 0.15, y: 0.25, radius: 100, color: [243, 156, 18] },
        { x: 0.75, y: 0.4, radius: 140, color: [23, 162, 184] },
        { x: 0.5, y: 0.7, radius: 80, color: [10, 61, 98] },
      ];

      orbs.forEach((orb) => {
        const baseX = canvas.width * orb.x;
        const baseY = canvas.height * orb.y;

        const dx = (mouseX - baseX) * 0.03;
        const dy = (mouseY - baseY) * 0.03;

        const finalX = baseX + dx + Math.sin(time * 0.5) * 15;
        const finalY = baseY + dy + Math.cos(time * 0.7) * 15;

        const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, orb.radius);
        gradient.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.08)`);
        gradient.addColorStop(1, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0)`);

        ctx.beginPath();
        ctx.arc(finalX, finalY, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.interactiveBackground} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.tagline}>Antalya PlusPOS Resmi İş Ortağı</p>
          <h1>Otel ve restoran operasyonlarınızı tek ekosistemde yönetin</h1>
          <p className={styles.subtitle}>
            PlusPOS + Atlas Otel Tech işbirliğiyle; kasa, stok, sipariş, kanal entegrasyonları,
            QR menü, raporlama ve misafir iletişimi tek merkezden.
          </p>
          <div className={styles.ctas}>
            <a className={styles.primaryCta} href="#demo-form">
              PlusPOS Demo Talep Et
            </a>
            <a className={styles.secondaryCta} href="#digital-solutions">
              AI Concierge Çözümlerini Keşfet
            </a>
          </div>
          <p className={styles.microcopy}>
            Operasyondan satışa, tek platform çözümü.
          </p>
          <ul className={styles.trustList}>
            {TRUST_ITEMS.map((item) => (
              <li key={item.label}>
                <span className={styles.trustIcon} aria-hidden="true">
                  ✓
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.visualWrapper}>
          <Image
            src="/pluspos-mac-screen.png"
            alt="PlusPOS Ekran Görünümü"
            width={800}
            height={600}
            priority
            className={styles.plusposImage}
          />
        </div>
      </div>
    </section>
  );
}
