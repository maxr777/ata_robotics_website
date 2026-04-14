// Progressive Enhancement: Upgrade images to high-res after initial load
window.addEventListener('load', () => {
    // 1s initial delay to allow page stability before starting background loads
    setTimeout(() => {
        const sections = document.querySelectorAll('.section-image, .asset-image, .hero');
        
        sections.forEach(el => {
            let currentBg = '';
            
            // 1. Check inline styles first (more specific)
            const inlineStyle = el.getAttribute('style');
            if (inlineStyle && inlineStyle.includes('_compressed.webp')) {
                const match = inlineStyle.match(/url\(['"]?([^'"]+_compressed\.webp)['"]?\)/);
                if (match) currentBg = match[1];
            }
            
            // 2. Fallback to computed style (for CSS-defined backgrounds)
            if (!currentBg) {
                const computedStyle = window.getComputedStyle(el).backgroundImage;
                if (computedStyle && computedStyle.includes('_compressed.webp')) {
                    const match = computedStyle.match(/url\(['"]?([^'"]+_compressed\.webp)['"]?\)/);
                    if (match) currentBg = match[1];
                }
            }

            // 3. If we found a compressed URL, prepare the high-res one
            if (currentBg) {
                // Remove potential quotes from the extracted URL
                const cleanUrl = currentBg.replace(/['"]/g, '');
                const highResUrl = cleanUrl.replace('_compressed.webp', '_highres.webp');
                
                // Pre-cache the high-res image
                const img = new Image();
                img.src = highResUrl;
                img.onload = () => {
                    // Update inline style directly if it exists (handles Fleet/Hero)
                    if (inlineStyle && inlineStyle.includes('_compressed.webp')) {
                        const newStyle = inlineStyle.replace('_compressed.webp', '_highres.webp');
                        el.setAttribute('style', newStyle);
                    }
                    
                    // Add the 'is-loaded' class for CSS-defined swaps (handles Domain sections)
                    el.classList.add('is-loaded');
                };
            }
        });
    }, 1000);
});
