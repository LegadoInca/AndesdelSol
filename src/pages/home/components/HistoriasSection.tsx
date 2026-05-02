import { useState } from "react";
import { useTranslation } from "react-i18next";

interface RegionStory {
  id: string;
  name: string;
  group: string;
  families: number;
  x: number;
  y: number;
  people: {
    title: string;
    subtitle: string;
    image: string;
    tag: string;
  }[];
}

const regions: RegionStory[] = [
  {
    id: "puno",
    name: "Puno",
    group: "Las Tejedoras",
    families: 9,
    x: 52,
    y: 68,
    people: [
      {
        title: "El telar de María",
        subtitle: "María sobrevivió al conflicto armado y crió sola a sus 4 hijos. Hoy lidera un taller de tejedoras en las alturas de Ayacucho.",
        tag: "Artesana",
        image: "/AndesdelSol/images/mujer1.jpeg",
      },
      {
        title: "Los hijos de María",
        subtitle: "Sus 4 hijos crecieron viendo telares. Hoy todos saben tejer y la mayor aprendió a vender en línea las piezas de su madre.",
        tag: "Su familia",
        image: "/AndesdelSol/images/familia1.jpeg",
      },
    ],
  },
  {
    id: "ayacucho",
    name: "Ayacucho",
    group: "Las Alfareras",
    families: 12,
    x: 46,
    y: 57,
    people: [
      {
        title: "Las manos de Rosa",
        subtitle: "Rosa aprendió cerámica observando ruinas preincaicas cerca de su pueblo a 3,800 metros. Hoy enseña a 20 mujeres de su comunidad en Puno.",
        tag: "Artesana",
        image: "/AndesdelSol/images/mujer2.jpeg",
      },
      {
        title: "Las hijas de Rosa",
        subtitle: "Sus 6 hijos crecieron entre arcilla y hornos. Las dos menores ya pintan piezas que se venden en ferias de Praga y Berlín.",
        tag: "Su familia",
        image: "/AndesdelSol/images/familia2.jpeg",
      },
    ],
  },
  {
    id: "cusco",
    name: "Cusco",
    group: "Semilla Nueva",
    families: 8,
    x: 44,
    y: 50,
    people: [
      {
        title: "La voz de Lucía",
        subtitle: "Lucía sufrió violencia doméstica durante 12 años. El bordado le devolvió la independencia. Hoy dirige una cooperativa de 15 mujeres en el Valle Sagrado.",
        tag: "Artesana",
        image: "/AndesdelSol/images/mujer3.jpeg",
      },
      {
        title: "La cooperativa de Lucía",
        subtitle: "Las 15 mujeres de su cooperativa son sobrevivientes igual que ella. Bordan juntas cada sábado en el Valle Sagrado de los Incas.",
        tag: "Su familia",
        image: "/AndesdelSol/images/familia3.jpeg",
      },
    ],
  },
  {
    id: "sanmartin",
    name: "Apurímac",
    group: "Los Guardianes",
    families: 15,
    x: 50,
    y: 36,
    people: [
      {
        title: "El telar de Elena",
        subtitle: "Elena no terminó la escuela. A los 40 años aprendió a leer mientras criaba a sus 3 hijos. Sus tejidos de alpaca hoy viajan a Berlín y Praga.",
        tag: "Artesana",
        image: "/AndesdelSol/images/mujer4.jpeg",
      },
      {
        title: "La familia de Elena",
        subtitle: "Sus 3 hijos pudieron terminar sus estudios gracias a sus tejidos. La menor estudia diseño textil en Cusco para continuar el legado.",
        tag: "Su familia",
        image: "/AndesdelSol/images/familia1.jpeg",
      },
    ],
  },
  {
    id: "huancavelica",
    name: "Huancavelica",
    group: "Raíces del Río",
    families: 6,
    x: 58,
    y: 52,
    people: [
      {
        title: "La cestería de Carmen",
        subtitle: "Carmen perdió su hogar en un deslizamiento de tierra en 2010. Reconstruyó su vida tejiendo cestas con fibras naturales que aprendió de su madre.",
        tag: "Artesana",
        image: "/AndesdelSol/images/mujer5.jpeg",
      },
      {
        title: "El taller de Carmen",
        subtitle: "Su taller en Huancavelica acoge a otras mujeres que perdieron todo en desastres naturales. Tejen cestas que llegan a tiendas en Lima y Europa.",
        tag: "Su familia",
        image: "/AndesdelSol/images/familia2.jpeg",
      },
    ],
  },
];

