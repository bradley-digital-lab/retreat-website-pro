const fs = require('fs');

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>__TITLE__ | SSC Events</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <style>
    #preloader { position: fixed; inset: 0; background: #fff; z-index: 9999; display: flex; align-items: center; justify-content: center; transition: opacity 0.8s ease-out; }
    .loader-dot { width: 12px; height: 12px; background: var(--vibrant-pink); border-radius: 50%; margin: 0 4px; animation: dotPulse 1.5s infinite ease-in-out; }
    @keyframes dotPulse { 0%, 100% { transform: scale(0.3); opacity: 0.2; } 50% { transform: scale(1.2); opacity: 1; } }

    .event-hero { height: 75vh; display: flex; align-items: center; justify-content: center; position: relative; text-align: center; overflow: hidden; }
    .event-hero-bg { position: absolute; inset: 0; background-image: url('__HERO_IMG__'); background-size: cover; background-position: center; opacity: 0.4; z-index: -2; filter: blur(2px) grayscale(30%); }
    .event-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,1)); z-index: -1; }
    
    .section-spacing { padding: 8rem 0; }
    .split-content { display: flex; align-items: center; gap: 5rem; margin-bottom: 6rem; flex-wrap: wrap; }
    .split-content.reverse { flex-direction: row-reverse; }
    .split-text { flex: 1; min-width: 300px; }
    .split-image { flex: 1; min-width: 300px; position: relative; border-radius: 30px; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.15); aspect-ratio: 4/5; }
    .split-image img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.1); }
    
    .event-title { font-family: var(--font-hero); font-size: clamp(3rem, 6vw, 5.5rem); line-height: 1.1; margin-bottom: 1.5rem; color: var(--text-dark); letter-spacing: -2px;}
    .split-title { font-family: var(--font-serif); font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 2rem; color: var(--text-dark); font-style: italic; }
    .desc-text { font-size: 1.15rem; line-height: 1.8; color: var(--text-dark); opacity: 0.8; margin-bottom: 1.5rem; }
    
    .meta-tags { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
    .meta-badge { padding: 0.6rem 1.4rem; border-radius: 100px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); font-family: var(--font-hero); font-weight: 800; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(0, 0, 0, 0.1); box-shadow: 0 5px 15px rgba(0,0,0,0.05); }

    .bullet-list { list-style: none; padding: 0; margin-top: 2rem; }
    .bullet-list li { font-size: 1.15rem; color: var(--text-dark); margin-bottom: 1.2rem; display: flex; align-items: center; gap: 1rem; opacity: 0.9; }
    .bullet-list li::before { content: '✦'; color: __THEME_COLOR__; font-size: 1.2rem; }
  </style>
