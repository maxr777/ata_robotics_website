// Progressive Enhancement: Upgrade images to high-res after initial load
window.addEventListener('load', () => {
    // 1.5s delay after page load completes to ensure a smooth transition
    setTimeout(() => {
        const sections = document.querySelectorAll('.section-image, .asset-image');
        
        sections.forEach(el => {
            // Apply the 'is-loaded' class to trigger CSS background-image swap
            el.classList.add('is-loaded');
            
            // Handle elements with inline styles (specifically for subpages like Fleet)
            const inlineStyle = el.getAttribute('style');
            if (inlineStyle && inlineStyle.includes('_compressed.webp')) {
                // Swap the WebP URL for the High-Res WebP URL in the inline style
                const highResUrl = inlineStyle.replace('_compressed.webp', '_highres.webp');
                el.style.backgroundImage = `url('${highResUrl}')`;
            }
        });
        
        // Upgrade the Hero section if present
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('is-loaded');
            
            // Handle inline hero backgrounds (e.g., Fleet/Careers)
            const heroStyle = hero.getAttribute('style');
            if (heroStyle && heroStyle.includes('_compressed.webp')) {
                const highResHero = heroStyle.replace('_compressed.webp', '_highres.webp');
                hero.style.backgroundImage = `url('${highResHero}')`;
            }
        }
    }, 1500);
});
