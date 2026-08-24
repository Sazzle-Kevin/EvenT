import { useEffect, useState } from "react";

const adventureTranslations = [
  "Abenteuer",    // 0. Deutsch (Start)
  "Adventure",    // 1. English (Lateinisch)
  "Περιπέτεια",   // 2. Greek (Ελληνικά) — andere Schrift
  "Приключение",  // 3. Русский (Cyrillic) — andere Schrift
  "모험",          // 4. 한국어 (Hangul) — asiatisch
  "冒险",          // 5. 中文 (Simplified Chinese) — asiatisch
  "Abenteuer",    // 6. Deutsch (Ende → STOP)
];

export default function DynamicText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Text schneller einblenden (0.3s), Video-Autoplay ist sofort
    const showTimer = setTimeout(() => setVisible(true), 300);

    if (index >= adventureTranslations.length - 1) return; // letzter Eintrag → STOP
    const timer = setTimeout(() => setIndex((prev) => prev + 1), 2500);

    return () => { clearTimeout(showTimer); clearTimeout(timer); };
  }, [index]);

  return (
    <div className="flex min-h-[56px] items-center justify-center">
      <div
        className={`text-center font-bold text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-2xl transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {adventureTranslations[index]}
      </div>
    </div>
  );
}