</head>
<body>
  <div id="preloader"><div class="loader-dot" style="animation-delay: 0s"></div><div class="loader-dot" style="animation-delay: 0.2s"></div><div class="loader-dot" style="animation-delay: 0.4s"></div></div>
  <div class="mesh-bg"></div>

  <nav class="glass">
    <div class="logo-wrapper">
      <a href="index.html" class="logo">SSC <span class="logo-accent">Events</span></a>
      <span class="logo-subtext">by spiritual soul centre</span>
    </div>
    <div class="nav-links">
      <a href="events.html">Events</a>
      <a href="announcements.html">Announcements</a>
      <a href="index.html#team">Our Team</a>
      <a href="index.html#testimonials">Voices</a>
      <a href="index.html#contact">Contact</a>
    </div>
    <div class="menu-trigger">
      <span>&#9776;</span>
    </div>
    <a href="index.html#contact" class="shiny-glass-cta" style="padding: 0.8rem 1.8rem; font-size: 0.95rem;">Join Us</a>
  </nav>

  <main>
    <section class="event-hero">
      <div class="event-hero-bg parallax-bg"></div>
      <div class="event-hero-overlay"></div>
      <div class="container hero-content" style="max-width: 1000px; position:relative; z-index:2;">
        <div class="meta-tags hero-anim">
          <div class="meta-badge">__DATE__</div>
          __LOCATION_BADGE__
          <div class="meta-badge" style="color: white; background: var(--text-dark);">__TYPE__</div>
        </div>
        <h1 class="event-title hero-anim">__TITLE__</h1>
        <p class="hero-subtext hero-anim" style="color: var(--text-dark); font-size: 1.3rem;">__SUBTITLE__</p>
      </div>
    </section>

    <section class="section-spacing container">
      <!-- Description Section -->
      <div class="split-content reveal-stagger">
        <div class="split-image">
          <img class="parallax-img" src="__IMG_1__" alt="Event preview">
        </div>
        <div class="split-text">
          <h2 class="split-title">The <span style="color: __THEME_COLOR__">Experience</span></h2>
          __DESC_HTML__
        </div>
      </div>

      <!-- Features Section -->
      <div class="split-content reverse reveal-stagger">
        <div class="split-image">
          <img class="parallax-img" src="__IMG_2__" alt="Experience preview">
        </div>
        <div class="split-text">
          <h2 class="split-title">__FEATURES_HEADING_1__ <br><span style="color: __THEME_COLOR__">__FEATURES_HEADING_2__</span></h2>
          <ul class="bullet-list">
            __FEATURES_HTML__
          </ul>
        </div>
      </div>

      <div class="reveal" style="text-align: center; max-width: 600px; margin: 8rem auto 4rem;">
        <h3 style="font-family: var(--font-hero); font-size: 2.2rem; margin-bottom: 2.5rem; letter-spacing: -1px; font-style: italic;">__CONCLUSION__</h3>
        <a href="index.html#contact" class="shiny-glass-cta" style="padding: 1.2rem 3.5rem; background: var(--text-dark); color: white;">__BUTTON__ <span style="font-size: 1.2rem;">&rarr;</span></a>
      </div>
    </section>
  </main>

  <footer style="padding: 4rem 0; text-align: center; opacity: 0.6;">
    <p>&copy; 2026 RE-BLOOM. All rights vibrant.</p>
  </footer>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="main.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      gsap.from(".hero-anim", { y: 40, opacity: 0, filter: "blur(10px)", stagger: 0.15, duration: 1.2, ease: "power4.out", delay: 0.3 });
      
      gsap.utils.toArray('.reveal-stagger').forEach(section => {
        const img = section.querySelector('.split-image');
        const textElements = section.querySelectorAll('.split-title, .desc-text, .bullet-list li');
        const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 75%" } });
        tl.from(img, { x: section.classList.contains('reverse') ? 50 : -50, opacity: 0, scale: 0.95, duration: 1.2, ease: "back.out(1.2)" })
          .from(textElements, { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.8");
      });

      gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, { yPercent: -15, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      });

      gsap.to(".parallax-bg", { yPercent: 20, ease: "none", scrollTrigger: { trigger: ".event-hero", start: "top top", end: "bottom top", scrub: true } });
      
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    });
  </script>
