// Clean PromptCraft Portal - JavaScript (Fixed Navigation)
let currentSection = 'home';

// AI Tools Data
const AI_TOOLS_DATA = {
    "Text AI": [
        {"name": "ChatGPT-4", "description": "Most versatile conversational AI"},
        {"name": "Claude 3.5", "description": "Advanced reasoning and analysis"},
        {"name": "Gemini Pro", "description": "Google's multimodal AI assistant"},
        {"name": "Perplexity", "description": "AI-powered search and research"},
        {"name": "Jasper", "description": "AI copywriting and content creation"}
    ],
    "Image AI": [
        {"name": "Midjourney", "description": "Premium AI art generation"},
        {"name": "DALL-E 3", "description": "OpenAI's advanced image creator"},
        {"name": "Stable Diffusion", "description": "Open-source image generation"},
        {"name": "Flux", "description": "High-quality realistic images"},
        {"name": "Firefly", "description": "Adobe's creative AI suite"}
    ],
    "Code AI": [
        {"name": "GitHub Copilot", "description": "AI pair programming assistant"},
        {"name": "Cursor", "description": "AI-powered code editor"},
        {"name": "Codeium", "description": "Free AI coding assistant"},
        {"name": "Tabnine", "description": "AI code completions"},
        {"name": "Replit Ghostwriter", "description": "Cloud-based AI coding"}
    ],
    "Audio AI": [
        {"name": "ElevenLabs", "description": "Realistic voice synthesis"},
        {"name": "Murf", "description": "AI voiceover generator"},
        {"name": "Descript", "description": "AI audio and video editing"},
        {"name": "Speechify", "description": "Text-to-speech platform"},
        {"name": "Replica Studios", "description": "AI voice actors library"}
    ],
    "Video AI": [
        {"name": "Runway", "description": "AI video generation and editing"},
        {"name": "Pika Labs", "description": "Text-to-video generation"},
        {"name": "Synthesia", "description": "AI avatar video creation"},
        {"name": "Luma Dream Machine", "description": "High-quality video generation"},
        {"name": "InVideo", "description": "AI-powered video editing"}
    ]
};

// Purpose-specific enhancements
const PURPOSE_ENHANCEMENTS = {
    "Image Generation": {
        "enhancement": "Include detailed visual specifications: composition (rule of thirds, symmetrical, dynamic), lighting conditions (natural light, golden hour, studio lighting), camera settings (wide-angle lens, macro, portrait), color palette (vibrant, muted, monochromatic), mood (cinematic, dreamy, dramatic), artistic style (photorealistic, impressionist, digital art), and perspective (bird's eye, low angle, close-up)."
    },
    "Report Analysis": {
        "enhancement": "Structure your analysis with: executive summary highlighting key findings, statistical analysis with specific metrics and KPIs, trend identification over time periods, actionable recommendations with implementation steps, and data visualization suggestions. Format as a comprehensive report with clear sections, bullet points for key insights, and tables for numerical data."
    },
    "Data Analysis": {
        "enhancement": "Perform comprehensive data analysis including: descriptive statistics (mean, median, mode, standard deviation), correlation analysis with correlation matrix, trend analysis over specified time periods, outlier detection and handling, statistical significance testing, data visualization recommendations (charts, graphs, heatmaps), and actionable insights with business implications."
    },
    "Code Generation": {
        "enhancement": "Generate well-documented, production-ready code with: comprehensive inline comments and docstrings, proper error handling with try-catch blocks, adherence to language-specific coding standards (PEP 8 for Python, ESLint for JavaScript), modular structure with reusable functions, unit tests for key functionality, and optimization for performance and readability."
    },
    "Content Creation": {
        "enhancement": "Create audience-focused content with: clear target audience definition (demographics, expertise level, interests), appropriate tone and voice (professional, conversational, authoritative), engaging structure with compelling headlines and subheadings, call-to-action elements, SEO optimization with relevant keywords, readability optimization for the target audience, and platform-specific formatting requirements."
    },
    "Conversational AI": {
        "enhancement": "Develop a conversational AI persona with: clear personality traits and expertise areas, consistent interaction style (helpful, professional, empathetic), response guidelines for different scenarios, context retention throughout conversations, natural conversation flow with appropriate transitions, clarifying question capabilities, and boundaries for scope and limitations."
    },
    "General Use": {
        "enhancement": "Ensure comprehensive and actionable responses with clear structure, specific details, and practical implementation guidance."
    }
};

// Initialize Application
function initializeApp() {
    console.log('🚀 PromptCraft Portal Initialized');
    
    // Setup all components
    setupNavigation();
    setupAITools();
    setupPromptChecker();
    setupPromptGenerator();
    setupMobileNavigation();
    setupCopyButtons();
    
    // Handle initial route after setup
    setTimeout(() => {
        handleInitialRoute();
    }, 100);
}

