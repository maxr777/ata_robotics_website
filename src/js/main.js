/**
 * Progressive Enhancement: Upgrade images to high-res as soon as they are ready.
 */
function upgradeImages() {
    const sections = document.querySelectorAll('.section-image, .asset-image, .hero');
    
    sections.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        const variableValue = computedStyle.getPropertyValue('--image-url').trim();
        const backgroundValue = el.matches('.hero')
            ? computedStyle.backgroundImage
            : (variableValue && variableValue !== 'none' ? variableValue : computedStyle.backgroundImage);
        const match = backgroundValue.match(/url\(['"]?([^'")]+_compressed\.webp)['"]?\)/);
        
        if (match) {
            const currentBgUrl = match[1].replace(/['"]/g, '');
            const highResUrl = currentBgUrl.replace('_compressed.webp', '_highres.webp');
            
            const img = new Image();
            img.src = highResUrl;
            img.onload = () => {
                if (el.matches('.hero')) {
                    el.style.backgroundImage = backgroundValue.replace(/_compressed\.webp/g, '_highres.webp');
                } else {
                    el.style.setProperty('--image-url', `url('${highResUrl}')`);
                }
                
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
