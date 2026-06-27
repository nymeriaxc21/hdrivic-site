"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mejoras progresivas (motion-safe):
 *  - Reveal escalonado al entrar en viewport ([data-reveal] -> .in, stagger por [data-stagger])
 *  - Barra de progreso de scroll (#scrollProgress)
 *  - Parallax suave ([data-parallax])
 *  - Spotlight que sigue al cursor (.spotlight -> --mx/--my)
 *  - Conteo animado de estadísticas ([data-count])
 *  - Botón "volver arriba" (#toTop)
 */
export default function SiteInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hoverCapable = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const cleanups: Array<() => void> = [];

    /* ---- Scroll: progreso + volver-arriba + parallax (un solo rAF) ---- */
    const progress = document.getElementById("scrollProgress");
    const toTop = document.getElementById("toTop");
    const parallaxEls = reduce
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    let ticking = false;
    const render = () => {
      ticking = false;
      const y = window.scrollY || 0;
      if (progress) {
        const docH =
          document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${
          docH > 0 ? Math.min(y / docH, 1) : 0
        })`;
      }
      if (toTop) {
        const show = y > 600;
        toTop.classList.toggle("opacity-0", !show);
        toTop.classList.toggle("pointer-events-none", !show);
        toTop.classList.toggle("opacity-100", show);
      }
      for (const el of parallaxEls) {
        const sp = parseFloat(el.dataset.parallax || "0.15");
        el.style.transform = `translate3d(0, ${(y * sp).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    render();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    const onToTop = () =>
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    toTop?.addEventListener("click", onToTop);
    cleanups.push(() => toTop?.removeEventListener("click", onToTop));

    /* ---- Stagger: asigna --reveal-delay a hijos [data-reveal] ---- */
    if (!reduce) {
      document
        .querySelectorAll<HTMLElement>("[data-stagger]")
        .forEach((group) => {
          const step = parseInt(group.dataset.stagger || "70", 10);
          group
            .querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach((el, i) => {
              el.style.setProperty("--reveal-delay", `${i * step}ms`);
            });
        });
    }

    /* ---- Reveal ---- */
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
    cleanups.push(() => io?.disconnect());

    /* ---- Conteo animado ---- */
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]")
    );
    const fmtOf = (el: HTMLElement) => {
      const dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
      const pre = el.getAttribute("data-prefix") || "";
      const suf = el.getAttribute("data-suffix") || "";
      return (v: number) => pre + v.toFixed(dec) + suf;
    };
    const runCount = (el: HTMLElement) => {
      const target = parseFloat(el.getAttribute("data-count") || "0");
      const fmt = fmtOf(el);
      const dur = 1200;
      let start: number | null = null;
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
    if (reduce || !("IntersectionObserver" in window)) {
      counters.forEach((el) =>
        el.textContent = fmtOf(el)(parseFloat(el.getAttribute("data-count") || "0"))
      );
    } else {
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
    cleanups.push(() => cio?.disconnect());

    /* ---- Spotlight (solo en dispositivos con cursor) ---- */
    if (hoverCapable && !reduce) {
      Array.from(document.querySelectorAll<HTMLElement>(".spotlight")).forEach(
        (el) => {
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            el.style.setProperty(
              "--mx",
              `${((e.clientX - r.left) / r.width) * 100}%`
            );
            el.style.setProperty(
              "--my",
              `${((e.clientY - r.top) / r.height) * 100}%`
            );
          };
          el.addEventListener("pointermove", move);
          cleanups.push(() => el.removeEventListener("pointermove", move));
        }
      );
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