// Navigation Setup - Fixed
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetSection = href.substring(1);
                console.log('Navigating to:', targetSection);
                navigateToSection(targetSection);
            }
        });
    });
}

// Navigate to Section - Fixed
function navigateToSection(sectionId) {
    console.log('Navigating to section:', sectionId);
    
    // Validate section exists
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) {
        console.error('Section not found:', sectionId);
        return;
    }
    
    // Update navigation state
    updateNavigation(sectionId);
    
    // Show target section, hide others
    showSection(sectionId);
    
    // Update current section
    currentSection = sectionId;
    
    // Update URL without triggering reload
    history.pushState(null, null, `#${sectionId}`);
    
    // Close mobile menu
    closeMobileMenu();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Navigation complete to:', sectionId);
}

// Update Navigation State
function updateNavigation(activeSectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const linkSection = href.substring(1);
            if (linkSection === activeSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// Show Section - Fixed
function showSection(targetSectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === targetSectionId) {
            section.classList.remove('hidden');
            section.style.display = 'block';
        } else {
            section.classList.add('hidden');
            section.style.display = 'none';
        }
    });
}

// Handle Initial Route - Fixed
function handleInitialRoute() {
    const hash = window.location.hash.substring(1);
    const targetSection = hash || 'home';
    
    console.log('Initial route:', targetSection);
    
    // Validate section exists before navigating
    if (document.getElementById(targetSection)) {
        navigateToSection(targetSection);
    } else {
        console.log('Section not found, defaulting to home');
        navigateToSection('home');
    }
}

// Setup AI Tools
function setupAITools() {
    const toolsContainer = document.getElementById('tools-container');
    if (!toolsContainer) {
        console.log('Tools container not found');
        return;
    }
    
    toolsContainer.innerHTML = '';
    
    Object.entries(AI_TOOLS_DATA).forEach(([category, tools]) => {
        const categorySection = createToolsCategory(category, tools);
        toolsContainer.appendChild(categorySection);
    });
    
    console.log('AI Tools setup complete');
}

// Create Tools Category
function createToolsCategory(category, tools) {
    const section = document.createElement('div');
    section.className = 'tools-category';
    
    const title = document.createElement('h3');
    title.textContent = category;
    section.appendChild(title);
    
    const grid = document.createElement('div');
    grid.className = 'tools-grid';
    
    tools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.innerHTML = `
            <h4>${tool.name}</h4>
            <p>${tool.description}</p>
        `;
        grid.appendChild(card);
    });
    
    section.appendChild(grid);
    return section;
}

// Setup Prompt Checker - Fixed
function setupPromptChecker() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const promptInput = document.getElementById('prompt-input');
    const resultsSection = document.getElementById('analysis-results');
    
    if (!analyzeBtn || !promptInput || !resultsSection) {
        console.log('Prompt checker elements not found');
        return;
    }
    
    analyzeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const promptText = promptInput.value.trim();
        
        if (!promptText) {
            showNotification('Please enter a prompt to analyze', 'error');
            return;
        }
        
        console.log('Analyzing prompt:', promptText.substring(0, 50) + '...');
        
        // Show loading state
        const originalHTML = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = 'Analyzing...';
        analyzeBtn.disabled = true;
        
        // Simulate analysis delay
        setTimeout(() => {
            const analysis = analyzePrompt(promptText);
            displayAnalysisResults(analysis);
            resultsSection.classList.remove('hidden');
            resultsSection.style.display = 'block';
            
            // Reset button
            analyzeBtn.innerHTML = originalHTML;
            analyzeBtn.disabled = false;
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            console.log('Analysis complete');
        }, 1500);
    });
    
    console.log('Prompt checker setup complete');
}

