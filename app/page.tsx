"use client";

import { useState } from "react";

const whatsappUrl =
  "https://wa.me/34666277388?text=Hola%20Daniela%2C%20me%20gustar%C3%ADa%20conocerte";

const gallery = [
  {
    src: "/images/daniela-01.jpeg",
    alt: "Daniela con sombrero y botas altas negras",
    className: "gallery-tall gallery-featured",
  },
  {
    src: "/images/daniela-02.jpeg",
    alt: "Retrato cercano de Daniela",
    className: "gallery-tall",
  },
  {
    src: "/images/daniela-03.jpeg",
    alt: "Daniela con conjunto azul",
    className: "gallery-tall",
  },
  {
    src: "/images/daniela-04.jpeg",
    alt: "Daniela en una escena editorial roja",
    className: "gallery-tall",
  },
  {
    src: "/images/daniela-05.jpeg",
    alt: "Daniela en una pose editorial con botas negras",
    className: "gallery-wide",
  },
  {
    src: "/images/daniela-06.jpeg",
    alt: "Daniela con conjunto azul y gafas",
    className: "gallery-tall",
  },
  {
    src: "/images/daniela-07.jpeg",
    alt: "Daniela en una pose relajada",
    className: "gallery-wide",
  },
  {
    src: "/images/daniela-08.jpeg",
    alt: "Daniela con conjunto rojo y cabello largo",
    className: "gallery-tall",
  },
  {
    src: "/images/daniela-09.jpeg",
    alt: "Daniela en una escena con osito de peluche",
    className: "gallery-tall",
  },
];

export default function Home() {
  const [isAdult, setIsAdult] = useState(false);

  if (!isAdult) {
    return (
      <main className="age-gate">
        <div className="age-gate__glow" />
        <div className="age-gate__content">
          <p className="eyebrow">Daniela Gómez · Escort trans</p>
          <div className="age-gate__mark">DG</div>
          <h1>Un espacio para adultos.</h1>
          <p>
            Este sitio contiene imágenes de carácter sensual. Confirma que eres
            mayor de 18 años para continuar.
          </p>
          <button className="button button--light" onClick={() => setIsAdult(true)}>
            Tengo más de 18 años <span>↗</span>
          </button>
          <small>Al entrar aceptas navegar con discreción y respeto.</small>
        </div>
      </main>
    );
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Daniela Gómez, inicio">
          <span className="wordmark__monogram">DG</span>
          <span>
            Daniela <em>Gómez</em>
          </span>
        </a>
        <nav className="site-nav" aria-label="Navegación principal">
          <a href="#experiencia">Experiencia</a>
          <a href="#galeria">Galería</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          WhatsApp <span>↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero__copy">
            <p className="eyebrow">Escort trans · 29 años · Presencia y discreción</p>
            <h1>
              Una presencia
              <span>que se recuerda.</span>
            </h1>
            <p className="hero__intro">
              Soy Daniela, escort trans de 29 años. Creo encuentros con
              química, conversación y una atención cuidada de principio a fin.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                <span className="button__dot" /> Escribir por WhatsApp
              </a>
              <a className="text-link" href="#galeria">
                Ver galería <span>↓</span>
              </a>
            </div>
            <div className="hero__note">
              <span className="status-dot" /> Disponible para citas privadas y eventos
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__frame hero__frame--back" />
            <figure className="hero__image-wrap">
              <img
                src="/images/daniela-06.jpeg"
                alt="Daniela con un conjunto azul y gafas"
                className="hero__image"
              />
            </figure>
            <div className="hero__caption">
              <span>01</span>
              <span className="caption-line" />
              <span>Daniela Gómez</span>
            </div>
            <div className="hero__stamp">DG<br /><span>encuentros<br />con intención</span></div>
          </div>
        </section>

        <section className="intro-section section-grid" id="experiencia">
          <div className="section-kicker">
            <span>01</span>
            <span className="section-kicker__line" />
            <span>La experiencia</span>
          </div>
          <div className="intro-section__content">
            <p className="eyebrow">Más que una cita</p>
            <h2>El lujo está en cómo te hago sentir.</h2>
            <p>
              Como escort trans, cada encuentro se construye con tiempo,
              complicidad y atención a los detalles. Una conversación que
              fluye, una energía natural y la tranquilidad de estar en buenas
              manos. Estoy dispuesta a explorar todo tipo de fetiches, siempre
              desde el respeto, la comunicación y el consentimiento.
            </p>
            <div className="values-list">
              <div><span>01</span><strong>Presencia auténtica</strong><p>Conexión sin guiones ni prisas.</p></div>
              <div><span>02</span><strong>Discreción absoluta</strong><p>Tu privacidad es parte de la experiencia.</p></div>
              <div><span>03</span><strong>Acuerdos claros</strong><p>Respeto y consentimiento en todo momento.</p></div>
              <div><span>04</span><strong>Límites definidos</strong><p>Siempre con preservativo. No realizo servicios sin preservativo ni beso negro.</p></div>
              <div><span>05</span><strong>Copas incluidas</strong><p>El servicio incluye copas o bebidas para el cliente.</p></div>
            </div>
          </div>
        </section>

        <section className="quote-band">
          <p>“La elegancia no es llamar la atención, es quedarse en la memoria.”</p>
          <span>— Giorgio Armani</span>
        </section>

        <section className="gallery-section" id="galeria">
          <div className="gallery-heading section-grid">
            <div className="section-kicker">
              <span>02</span>
              <span className="section-kicker__line" />
              <span>Galería privada</span>
            </div>
            <div>
              <p className="eyebrow">Una mirada más cerca</p>
              <h2>Sin filtros.<br /><em>Solo actitud.</em></h2>
            </div>
          </div>
          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <figure className={`gallery-card ${image.className}`} key={image.src}>
                <img src={image.src} alt={image.alt} loading={index > 2 ? "lazy" : "eager"} />
                <figcaption>Daniela · {String(index + 1).padStart(2, "0")}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="contact-section__halo" />
          <div className="section-kicker">
            <span>03</span>
            <span className="section-kicker__line" />
            <span>Contacto</span>
          </div>
          <div className="contact-section__content">
            <p className="eyebrow">Hablemos en privado</p>
            <h2>Tu próxima<br /><em>historia empieza aquí.</em></h2>
            <p>Escríbeme para consultar disponibilidad y detalles de tu encuentro.</p>
            <a className="button button--primary button--large" href={whatsappUrl} target="_blank" rel="noreferrer">
              <span className="button__dot" /> Contactar por WhatsApp
            </a>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/danielagomez2687/#" target="_blank" rel="noreferrer">
              <span>Instagram</span><strong>@danielagomez2687</strong><span>↗</span>
            </a>
            <a href="https://www.tiktok.com/@user952060374" target="_blank" rel="noreferrer">
              <span>TikTok</span><strong>@user952060374</strong><span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Daniela Gómez</span>
        <span>Solo para mayores de 18 años</span>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </div>
  );
}
