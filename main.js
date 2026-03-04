// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    // Hide Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 800);
    }

    console.log("💎 Smooth Genius Mode: Active");

    let mm = gsap.matchMedia();

    // 1. Hero Entrance Sequence - Refined for "opacity: 0" CSS
    const heroTl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.8 }
    });

    // Ensure elements are visible at the end of the from sequence
    heroTl
        .fromTo(".hero-title",
            { y: 120, opacity: 0, skewY: 10 },
            { y: 0, opacity: 1, skewY: 0, stagger: 0.1 }
        )
        .fromTo(".hero-subtext",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1 },
            "-=1.2"
        )
        .fromTo(".hero-actions",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1 },
            "-=1"
        )
        .fromTo("nav",
            { y: -60, opacity: 0 },
            { y: 0, opacity: 1 },
            "-=1.4"
        );

    // 2. Optimized Section Reveals
    gsap.utils.toArray('.reveal').forEach((el) => {
        let revealSettings = {
            scrollTrigger: {
                trigger: el,
                start: "top 95%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out"
        };

        // Specific handling for cards staggered vs individual reveals
        if (el.classList.contains('retreat-card') || el.classList.contains('team-card')) {
            revealSettings.scrollTrigger.start = "top 85%";
            revealSettings.rotateX = 0;
            revealSettings.rotateY = 0;
            revealSettings.x = 0;
        }

        gsap.to(el, revealSettings);
    });

    // 3. Contact Form Logic
    const bloomForm = document.getElementById('bloomForm');
    if (bloomForm) {
        bloomForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('We are so excited to meet you! A Bloom curator will reach out shortly.');
            bloomForm.reset();
        });
    }

    // 4. Universal 3D Tilt Effect - Desktop Only (hover-capable devices)
    mm.add("(hover: hover)", () => {
        document.querySelectorAll('.glass-card:not(.contact-form)').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(card, {
                    rotateX: y / -20,
                    rotateY: x / 20,
                    scale: 1.05,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0, rotateY: 0, scale: 1,
                    duration: 1.2, ease: "elastic.out(1, 0.3)",
                    overwrite: "auto"
                });
            });
        });
    });

    // 5. Elegant Testimonial Slider: Silk Float (Desktop & Tablets)

    mm.add("(min-width: 800px)", () => {
        const elegantTrack = document.querySelector('.elegant-track');
        if (elegantTrack) {
            const horizontalWidth = elegantTrack.scrollWidth - window.innerWidth;
            const horizon = gsap.to(elegantTrack, {
                x: -horizontalWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: ".testimonials-overflow",
                    start: "top top",
                    end: () => `+=${horizontalWidth + window.innerHeight}`,
                    scrub: 1.5,
                    pin: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });

            gsap.utils.toArray(".elegant-card").forEach(card => {
                const ornament = card.querySelector('.glass-ornament');
                gsap.fromTo(card,
                    { opacity: 0, y: 60, rotateX: 15, filter: "blur(15px)", scale: 0.9 },
                    {
                        opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", scale: 1,
                        duration: 1.8, ease: "power3.out",
                        scrollTrigger: {
                            trigger: card, start: "left 95%", containerAnimation: horizon,
                            toggleActions: "play none none reverse", overwrite: "auto"
                        }
                    }
                );

                if (ornament) {
                    gsap.fromTo(ornament, { x: 50, opacity: 0 }, {
                        x: 0, opacity: 0.05, duration: 2.5, ease: "power2.out",
                        scrollTrigger: {
                            trigger: card, start: "left 90%", containerAnimation: horizon,
                            toggleActions: "play none none reverse"
                        }
                    });
                }
            });
        }
    });

    // Mobile specific layout reveal
    mm.add("(max-width: 799px)", () => {
        gsap.utils.toArray(".elegant-card").forEach(card => {
            gsap.fromTo(card,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: {
                        trigger: card, start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    });

    // 6. Image Polish
    gsap.utils.toArray(".retreat-card img").forEach(img => {
        gsap.to(img, { scale: 1.15, scrollTrigger: { trigger: img, scrub: 1.5 } });
    });

    // 7. Mystery Card Interaction (In-App Modal)
    const mysteryCards = document.querySelectorAll('.tba-retreats .retreat-card');
    const modal = document.getElementById('mystery-modal');
    const modalMsg = document.getElementById('mystery-message');
    const modalClose = document.getElementById('modal-close');
    const modalCTA = document.getElementById('modal-cta');

    const messages = [
        "Whoa there, time traveler! This journey isn't quite ready for the present. 🧘‍♂️",
        "Patience is a virtue, but curiosity is better. We're still manifesting this one! ✨",
        "The universe is still alignining the stars for this retreat. It's coming! 🌌"
    ];

    function showModal() {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        modalMsg.textContent = randomMsg;
        modal.classList.add('active');
    }

    function hideModal() {
        modal.classList.remove('active');
    }

    mysteryCards.forEach(card => {
        card.addEventListener('click', showModal);
    });

    modalClose.addEventListener('click', hideModal);

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    modalCTA.addEventListener('click', () => {
        hideModal();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    setTimeout(() => ScrollTrigger.refresh(), 1000);
});