// Analyze Prompt
function analyzePrompt(text) {
    const wordCount = text.split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    // Check for key elements
    const hasRole = /(?:act as|you are|assume the role)/i.test(text);
    const hasContext = /(?:context|background|scenario|situation)/i.test(text);
    const hasFormat = /(?:format|structure|table|list|bullet|json)/i.test(text);
    const hasSpecificity = /(?:specific|detailed|exactly|precisely)/i.test(text);
    
    // Check for vague terms
    const vagueTerms = ['something', 'anything', 'stuff', 'things', 'better', 'improve', 'good'];
    const hasVagueTerms = vagueTerms.some(term => text.toLowerCase().includes(term));
    
    let score = 0;
    const feedback = [];
    
    // Word count analysis
    if (wordCount >= 20 && wordCount <= 150) {
        score += 2;
        feedback.push({
            type: 'positive',
            title: '✅ Good Length',
            message: `Prompt length (${wordCount} words) is within the optimal range for clear AI understanding.`
        });
    } else if (wordCount < 20) {
        feedback.push({
            type: 'negative',
            title: '⚠️ Too Short',
            message: 'Consider adding more context and specific requirements to improve results.'
        });
    } else {
        feedback.push({
            type: 'negative',
            title: '⚠️ Too Long',
            message: 'Consider breaking this into smaller, focused prompts for better results.'
        });
    }
    
    // Role definition
    if (hasRole) {
        score += 2;
        feedback.push({
            type: 'positive',
            title: '🎯 Role Defined',
            message: 'Good! You\'ve defined a specific role or expertise for the AI.'
        });
    } else {
        feedback.push({
            type: 'negative',
            title: '❌ Missing Role',
            message: 'Start with "Act as a [expert]" to give the AI a specific perspective.'
        });
    }
    
    // Context check
    if (hasContext) {
        score += 1;
        feedback.push({
            type: 'positive',
            title: '📝 Context Provided',
            message: 'Good context helps the AI understand the situation better.'
        });
    } else {
        feedback.push({
            type: 'neutral',
            title: '💡 Add Context',
            message: 'Consider adding background information or constraints for better results.'
        });
    }
    
    // Format specification
    if (hasFormat) {
        score += 1;
        feedback.push({
            type: 'positive',
            title: '📋 Format Specified',
            message: 'Great! You\'ve specified how you want the output formatted.'
        });
    } else {
        feedback.push({
            type: 'negative',
            title: '❌ No Format Specified',
            message: 'Specify the desired output format (list, table, paragraph, etc.).'
        });
    }
    
    // Specificity check
    if (hasSpecificity) {
        score += 1;
        feedback.push({
            type: 'positive',
            title: '🔍 Specific Requirements',
            message: 'Specific language leads to more precise AI responses.'
        });
    }
    
    // Vague terms check
    if (hasVagueTerms) {
        score -= 1;
        feedback.push({
            type: 'negative',
            title: '🚫 Vague Language',
            message: 'Replace vague terms with specific requirements for better results.'
        });
    }
    
    // Calculate grade
    let grade = 'C';
    if (score >= 5) grade = 'A';
    else if (score >= 3) grade = 'B';
    
    return { score, grade, feedback, wordCount };
}

