// Smooth scrolling and interaction enhancements for the presentation
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scrolling to any anchor links (if added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add subtle fade-in animation for sections as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all content sections for fade-in effect
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Make the title section immediately visible
    const titleSection = document.querySelector('.title-section');
    if (titleSection) {
        titleSection.style.opacity = '1';
        titleSection.style.transform = 'translateY(0)';
    }

    // Add hover effects for interactive elements
    const cards = document.querySelectorAll('.stat-card, .practice-card, .comparison-card, .reference-column');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add click-to-copy functionality for prompt examples
    const promptTexts = document.querySelectorAll('.prompts-table tbody tr');
    promptTexts.forEach(row => {
        const promptCell = row.cells[1]; // Second column contains the prompt
        if (promptCell) {
            promptCell.style.cursor = 'pointer';
            promptCell.title = 'Click to copy prompt';
            
            promptCell.addEventListener('click', function() {
                const promptText = this.textContent.trim();
                
                // Use modern clipboard API if available
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(promptText).then(() => {
                        showCopyFeedback(this);
                    }).catch(() => {
                        fallbackCopyToClipboard(promptText, this);
                    });
                } else {
                    fallbackCopyToClipboard(promptText, this);
                }
            });
        }
    });

    // Show copy feedback
    function showCopyFeedback(element) {
        const originalText = element.textContent;
        const originalBg = element.style.backgroundColor;
        
        // Create a temporary feedback element
        const feedback = document.createElement('div');
        feedback.textContent = 'Copied!';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-primary);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 2000);
        
        // Brief highlight of the clicked element
        element.style.backgroundColor = 'var(--color-bg-3)';
        element.style.transition = 'background-color 0.3s ease';
        
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 500);
    }

    // Fallback copy method for older browsers
    function fallbackCopyToClipboard(text, element) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback(element);
        } catch (err) {
            console.warn('Copy to clipboard failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Navigate sections with arrow keys (when not in form elements)
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
            const sections = Array.from(document.querySelectorAll('.content-section, .title-section'));
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                let targetIndex = -1;
                
                if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                    targetIndex = Math.min(currentIndex + 1, sections.length - 1);
                } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                    targetIndex = Math.max(currentIndex - 1, 0);
                } else if (e.key === 'Home') {
                    targetIndex = 0;
                } else if (e.key === 'End') {
                    targetIndex = sections.length - 1;
                }
                
                if (targetIndex >= 0 && targetIndex !== currentIndex) {
                    e.preventDefault();
                    sections[targetIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    });

    // Add a subtle progress indicator
    function updateProgressIndicator() {
        const scrollProgress = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        let progressBar = document.getElementById('progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'progress-bar';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: var(--color-primary);
                z-index: 1000;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = Math.min(scrollProgress, 100) + '%';
    }

    // Update progress on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateProgressIndicator();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize progress indicator
    updateProgressIndicator();

    // Print-friendly styles
    window.addEventListener('beforeprint', function() {
        // Remove animations and transitions for print
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                * {
                    transition: none !important;
                    animation: none !important;
                }
                .content-section {
                    page-break-inside: avoid;
                    opacity: 1 !important;
                    transform: none !important;
                }
                #progress-bar {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    });

    console.log('Prompt Engineering Guide loaded successfully! 🚀');
    console.log('Tip: Click on any prompt in the table to copy it to your clipboard.');
});