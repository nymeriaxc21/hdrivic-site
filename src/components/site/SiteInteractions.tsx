"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mejoras progresivas (solo motion-safe), portadas del script de hdrivic-home.html:
 *  - Reveal al entrar en viewport ([data-reveal] -> .in)
 *  - Conteo animado de estadísticas ([data-count])
 *  - Botón "volver arriba" (#toTop) que aparece tras scroll
 */
export default function SiteInteractions() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---- Botón volver arriba ----
    const toTop = document.getElementById("toTop");
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (toTop) {
        const show = y > 600;
        toTop.classList.toggle("opacity-0", !show);
        toTop.classList.toggle("pointer-events-none", !show);
        toTop.classList.toggle("opacity-100", show);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const onToTop = () =>
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    toTop?.addEventListener("click", onToTop);

    // ---- Reveal ----
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    let io: IntersectionObserver | undefined;
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io?.unobserve(en.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
      );
      reveals.forEach((el) => io!.observe(el));
    }

    // ---- Conteo animado ----
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]")
    );
    const runCount = (el: HTMLElement) => {
      const target = parseFloat(el.getAttribute("data-count") || "0");
      const dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
      const pre = el.getAttribute("data-prefix") || "";
      const suf = el.getAttribute("data-suffix") || "";
      const dur = 1100;
      let start: number | null = null;
      const fmt = (v: number) => pre + v.toFixed(dec) + suf;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(step);
    };
    let cio: IntersectionObserver | undefined;
    if (!(reduce || !("IntersectionObserver" in window))) {
      cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              runCount(en.target as HTMLElement);
              cio?.unobserve(en.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => cio!.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      toTop?.removeEventListener("click", onToTop);
      io?.disconnect();
      cio?.disconnect();
    };
  }, [pathname]);

  return null;
}
