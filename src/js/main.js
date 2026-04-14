/**
 * Progressive Enhancement: Upgrade images to high-res as soon as they are ready.
 */
function upgradeImages() {
    const sections = document.querySelectorAll('.section-image, .asset-image, .hero');
    
    sections.forEach(el => {
        let currentBgUrl = '';
        
        // 1. Get current background URL from either inline style or computed style
        const computedStyle = window.getComputedStyle(el).backgroundImage;
        const match = computedStyle.match(/url\(['"]?([^'"]+_compressed\.webp)['"]?\)/);
        
        if (match) {
            currentBgUrl = match[1].replace(/['"]/g, '');
            const highResUrl = currentBgUrl.replace('_compressed.webp', '_highres.webp');
            
            // 2. Pre-cache high-res image
            const img = new Image();
            img.src = highResUrl;
            img.onload = () => {
                /**
                 * 3. Apply high-res directly to the inline style.
                 * This is the strongest way to ensure the background stays locked 
                 * and doesn't flicker when CSS classes (like :hover) are re-evaluated.
                 */
                const existingStyle = el.getAttribute('style') || '';
                
                // If the element already has a background-image in inline style, replace it.
                // Otherwise, append the new background-image to the inline style.
                if (existingStyle.includes('background-image')) {
                    el.style.backgroundImage = computedStyle.replace(/_compressed\.webp/g, '_highres.webp');
                } else {
                    // Prepend to existing styles (like height/width)
                    el.style.backgroundImage = `url('${highResUrl}')`;
                }
                
                // Signal that the high-res version is active
                el.classList.add('is-loaded');
            };
        }
    });
}

// Kick off immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', upgradeImages);
} else {
    upgradeImages();
}
