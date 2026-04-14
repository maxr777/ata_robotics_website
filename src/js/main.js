/**
 * Progressive Enhancement: Upgrade images to high-res as soon as they are ready.
 * This is triggered as soon as the DOM is ready, rather than waiting for full page load.
 */
function upgradeImages() {
    const sections = document.querySelectorAll('.section-image, .asset-image, .hero');
    
    sections.forEach(el => {
        let currentBg = '';
        
        // 1. Extract the compressed WebP URL from inline style or computed style
        const inlineStyle = el.getAttribute('style');
        if (inlineStyle && inlineStyle.includes('_compressed.webp')) {
            const match = inlineStyle.match(/url\(['"]?([^'"]+_compressed\.webp)['"]?\)/);
            if (match) currentBg = match[1];
        }
        
        if (!currentBg) {
            const computedStyle = window.getComputedStyle(el).backgroundImage;
            if (computedStyle && computedStyle.includes('_compressed.webp')) {
                const match = computedStyle.match(/url\(['"]?([^'"]+_compressed\.webp)['"]?\)/);
                if (match) currentBg = match[1];
            }
        }

        // 2. If we found a compressed URL, pre-cache the high-res version immediately
        if (currentBg) {
            const cleanUrl = currentBg.replace(/['"]/g, '');
            const highResUrl = cleanUrl.replace('_compressed.webp', '_highres.webp');
            
            const img = new Image();
            img.src = highResUrl;
            img.onload = () => {
                // Apply the high-res image as soon as it's downloaded into the browser cache
                
                // If the element has inline styles (like subpage heroes or fleet images), 
                // we update the style attribute directly.
                if (inlineStyle && inlineStyle.includes('_compressed.webp')) {
                    const newStyle = inlineStyle.replace('_compressed.webp', '_highres.webp');
                    el.setAttribute('style', newStyle);
                }
                
                // For class-based backgrounds (like domain sections), adding the 'is-loaded' 
                // class triggers the CSS background-image swap.
                el.classList.add('is-loaded');
            };
        }
    });
}

// Start the process as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', upgradeImages);
} else {
    upgradeImages();
}