// Display Analysis Results
function displayAnalysisResults(analysis) {
    const scoreElement = document.getElementById('overall-score');
    const contentElement = document.getElementById('results-content');
    
    if (!scoreElement || !contentElement) return;
    
    // Update score badge
    scoreElement.textContent = `Grade: ${analysis.grade}`;
    scoreElement.className = `score-badge score-${analysis.grade.toLowerCase()}`;
    
    // Clear previous results
    contentElement.innerHTML = '';
    
    // Add feedback items
    analysis.feedback.forEach(item => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `result-item ${item.type}`;
        feedbackDiv.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.message}</p>
        `;
        contentElement.appendChild(feedbackDiv);
    });
}

// Setup Prompt Generator - Fixed
function setupPromptGenerator() {
    const generateBtn = document.getElementById('generate-btn');
    const generatedSection = document.getElementById('generated-section');
    const generatedPrompt = document.getElementById('generated-prompt');
    
    if (!generateBtn) {
        console.log('Generate button not found');
        return;
    }
    
    generateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const formData = getGeneratorFormData();
        
        if (!formData.basicPrompt.trim()) {
            showNotification('Please enter a basic prompt', 'error');
            return;
        }
        
        console.log('Generating enhanced prompt...');
        
        // Show loading state
        const originalHTML = generateBtn.innerHTML;
        generateBtn.innerHTML = 'Generating...';
        generateBtn.disabled = true;
        
        setTimeout(() => {
            const enhancedPrompt = generateEnhancedPrompt(formData);
            
            if (generatedPrompt) {
                generatedPrompt.value = enhancedPrompt;
            }
            
            if (generatedSection) {
                generatedSection.classList.remove('hidden');
                generatedSection.style.display = 'block';
            }
            
            // Reset button
            generateBtn.innerHTML = originalHTML;
            generateBtn.disabled = false;
            
            // Scroll to results
            if (generatedSection) {
                generatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            console.log('Enhanced prompt generated');
        }, 1000);
    });
    
    console.log('Prompt generator setup complete');
}

// Get Generator Form Data
function getGeneratorFormData() {
    return {
        basicPrompt: document.getElementById('basic-prompt')?.value || '',
        purpose: document.getElementById('purpose-select')?.value || 'General Use',
        aiModel: document.getElementById('ai-model')?.value || 'General',
        persona: document.getElementById('persona-select')?.value || 'Professional',
        tone: document.getElementById('tone-select')?.value || 'Formal',
        outputFormat: document.getElementById('output-format')?.value || 'Paragraph'
    };
}

// Generate Enhanced Prompt
function generateEnhancedPrompt(data) {
    let prompt = '';
    
    // Add persona
    const personaMap = {
        'Professional': 'professional expert',
        'Creative': 'creative specialist',
        'Technical': 'technical expert',
        'Academic': 'academic researcher',
        'Friendly': 'helpful assistant'
    };
    
    prompt += `Act as a ${personaMap[data.persona]} with extensive experience. `;
    
    // Add basic prompt
    prompt += `${data.basicPrompt} `;
    
    // Add purpose-specific enhancement
    if (PURPOSE_ENHANCEMENTS[data.purpose]) {
        prompt += PURPOSE_ENHANCEMENTS[data.purpose].enhancement + ' ';
    }
    
    // Add tone guidance
    const toneMap = {
        'Formal': 'Use formal, professional language throughout your response.',
        'Casual': 'Use conversational, approachable language while maintaining clarity.',
        'Persuasive': 'Use persuasive language with compelling arguments and evidence.',
        'Informative': 'Use clear, informative language focused on facts and details.',
        'Creative': 'Use creative, engaging language with vivid descriptions.'
    };
    
    prompt += toneMap[data.tone] + ' ';
    
    // Add format specification
    const formatMap = {
        'Paragraph': 'Structure your response in well-organized paragraphs with clear flow.',
        'Bullet Points': 'Present your response as a comprehensive bullet-point list.',
        'Numbered List': 'Format your response as a numbered list with clear, actionable items.',
        'Table': 'Present your response in a structured table format with appropriate headers.',
        'JSON': 'Return your response as valid, well-formatted JSON with logical structure.'
    };
    
    prompt += formatMap[data.outputFormat];
    
    // Add AI model-specific optimizations
    const modelOptimizations = {
        'ChatGPT': ' Optimize for ChatGPT by using clear step-by-step reasoning.',
        'Claude': ' Optimize for Claude by providing detailed analytical depth.',
        'Gemini': ' Optimize for Gemini by leveraging multimodal capabilities when relevant.',
        'Flux': ' Optimize for Flux by including specific visual descriptors and artistic terminology.',
        'Midjourney': ' Optimize for Midjourney by including artistic style references and visual parameters.'
    };
    
    if (modelOptimizations[data.aiModel]) {
        prompt += modelOptimizations[data.aiModel];
    }
    
    return prompt;
}

// Setup Copy Buttons
function setupCopyButtons() {
    // Copy generated prompt button
    const copyGeneratedBtn = document.getElementById('copy-generated-btn');
    if (copyGeneratedBtn) {
        copyGeneratedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const generatedPrompt = document.getElementById('generated-prompt');
            if (generatedPrompt && generatedPrompt.value) {
                copyToClipboard(generatedPrompt.value);
                showNotification('Generated prompt copied to clipboard!', 'success');
            }
        });
    }
    
    // Copy individual prompt buttons
    const copyPromptBtns = document.querySelectorAll('.copy-prompt-btn');
    copyPromptBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const promptText = this.getAttribute('data-prompt');
            if (promptText) {
                copyToClipboard(promptText);
                showNotification('Prompt copied to clipboard!', 'success');
            }
        });
    });
    
    console.log('Copy buttons setup complete');
}

// Copy to Clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// Fallback copy method
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Fallback: Text copied to clipboard');
        }
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Mobile Navigation Setup
function setupMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) {
        console.log('Mobile navigation elements not found');
        return;
    }
    
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    console.log('Mobile navigation setup complete');
}

// Close Mobile Menu
function closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1001;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    // Set colors based on type
    if (type === 'success') {
        notification.style.background = 'rgba(0, 255, 136, 0.2)';
        notification.style.color = '#00ff88';
        notification.style.border = '1px solid #00ff88';
    } else if (type === 'error') {
        notification.style.background = 'rgba(255, 68, 68, 0.2)';
        notification.style.color = '#ff4444';
        notification.style.border = '1px solid #ff4444';
    } else {
        notification.style.background = 'rgba(0, 245, 255, 0.2)';
        notification.style.color = '#00f5ff';
        notification.style.border = '1px solid #00f5ff';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    handleInitialRoute();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key - close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Ctrl/Cmd + K - focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (currentSection === 'checker') {
            const promptInput = document.getElementById('prompt-input');
            if (promptInput) promptInput.focus();
        } else if (currentSection === 'generator') {
            const basicPrompt = document.getElementById('basic-prompt');
            if (basicPrompt) basicPrompt.focus();
        }
    }
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    initializeApp();
});

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    console.log('DOM already ready');
    initializeApp();
}

console.log('✅ PromptCraft Portal JavaScript loaded');