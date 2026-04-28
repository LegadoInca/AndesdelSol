import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ContactoSection() {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSent, setNewsSent] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleContact = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    try {
      await fetch('https://readdy.ai/api/form/d789a3b86jhav3jpf4v0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      setSuccess(true);
      form.reset();
    } finally {
      setSending(false);
    }
  };

  const handleNewsletter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new URLSearchParams({ email: newsEmail });
    await fetch('https://readdy.ai/api/form/d789a3j86jhav3jpf4vg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data.toString(),
    });
    setNewsSent(true);
    setNewsEmail('');
  };

  const glassStyle = {
    background: 'rgba(15, 10, 5, 0.45)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.12)',
  };

  const inputStyle = "w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60 transition-colors";

  return (
    <section id="contacto" className="py-20 relative overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="https://res.cloudinary.com/djfmngyl0/video/upload/v1775280064/1094449-hd_1920_1080_25fps_v8uhsi.mp4"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-12 fade-up ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block bg-amber-700 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
            {t('contact_badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('contact_title')}
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-base leading-relaxed">{t('contact_desc')}</p>
        </div>

        {/* Content grid */}
        <div ref={contentRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 fade-up ${contentVisible ? 'visible' : ''}`}>

          {/* LEFT - Contact Form */}
          <div className="rounded-2xl p-7" style={glassStyle}>
            {success ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-emerald-500/20 rounded-full text-emerald-400">
                  <i className="ri-check-line text-3xl"></i>
                </div>
                <p className="text-white font-semibold text-lg">{t('contact_success')}</p>
              </div>
            ) : (
              <form data-readdy-form onSubmit={handleContact} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2 block">{t('contact_name')}</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-white/30">
                        <i className="ri-user-line text-sm"></i>
                      </div>
                      <input name="name" required className={`${inputStyle} pl-9`} placeholder={t('contact_name')} />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2 block">{t('contact_email')}</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-white/30">
                        <i className="ri-mail-line text-sm"></i>
                      </div>
                      <input name="email" type="email" required className={`${inputStyle} pl-9`} placeholder={t('contact_email')} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2 block">{t('contact_subject')}</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-white/30">
                      <i className="ri-edit-line text-sm"></i>
                    </div>
                    <input name="subject" required className={`${inputStyle} pl-9`} placeholder={t('contact_subject')} />
                  </div>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2 block">{t('contact_message')}</label>
                  <textarea name="message" required maxLength={500} rows={5} className={`${inputStyle} resize-none`} placeholder={t('contact_message')} />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-semibold text-sm cursor-pointer transition-colors disabled:opacity-60 whitespace-nowrap mt-1"
                >
                  {sending ? t('contact_sending') : t('contact_send')}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT - Info + Newsletter */}
          <div className="flex flex-col gap-6">
            {/* Contact Info */}
            <div className="rounded-2xl p-7" style={glassStyle}>
              <h3 className="text-white font-bold text-xl mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('contact_info_title')}
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  { icon: 'ri-map-pin-line', text: t('contact_location') },
                  { icon: 'ri-mail-line', text: 'hola@ayni.pe' },
                  { icon: 'ri-time-line', text: t('contact_hours') },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-amber-400 flex-shrink-0">
                      <i className={`${item.icon} text-sm`}></i>
                    </div>
                    <span className="text-white/80 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">{t('contact_follow')}</p>
                <div className="flex gap-3">
                  {['ri-instagram-line', 'ri-pinterest-line', 'ri-facebook-circle-line', 'ri-whatsapp-line', 'ri-chat-1-line'].map((icon, i) => (
                    <a key={i} href="#" rel="nofollow" className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-amber-400 hover:border-amber-400/50 transition-colors cursor-pointer">
                      <i className={icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl p-7" style={glassStyle}>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">{t('news_title')}</h4>
              {newsSent ? (
                <p className="text-emerald-400 text-sm font-medium">{t('news_success')}</p>
              ) : (
                <form data-readdy-form onSubmit={handleNewsletter} className="flex flex-col gap-3">
                  <input
                    name="email"
                    type="email"
                    required
                    value={newsEmail}
                    onChange={e => setNewsEmail(e.target.value)}
                    placeholder={t('news_placeholder')}
                    className={inputStyle}
                  />
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-xl font-semibold text-sm cursor-pointer transition-colors whitespace-nowrap"
                  >
                    {t('news_btn')}
                  </button>
                  <p className="text-white/30 text-xs">{t('news_legal')}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