</body>
</html>`;

const events = [
  {
    fileName: 'event-recode.html',
    title: 'Recode & Reconnect',
    subtitle: 'Awaken the Inner Child Within',
    date: 'Date: TBC',
    location: 'West Yorkshire',
    type: 'Transformational Workshop Day',
    heroImg: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop',
    img1: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1200&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    themeColor: 'var(--vibrant-teal)',
    desc: [
      'Recode & Reconnect is a transformative one-day workshop designed to help you return to the inner child while learning how to consciously reprogram subconscious beliefs that were formed in early life.',
      'Much of who we are — our reactions, patterns, habits, and self-beliefs — was coded before we had conscious choice. In this experience, you’ll gently uncover where those beliefs originated, break down the emotional and neurological pattern, and learn how to recode the subconscious mind in a way that creates lasting change.',
      'Through guided inner-child journeys, belief-mapping, creative expression, embodiment practices, and conscious reprogramming techniques, you’ll move from awareness into true integration — not just understanding your patterns, but transforming them.',
      'Recode & Reconnect is both gentle and powerful — blending play, depth, neuroscience-informed belief work, and soul-led healing. A space to soften, remember, and re-write the internal code you live from.'
    ],
    featuresHeading: ['This Workshop Is', 'For Those Who Feel Called To'],
    features: [
      'Reconnect with their inner child in a safe, nurturing way',
      'Understand how subconscious beliefs are formed and stored',
      'Break old emotional and behavioural loops at the root',
      'Consciously recode beliefs to support clarity, safety, confidence, and self-trust',
      'Leave with practical tools that continue working long after the workshop ends'
    ],
    conclusion: '10:00am – 5:00pm',
    button: 'Reserve Your Place'
  },
  {
    fileName: 'event-little-wildlings.html',
    title: 'Little Wildlings',
    subtitle: 'A joyful outdoor gathering designed to bring families and children together in nature.',
    date: 'August 14th 2026',
    location: '',
    type: 'Family Nature Day',
    heroImg: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2000&auto=format&fit=crop',
    img1: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
    themeColor: 'var(--vibrant-blue)',
    desc: [
      'Little Wildlings is a joyful outdoor gathering designed to bring families and children together in nature.',
      'This workshop day creates a playful and heart-led environment where children can explore, create, and connect with the natural world while building meaningful connections with others.',
      'Through music, play, creativity, and simple mindful activities, children are encouraged to express themselves freely, nurture their curiosity, and experience the magic of being outdoors.',
      'This is a relaxed community gathering focused on nature, connection, and joy.'
    ],
    featuresHeading: ['What To', 'Expect'],
    features: [
      'Outdoor exploration and nature connection',
      'Music and creative play',
      'Simple mindful activities for children',
      'Opportunities for families to connect',
      'A joyful day filled with laughter and community'
    ],
    conclusion: 'Nature is calling.',
    button: 'Join the Gathering'
  },
  {
    fileName: 'event-renewal.html',
    title: 'Renewal & Rebirth Pregnancy Retreat',
    subtitle: 'A 4-night immersive natural pregnancy retreat held at the sacred grounds of Broughton Hall.',
    date: 'April 2027',
    location: 'Lake District, UK',
    type: 'Pregnancy Retreat',
    heroImg: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop',
    img1: 'https://images.unsplash.com/photo-1457195740896-7f345efef228?q=80&w=1200&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1507726425126-7bc0cd78546b?q=80&w=1200&auto=format&fit=crop',
    themeColor: 'var(--vibrant-pink)',
    desc: [
      'Renewal & Rebirth is a 4-night immersive natural pregnancy retreat held at the sacred grounds of Broughton Hall, the same venue that hosted the New Earth Gathering.',
      'This retreat is lovingly hosted by Maria, a natural doula, and Anya Lily, mother of two who has birthed both of her babies naturally at home. Together, they offer a deeply grounded, embodied and intuitive approach to pregnancy and birth—rooted in trust, physiology, and feminine wisdom.',
      'This space is for women who feel called to slow down, tune in, and reconnect with the innate intelligence of their bodies and babies.',
      'Set within acres of ancient land, Broughton Hall offers the perfect environment for renewal, rebirth, and remembrance—of your body, your power, and your innate knowing.',
      '✨ Your body knows. You are supported. You are not alone.'
    ],
    featuresHeading: ['🌿 What You \\n', 'Will Experience'],
    features: [
      'Natural & physiological pregnancy and birth education',
      'Preparation for natural birth (mind, body & spirit)',
      'Releasing fear, conditioning and external narratives',
      'Somatic, nervous system & embodiment practices',
      'Sacred sharing circles & sisterhood connection',
      'Time in nature for rest, reflection and renewal',
      'A deeply supportive, non-judgemental space'
    ],
    conclusion: 'Trust your innate power.',
    button: 'Reserve Your Place'
  },
  {
    fileName: 'event-dance.html',
    title: 'Dance with the Divine Feminine',
    subtitle: 'Welcoming the Wild Woman Home • July 2027',
    date: 'July 2027',
    location: 'Spain',
    type: 'Feminine Embodiment Retreat',
    heroImg: 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=2000&auto=format&fit=crop',
    img1: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop',
    themeColor: 'var(--vibrant-pink)',
    desc: [
      'There is a place within you that has never been broken. A place that remembers how to soften… how to feel… how to create life, art, love, and magic with ease.',
      'Dance with the Divine Feminine is a sacred, immersive retreat devoted to returning you home to your body, your sacral chakra, and the ancient feminine wisdom that lives within your bones.',
      'Through movement, ritual, sisterhood, and deep rest, we gently unravel the layers of conditioning, shame, and inherited stories that have kept women small for generations.',
      'Each day we flow between embodied dance, womb meditations, ancestral healing rituals, somatic practices, nature connection, ceremony, and nourishing rest.',
      'Welcome home, wild woman.'
    ],
    featuresHeading: ['We Gather', 'In Circle To'],
    features: [
      'Awaken the sacral chakra and restore creative life force',
      'Heal and honour the womb space',
      'Release ancestral and maternal line wounds',
      'Reconnect with pleasure, sensuality, and softness',
      'Move the body through dance as prayer',
      'Be witnessed, held, and celebrated by sisterhood',
      'Remember the wild, intuitive woman you have always been'
    ],
    conclusion: 'A soft but powerful return to your truth.',
    button: 'Reserve Your Place'
  },
  {
    fileName: 'event-wildlings-wander.html',
    title: 'Where the Wildlings Wander',
    subtitle: 'An Immersive Nature Retreat for Parents and Children',
    date: 'Sept & Oct 2027',
    location: 'Location TBC',
    type: 'Immersive Nature Retreat',
    heroImg: 'https://images.unsplash.com/photo-1498598457418-36ef20772bb9?q=80&w=2000&auto=format&fit=crop',
    img1: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1200&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop',
    themeColor: 'var(--vibrant-teal)',
    desc: [
      'Step into a magical, nature-filled world where parents and children reconnect with each other, their emotions, and the rhythms of Mother Earth. Where the Wildlings Wander is a gentle, immersive retreat designed to support deep connection.',
      'This retreat is for parents, carers, and little ones under 8 years old. Give yourself the space to slow down, reconnect, and rediscover the wonder in everyday moments, all while guiding your child to feel seen, heard, and emotionally resilient.',
      'Venue: A serene, nature-rich location with outdoor spaces safe for little ones to explore freely. (Can provide more details once location is finalized.)',
      'Dates include weekends in Sept & Oct 2027 (exact dates to be confirmed).'
    ],
    featuresHeading: ['What Is', 'Included'],
    features: [
      'Guided outdoor adventures in forests and meadows',
      'Mindfulness and grounding sessions tailored for little children',
      'Creative workshops: nature crafts, storytelling, and imaginative play',
      'Gentle yoga and movement sessions for families',
      'Connection circles for parents to share, learn, and recharge',
      'Healthy, nourishing snacks and drinks throughout the day'
    ],
    conclusion: 'Limited Spaces Available',
    button: 'Join the Gathering'
  }
];

events.forEach(e => {
  let locationBadge = e.location ? `<div class="meta-badge">${e.location}</div>` : '';
  let descHtml = e.desc.map(p => `<p class="desc-text">${p}</p>`).join('\n          ');
  let featuresHtml = e.features.map(f => `<li>${f}</li>`).join('\n            ');

  let output = template
    .replace(/__TITLE__/g, e.title)
    .replace(/__SUBTITLE__/g, e.subtitle)
    .replace(/__DATE__/g, e.date)
    .replace(/__LOCATION_BADGE__/g, locationBadge)
    .replace(/__TYPE__/g, e.type)
    .replace(/__HERO_IMG__/g, e.heroImg)
    .replace(/__IMG_1__/g, e.img1)
    .replace(/__IMG_2__/g, e.img2)
    .replace(/__THEME_COLOR__/g, e.themeColor)
    .replace(/__FEATURES_HEADING_1__/g, e.featuresHeading[0])
    .replace(/__FEATURES_HEADING_2__/g, e.featuresHeading[1])
    .replace(/__DESC_HTML__/g, descHtml)
    .replace(/__FEATURES_HTML__/g, featuresHtml)
    .replace(/__CONCLUSION__/g, e.conclusion)
    .replace(/__BUTTON__/g, e.button);

  fs.writeFileSync(e.fileName, output);
  console.log('Created ' + e.fileName);
});