function PeruMapImage({
  regions: regs,
  activeId,
  onSelect,
  popupRegion,
  activePersonIdx,
  onPersonChange,
  familiesLabel,
}: {
  regions: RegionStory[];
  activeId: string | null;
  onSelect: (id: string) => void;
  popupRegion: RegionStory | null;
  activePersonIdx: number;
  onPersonChange: (idx: number) => void;
  familiesLabel: string;
}) {
  const activePerson = popupRegion ? popupRegion.people[activePersonIdx] : null;

  return (
    <div className="relative w-full h-full">
      {/* Peru map image — warm silhouette */}
      <img
        src="/AndesdelSol/images/mapa.png"
        alt="Mapa del Perú"
        className="w-full h-full object-contain"
        style={{
          objectPosition: "70% center",
          filter: "drop-shadow(0 20px 56px rgba(193,122,92,0.45)) brightness(1.08)",
        }}
      />

      {/* Interactive dots */}
      {regs.map((r) => {
        const isActive = activeId === r.id;
        return (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            className="absolute cursor-pointer"
            style={{
              left: `${r.x}%`,
              top: `${r.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
            title={r.name}
          >
            {/* Pulse rings */}
            {isActive && (
              <>
                <span
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: "-10px",
                    background: "rgba(193,122,92,0.2)",
                    animation: "mapPulse 1.8s ease-out infinite",
                  }}
                />
                <span
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: "-5px",
                    background: "rgba(193,122,92,0.3)",
                    animation: "mapPulse 1.8s ease-out 0.4s infinite",
                  }}
                />
              </>
            )}
            {/* Dot */}
            <span
              className="relative flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: isActive ? "20px" : "14px",
                height: isActive ? "20px" : "14px",
                background: isActive ? "#C17A5C" : "rgba(193,122,92,0.8)",
                border: isActive ? "2.5px solid #F5C87A" : "2px solid rgba(245,200,120,0.6)",
                boxShadow: isActive ? "0 0 16px rgba(193,122,92,0.8)" : "0 0 6px rgba(193,122,92,0.4)",
              }}
            >
              {isActive && (
                <span className="rounded-full" style={{ width: "7px", height: "7px", background: "#FFFDF9" }} />
              )}
            </span>
            {/* Name label always visible */}
            <span
              className="absolute left-1/2 whitespace-nowrap px-2 py-0.5 rounded-full pointer-events-none transition-all duration-200"
              style={{
                top: "calc(100% + 5px)",
                transform: "translateX(-50%)",
                background: isActive ? "rgba(193,122,92,0.95)" : "rgba(26,14,8,0.80)",
                color: isActive ? "#FFFDF9" : "rgba(245,230,211,0.8)",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "11px",
                fontWeight: 600,
                border: isActive ? "1px solid rgba(245,200,120,0.5)" : "1px solid rgba(193,122,92,0.25)",
              }}
            >
              {r.name}
            </span>
          </button>
        );
      })}

      {/* Popup cards — one per region, anchored to its dot position on the map */}
      {regs.map((r) => {
        if (activeId !== r.id || !activePerson || popupRegion?.id !== r.id) return null;

        // Decide if card should open upward or downward based on dot Y position
        const openUp = r.y > 55;
        // Decide if card should open left or right based on dot X position
        const openLeft = r.x > 55;

        return (
          <div
            key={`popup-${r.id}`}
            className="absolute rounded-2xl overflow-hidden pointer-events-auto"
            style={{
              left: openLeft ? "auto" : `${r.x}%`,
              right: openLeft ? `${100 - r.x}%` : "auto",
              top: openUp ? "auto" : `${r.y}%`,
              bottom: openUp ? `${100 - r.y}%` : "auto",
              transform: openLeft
                ? openUp ? "translate(10px, -8px)" : "translate(10px, 8px)"
                : openUp ? "translate(-10px, -8px)" : "translate(-10px, 8px)",
              width: "210px",
              zIndex: 30,
              background: "rgba(16,8,3,0.97)",
              border: "1px solid rgba(193,122,92,0.45)",
              backdropFilter: "blur(20px)",
              animation: "fadePopup 0.30s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px rgba(193,122,92,0.15)",
            }}
          >
            {/* Connector line from dot to card */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "2px",
                height: "20px",
                background: "linear-gradient(to bottom, rgba(193,122,92,0.8), rgba(193,122,92,0))",
                [openUp ? "bottom" : "top"]: "100%",
                [openLeft ? "right" : "left"]: "20px",
              }}
            />

            {/* Photo — big, top */}
            <div className="relative w-full overflow-hidden" style={{ height: "130px" }}>
              <img
                src={activePerson.image}
                alt={activePerson.title}
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient overlay bottom */}
              <div
                className="absolute inset-x-0 bottom-0"
                style={{ height: "55px", background: "linear-gradient(to top, rgba(16,8,3,0.98), transparent)" }}
              />
              {/* Tag badge */}
              <span
                className="absolute top-2 left-2 px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: "rgba(193,122,92,0.92)",
                  color: "#FFFDF9",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                }}
              >
                {activePerson.tag}
              </span>
              {/* Region name over photo bottom */}
              <span
                className="absolute bottom-2 left-3 font-bold"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(245,200,120,0.9)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {r.name}
              </span>
            </div>

            {/* Text content */}
            <div className="px-3 pt-2.5 pb-2">
              <p
                className="font-bold leading-tight mb-1.5"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#F5C87A",
                  fontSize: "13px",
                }}
              >
                {activePerson.title}
              </p>
            </div>

            {/* Tabs */}
            {r.people.length > 1 && (
              <div className="flex" style={{ borderTop: "1px solid rgba(193,122,92,0.18)" }}>
                {r.people.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => onPersonChange(idx)}
                    className="flex-1 py-2 cursor-pointer transition-all"
                    style={{
                      color: activePersonIdx === idx ? "#C17A5C" : "rgba(184,168,152,0.45)",
                      borderTop: activePersonIdx === idx ? "2px solid #C17A5C" : "2px solid transparent",
                      background: "transparent",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "10.5px",
                      fontWeight: 600,
                    }}
                  >
                    {p.tag}
                  </button>
                ))}
              </div>
            )}

            {/* Footer */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5"
              style={{ borderTop: "1px solid rgba(193,122,92,0.12)" }}
            >
              <i className="ri-map-pin-fill" style={{ color: "#C17A5C", fontSize: "10px" }} />
              <span style={{ color: "#C17A5C", fontSize: "10px", fontWeight: 600 }}>{r.group}</span>
              <span className="ml-auto" style={{ color: "rgba(184,168,152,0.4)", fontSize: "10px" }}>
                {r.families} {familiesLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function HistoriasSection() {
  const { t } = useTranslation();
  const [activeRegionId, setActiveRegionId] = useState<string | null>("ayacucho");
  const [activePersonIdx, setActivePersonIdx] = useState(0);

  const activeRegion = regions.find((r) => r.id === activeRegionId) ?? null;

  const handleSelectRegion = (id: string) => {
    if (id === activeRegionId) {
      setActiveRegionId(null);
    } else {
      setActiveRegionId(id);
      setActivePersonIdx(0);
    }
  };

  return (
    <section id="historias" className="relative py-2 md:py-4 overflow-hidden">
      {/* Background */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/AndesdelSol/videos/fondo2.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: "rgba(18,8,3,0.32)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-shrink-0 lg:w-96 flex flex-col gap-4" style={{ position: "relative", zIndex: 50 }}>

            {/* Title block — OUTSIDE the glass panel */}
            <div style={{ position: "relative", zIndex: 50 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px" style={{ background: "#C17A5C" }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#C17A5C" }}>
                  {t("stories_badge")}
                </span>
              </div>
              <h2
                className="font-bold leading-tight whitespace-nowrap"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5E6D3", fontSize: "3rem" }}
              >
                {t("stories_mapTitle")}{" "}
                <em style={{ color: "#C17A5C", fontStyle: "italic", fontSize: "3.3rem" }}>{t("stories_mapTitleEm")}</em>
              </h2>
              <p className="text-sm leading-relaxed mt-3" style={{ color: "#B8A898" }}>
                {t("stories_mapSubtitle")}
              </p>
              <div className="flex mt-5 overflow-visible">
                <div className="relative overflow-hidden flex w-full items-center gap-2 px-8 py-2 rounded-full font-sans text-xs font-semibold tracking-[0.1em] uppercase cursor-default select-none whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #c2622a 0%, #e07830 50%, #c2622a 100%)', color: '#fff8f0', boxShadow: '0 0 18px rgba(210,100,40,0.35)' }}>
                  <i className="ri-map-pin-line text-sm" />
                  {t("stories_mapHint")}
                  <span className="absolute top-0 bottom-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* Glass panel — only the region list */}
            <div
              className="rounded-2xl px-4 py-4"
              style={{
                background: "rgba(16,7,2,0.55)",
                border: "1px solid rgba(193,122,92,0.18)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
              }}
            >
            {/* Region list */}
            <div className="grid grid-cols-2 gap-1">
              {regions.map((r) => {
                const isActive = activeRegionId === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRegion(r.id)}
                    className="flex items-start gap-4 px-4 py-4 rounded-xl text-left cursor-pointer transition-all duration-300 w-full"
                    style={{
                      background: isActive ? "rgba(193,122,92,0.10)" : "transparent",
                      borderLeft: isActive ? "2px solid #C17A5C" : "2px solid transparent",
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{
                        background: isActive ? "#C17A5C" : "rgba(193,122,92,0.45)",
                        transition: "background 0.3s ease",
                      }}
                    />
                    <div>
                      <p
                        className="font-bold text-base leading-tight"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          color: isActive ? "#F5E6D3" : "rgba(245,230,211,0.65)",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {r.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: isActive ? "#C17A5C" : "rgba(184,168,152,0.6)" }}>
                        {r.group} · {r.families} {t("stories_familiesActive")}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            </div>{/* end glass panel */}
          </div>{/* end left column */}

          {/* ── RIGHT COLUMN: Map ── */}
          <div className="flex-1 flex flex-col items-end justify-start pr-0 lg:pr-8">
            {/* Map container — matches left column height */}
            <div
              className="relative w-full"
              style={{ maxWidth: "500px", height: "580px" }}
            >
              <PeruMapImage
                regions={regions}
                activeId={activeRegionId}
                onSelect={handleSelectRegion}
                popupRegion={activeRegion}
                activePersonIdx={activePersonIdx}
                onPersonChange={setActivePersonIdx}
                familiesLabel={t("stories_families")}
              />
            </div>

            {/* Hint */}
            <p className="text-xs text-center mt-4" style={{ color: "rgba(184,168,152,0.45)" }}>
              <i className="ri-cursor-line mr-1" />
              {t("stories_mapHint")}
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadePopup {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes mapPulse {
          0%   { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0;   transform: scale(2.4); }
        }
      `}</style>
    </section>
  );
}
