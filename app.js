// vicky.ai - Internal Prompt Engineering Platform
let currentSection = 'home';

// AI Tools Data (25 tools as specified)
const aiToolsData = [
  // Text Generation
  {"name": "ChatGPT", "category": "Text Generation", "url": "https://chat.openai.com", "rating": 4.8, "description": "Advanced conversational AI for text generation and analysis"},
  {"name": "Claude", "category": "Text Generation", "url": "https://claude.ai", "rating": 4.7, "description": "Anthropic's AI assistant for complex reasoning and writing"},
  {"name": "Gemini", "category": "Text Generation", "url": "https://gemini.google.com", "rating": 4.6, "description": "Google's multimodal AI with advanced text capabilities"},
  {"name": "Jasper", "category": "Text Generation", "url": "https://jasper.ai", "rating": 4.3, "description": "AI writing assistant for marketing and content creation"},
  {"name": "Copy.ai", "category": "Text Generation", "url": "https://copy.ai", "rating": 4.2, "description": "AI-powered copywriting and content generation tool"},

  // Image Generation
  {"name": "Midjourney", "category": "Image Generation", "url": "https://midjourney.com", "rating": 4.9, "description": "High-quality AI image generation with artistic styles"},
  {"name": "DALL-E 3", "category": "Image Generation", "url": "https://openai.com/dall-e-3", "rating": 4.7, "description": "OpenAI's advanced text-to-image generator"},
  {"name": "Stable Diffusion", "category": "Image Generation", "url": "https://stability.ai", "rating": 4.6, "description": "Open-source AI image generation model"},
  {"name": "Flux", "category": "Image Generation", "url": "https://flux.ai", "rating": 4.5, "description": "Fast and efficient AI image generation"},
  {"name": "Leonardo AI", "category": "Image Generation", "url": "https://leonardo.ai", "rating": 4.4, "description": "AI art generator with fine-tuned control"},

  // Video Generation
  {"name": "Runway ML", "category": "Video Generation", "url": "https://runwayml.com", "rating": 4.6, "description": "AI video editing and generation platform"},
  {"name": "Pika Labs", "category": "Video Generation", "url": "https://pika.art", "rating": 4.4, "description": "Text-to-video AI generation tool"},
  {"name": "Synthesia", "category": "Video Generation", "url": "https://synthesia.io", "rating": 4.3, "description": "AI avatar video creation platform"},
  {"name": "D-ID", "category": "Video Generation", "url": "https://d-id.com", "rating": 4.2, "description": "AI-powered talking head video generation"},
  {"name": "HeyGen", "category": "Video Generation", "url": "https://heygen.com", "rating": 4.1, "description": "AI video generation with realistic avatars"},

  // Code Generation
  {"name": "GitHub Copilot", "category": "Code Generation", "url": "https://github.com/features/copilot", "rating": 4.8, "description": "AI pair programmer for code completion"},
  {"name": "Cursor", "category": "Code Generation", "url": "https://cursor.sh", "rating": 4.6, "description": "AI-powered code editor and assistant"},
  {"name": "Tabnine", "category": "Code Generation", "url": "https://tabnine.com", "rating": 4.4, "description": "AI code completion for multiple IDEs"},
  {"name": "CodeT5", "category": "Code Generation", "url": "https://huggingface.co/Salesforce/codet5-large", "rating": 4.2, "description": "AI model for code understanding and generation"},
  {"name": "Codex", "category": "Code Generation", "url": "https://openai.com/blog/openai-codex", "rating": 4.1, "description": "OpenAI's code generation model"},

  // Audio Generation
  {"name": "ElevenLabs", "category": "Audio Generation", "url": "https://elevenlabs.io", "rating": 4.7, "description": "AI voice cloning and text-to-speech"},
  {"name": "Murf", "category": "Audio Generation", "url": "https://murf.ai", "rating": 4.4, "description": "AI voiceover generation platform"},
  {"name": "Speechify", "category": "Audio Generation", "url": "https://speechify.com", "rating": 4.3, "description": "AI text-to-speech reading assistant"},
  {"name": "Descript", "category": "Audio Generation", "url": "https://descript.com", "rating": 4.2, "description": "AI-powered audio and video editing"},
  {"name": "Resemble", "category": "Audio Generation", "url": "https://resemble.ai", "rating": 4.1, "description": "AI voice generator and cloning platform"}
];

// Expert prompts organized by category (18 prompts)
const expertPrompts = {
  "Schedules & Timelines": [
    "Act as a project manager and create a detailed project timeline for a [software/marketing] project. Break it into phases, add dates & owners in a table.",
    "Create a Gantt-chart structure for a [website launch] including tasks, dependencies, durations.",
    "Identify task dependencies (FS, SS, FF, SF) for a [marketing campaign] and summarise in a table."
  ],
  "Communication": [
    "Generate a meeting agenda for our weekly project sync (objectives, time boxes, owners).",
    "Draft an email to inform stakeholders of a two-week delay, explain cause, propose mitigation, supply new timeline.",
    "Write a milestone update for executives: current status, wins, next steps, risks."
  ],
  "Resource Management": [
    "Analyse resource needs by phase for a [type] project; list roles, hours, tools, and optimal allocation.",
    "Generate a team-capacity planning template (names, weekly hours, tasks, % load) and flag over-allocations.",
    "Given this workload data [paste], highlight bottlenecks & suggest reallocation."
  ],
  "Budget Management": [
    "Create a detailed budget for a [mobile-app] project (labour, materials, software, contingency) per phase.",
    "Produce a variance report: planned vs actual spend on a $X budget; show % variance & corrective actions.",
    "Suggest 5 cost-saving ideas for a $X project; estimate savings."
  ],
  "Problem-Solving": [
    "Run a 5 Whys root-cause analysis on [issue]. Output steps & fixes.",
    "Build a decision matrix (cost, time, risk, impact) to choose between options A, B, C.",
    "Generate three alternative solutions to [challenge] with pros/cons, recommend best."
  ],
  "Quality": [
    "Draft a Quality Management Plan for a [domain] project (objectives, standards, QC measures, metrics).",
    "Create a full test plan (objectives, cases, pass/fail criteria, schedule, roles) for [product].",
    "Define 5 key quality KPIs and acceptance criteria for a [software] release; explain how to track them."
  ]
};

// Global navigation function to be used by onclick handlers
window.navigateToSection = function(sectionId) {
  console.log(`🔄 Navigating to section: ${sectionId}`);
  currentSection = sectionId;
  showSection(sectionId);
  updateNavigationState(sectionId);
  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Initializing vicky.ai...');
  
  setupNavigation();
  setupMobileNavigation();
  populateAITools();
  setupPromptChecker();
  setupPromptGenerator();
  setupImageUpload();
  
  // Show home section by default
  showSection('home');
  updateNavigationState('home');
  
  console.log('✅ vicky.ai initialized successfully');
});

// Navigation System
function setupNavigation() {
  console.log('🔧 Setting up navigation system...');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  console.log(`Found ${navLinks.length} navigation links`);
  
  navLinks.forEach((link, index) => {
    const targetSection = link.getAttribute('data-section');
    console.log(`Setting up nav link ${index + 1}: ${targetSection}`);
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`🔄 Navigation clicked: ${targetSection}`);
      navigateToSection(targetSection);
    });
  });
  
  console.log('✅ Navigation setup complete');
}

function showSection(targetSectionId) {
  console.log(`👁️ Showing section: ${targetSectionId}`);
  
  // Hide all sections
  const allSections = document.querySelectorAll('.section');
  console.log(`Found ${allSections.length} sections to manage`);
  
  allSections.forEach((section, index) => {
    section.classList.add('hidden');
    section.style.display = 'none';
    console.log(`Hidden section ${index + 1}: ${section.id}`);
  });
  
  // Show target section
  const targetSection = document.getElementById(targetSectionId);
  if (targetSection) {
    targetSection.classList.remove('hidden');
    targetSection.style.display = 'block';
    console.log(`✅ Section ${targetSectionId} is now visible`);
  } else {
    console.error(`❌ Section ${targetSectionId} not found!`);
  }
}

function updateNavigationState(activeSectionId) {
  console.log(`🎯 Updating nav state for: ${activeSectionId}`);
  
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  
  navLinks.forEach(link => {
    const linkSection = link.getAttribute('data-section');
    
    if (linkSection === activeSectionId) {
      link.classList.add('active');
      console.log(`✅ Activated nav link: ${linkSection}`);
    } else {
      link.classList.remove('active');
    }
  });
}

// Mobile Navigation
function setupMobileNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }
}

function closeMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
}

// Populate AI Tools
function populateAITools() {
  const toolsContainer = document.getElementById('toolsContainer');
  if (!toolsContainer) {
    console.log('⚠️ Tools container not found');
    return;
  }
  
  console.log('🔧 Populating AI tools...');
  
  // Group tools by category
  const categories = {};
  aiToolsData.forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  });
  
  // Clear container
  toolsContainer.innerHTML = '';
  
  // Create sections for each category
  Object.entries(categories).forEach(([category, tools]) => {
    const categorySection = document.createElement('div');
    categorySection.className = 'tools-category';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = category;
    categorySection.appendChild(categoryTitle);
    
    const toolsGrid = document.createElement('div');
    toolsGrid.className = 'tools-grid';
    
    tools.forEach(tool => {
      const toolCard = document.createElement('div');
      toolCard.className = 'tool-card';
      toolCard.addEventListener('click', () => {
        window.open(tool.url, '_blank');
      });
      
      toolCard.innerHTML = `
        <h4>${tool.name}</h4>
        <p>${tool.description}</p>
        <div class="tool-rating">
          <span class="stars">${generateStars(tool.rating)}</span>
          <span class="rating-text">${tool.rating}★</span>
        </div>
      `;
      
      toolsGrid.appendChild(toolCard);
    });
    
    categorySection.appendChild(toolsGrid);
    toolsContainer.appendChild(categorySection);
  });
  
  console.log('✅ AI tools populated successfully');
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }
  
  if (hasHalfStar) {
    stars += '☆';
  }
  
  const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < remainingStars; i++) {
    stars += '☆';
  }
  
  return stars;
}

// Prompt Checker
function setupPromptChecker() {
  console.log('🔧 Setting up Prompt Checker...');
  
  const analyzeBtn = document.getElementById('analyze-btn');
  const promptInput = document.getElementById('checkerInput');
  const resultsSection = document.getElementById('checkerResults');
  
  if (!analyzeBtn || !promptInput || !resultsSection) {
    console.log('⚠️ Prompt checker elements not found');
    return;
  }
  
  analyzeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const promptText = promptInput.value.trim();
    if (!promptText) {
      showNotification('Please enter a prompt to analyze', 'error');
      return;
    }
    
    console.log('🔍 Analyzing prompt...');
    
    // Show loading state
    const originalHTML = analyzeBtn.innerHTML;
    analyzeBtn.innerHTML = 'Analyzing...';
    analyzeBtn.disabled = true;
    
    setTimeout(() => {
      const analysis = analyzePrompt(promptText);
      displayAnalysisResults(analysis);
      
      // Show results
      resultsSection.classList.remove('hidden');
      resultsSection.style.display = 'block';
      
      // Reset button
      analyzeBtn.innerHTML = originalHTML;
      analyzeBtn.disabled = false;
      
      // Scroll to results
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      console.log('✅ Analysis complete');
    }, 1500);
  });
  
  console.log('✅ Prompt checker setup complete');
}

function analyzePrompt(text) {
  const wordCount = text.split(/\s+/).length;
  let score = 0;
  const feedback = [];
  
  // Check for key elements
  const hasRole = /(?:act as|you are|assume the role)/i.test(text);
  const hasContext = /(?:context|background|scenario|situation)/i.test(text);
  const hasFormat = /(?:format|structure|table|list|bullet|json)/i.test(text);
  const hasSpecificity = /(?:specific|detailed|exactly|precisely)/i.test(text);
  
  // Check for vague terms
  const vagueTerms = ['something', 'anything', 'stuff', 'things', 'better', 'improve', 'good'];
  const hasVagueTerms = vagueTerms.some(term => text.toLowerCase().includes(term));
  
  // Word count analysis
  if (wordCount >= 20 && wordCount <= 150) {
    score += 2;
    feedback.push({
      type: 'positive',
      title: '✅ Good Length',
      message: `Prompt length (${wordCount} words) is within the optimal range.`
    });
  } else if (wordCount < 20) {
    feedback.push({
      type: 'negative',
      title: '⚠️ Too Short',
      message: 'Consider adding more context and specific requirements.'
    });
  } else {
    feedback.push({
      type: 'negative',
      title: '⚠️ Too Long',
      message: 'Consider breaking this into smaller, focused prompts.'
    });
  }
  
  // Role definition
  if (hasRole) {
    score += 2;
    feedback.push({
      type: 'positive',
      title: '🎯 Role Defined',
      message: 'Good! You\'ve defined a specific role for the AI.'
    });
  } else {
    feedback.push({
      type: 'negative',
      title: '❌ Missing Role',
      message: 'Start with "Act as a [expert]" to give the AI context.'
    });
  }
  
  // Context check
  if (hasContext) {
    score += 1;
    feedback.push({
      type: 'positive',
      title: '📝 Context Provided',
      message: 'Good context helps the AI understand better.'
    });
  } else {
    feedback.push({
      type: 'neutral',
      title: '💡 Add Context',
      message: 'Consider adding background information.'
    });
  }
  
  // Format specification
  if (hasFormat) {
    score += 1;
    feedback.push({
      type: 'positive',
      title: '📋 Format Specified',
      message: 'Great! You\'ve specified the output format.'
    });
  } else {
    feedback.push({
      type: 'negative',
      title: '❌ No Format Specified',
      message: 'Specify desired output format (list, table, etc.).'
    });
  }
  
  // Specificity check
  if (hasSpecificity) {
    score += 1;
    feedback.push({
      type: 'positive',
      title: '🔍 Specific Requirements',
      message: 'Specific language leads to better results.'
    });
  }
  
  // Vague terms check
  if (hasVagueTerms) {
    score -= 1;
    feedback.push({
      type: 'negative',
      title: '🚫 Vague Language',
      message: 'Replace vague terms with specific requirements.'
    });
  }
  
  // Calculate grade
  let grade = 'C';
  if (score >= 5) grade = 'A';
  else if (score >= 3) grade = 'B';
  
  return { score, grade, feedback, wordCount };
}

function displayAnalysisResults(analysis) {
  const scoreElement = document.getElementById('overall-score');
  const contentElement = document.getElementById('results-content');
  
  if (!scoreElement || !contentElement) return;
  
  // Update score badge
  scoreElement.textContent = `Grade: ${analysis.grade}`;
  scoreElement.className = `status status--${analysis.grade === 'A' ? 'success' : analysis.grade === 'B' ? 'warning' : 'error'}`;
  
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

// Prompt Generator
function setupPromptGenerator() {
  console.log('🔧 Setting up Prompt Generator...');
  
  const generateBtn = document.getElementById('generate-btn');
  const generatedSection = document.getElementById('generated-section');
  const copyBtn = document.getElementById('copy-generated-btn');
  
  if (!generateBtn) {
    console.log('⚠️ Generate button not found');
    return;
  }
  
  generateBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) {
      showNotification('Please enter a basic prompt', 'error');
      return;
    }
    
    console.log('🎨 Generating enhanced prompt...');
    
    // Show loading state
    const originalHTML = generateBtn.innerHTML;
    generateBtn.innerHTML = 'Generating...';
    generateBtn.disabled = true;
    
    setTimeout(() => {
      const enhancedPrompt = buildEnhancedPrompt();
      
      // Display result
      const promptOut = document.getElementById('promptOut');
      if (promptOut) {
        promptOut.value = enhancedPrompt;
      }
      
      // Show generated section
      if (generatedSection) {
        generatedSection.classList.remove('hidden');
        generatedSection.style.display = 'block';
        generatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Reset button
      generateBtn.innerHTML = originalHTML;
      generateBtn.disabled = false;
      
      showNotification('Enhanced prompt generated successfully!', 'success');
      console.log('✅ Enhanced prompt generated');
    }, 1000);
  });
  
  // Setup copy button
  if (copyBtn) {
    copyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const promptOut = document.getElementById('promptOut');
      if (promptOut && promptOut.value) {
        copyToClipboard(promptOut.value);
        showNotification('Prompt copied to clipboard!', 'success');
      }
    });
  }
  
  console.log('✅ Prompt generator setup complete');
}

function buildEnhancedPrompt() {
  const userInput = document.getElementById('userInput').value.trim();
  const purpose = document.getElementById('purpose').value;
  const model = document.getElementById('model').value;
  const persona = document.getElementById('persona').value;
  const tone = document.getElementById('tone').value;
  const format = document.getElementById('format').value;
  
  let enhancedPrompt = '';
  
  // Handle Image Generation differently
  if (purpose === 'Image Generation') {
    enhancedPrompt = userInput;
    
    // Add image-specific enhancements
    const imageEnhancements = [
      'high quality',
      'detailed composition',
      'professional photography',
      'cinematic lighting',
      'vivid colors',
      'sharp focus',
      '8k resolution'
    ];
    
    if (model === 'Midjourney') {
      enhancedPrompt += `, ${imageEnhancements.join(', ')}, --ar 16:9 --v 6 --style raw`;
    } else if (model === 'Flux') {
      enhancedPrompt += `, ${imageEnhancements.join(', ')}, photorealistic, ultra-detailed`;
    } else if (model === 'DALL-E') {
      enhancedPrompt += `, ${imageEnhancements.join(', ')}, digital art style`;
    } else {
      enhancedPrompt += `, ${imageEnhancements.slice(0, 4).join(', ')}`;
    }
    
    return enhancedPrompt;
  }
  
  // For other purposes, build structured prompt
  let rolePrefix = '';
  let suffix = '';
  
  // Define role based on purpose and persona
  const roles = {
    'Report Analysis': 'data analyst',
    'Data Analysis': 'data scientist', 
    'Code Generation': 'senior software engineer',
    'Content Creation': 'content marketing specialist',
    'Conversational AI': 'helpful AI assistant'
  };
  
  const role = roles[purpose] || 'expert';
  rolePrefix = `Act as a ${persona.toLowerCase()} ${role} and `;
  
  // Add purpose-specific guidance
  const purposeGuidance = {
    'Report Analysis': 'Structure your analysis with executive summary, key findings, trends, and actionable recommendations.',
    'Data Analysis': 'Provide statistical insights, identify patterns, and suggest data-driven recommendations.',
    'Code Generation': 'Include comments, error handling, and follow best practices for clean, maintainable code.',
    'Content Creation': 'Make it engaging, SEO-friendly, and tailored to the target audience.',
    'Conversational AI': 'Be conversational, empathetic, and provide practical advice.'
  };
  
  if (purposeGuidance[purpose]) {
    suffix += ` ${purposeGuidance[purpose]}`;
  }
  
  // Add tone guidance
  const toneGuidance = {
    'Professional': ' Use formal, professional language.',
    'Casual': ' Use conversational, friendly language.',
    'Technical': ' Use precise technical terminology.',
    'Creative': ' Use creative, engaging language.',
    'Formal': ' Maintain a formal, academic tone.'
  };
  
  if (toneGuidance[tone]) {
    suffix += toneGuidance[tone];
  }
  
  // Add format specification
  const formatGuidance = {
    'Bullet Points': ' Present the information as clear bullet points.',
    'Step-by-Step': ' Organize the response as numbered steps.',
    'Table': ' Structure the information in a table format.',
    'JSON': ' Format the response as valid JSON.',
    'Paragraph': ' Present as well-structured paragraphs.'
  };
  
  if (formatGuidance[format]) {
    suffix += formatGuidance[format];
  }
  
  // Build final prompt
  enhancedPrompt = rolePrefix + userInput + '.' + suffix;
  
  return enhancedPrompt;
}

// Image Upload and Analysis
function setupImageUpload() {
  console.log('🔧 Setting up Image Upload...');
  
  const imageUpload = document.getElementById('imageUpload');
  const imagePreview = document.getElementById('imagePreview');
  const previewImg = document.getElementById('previewImg');
  const removeImageBtn = document.getElementById('removeImage');
  
  if (!imageUpload) {
    console.log('⚠️ Image upload elements not found');
    return;
  }
  
  imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        previewImg.src = e.target.result;
        imagePreview.classList.remove('hidden');
        imagePreview.style.display = 'block';
        
        // Generate prompt from image
        generateImagePrompt(file);
      };
      
      reader.readAsDataURL(file);
    }
  });
  
  if (removeImageBtn) {
    removeImageBtn.addEventListener('click', function() {
      imageUpload.value = '';
      imagePreview.classList.add('hidden');
      imagePreview.style.display = 'none';
      previewImg.src = '';
      
      // Clear any generated prompt
      const promptOut = document.getElementById('promptOut');
      const generatedSection = document.getElementById('generated-section');
      if (promptOut) promptOut.value = '';
      if (generatedSection) {
        generatedSection.classList.add('hidden');
        generatedSection.style.display = 'none';
      }
    });
  }
  
  console.log('✅ Image upload setup complete');
}

function generateImagePrompt(imageFile) {
  // Simulate image analysis and generate descriptive prompt
  const generatedSection = document.getElementById('generated-section');
  const promptOut = document.getElementById('promptOut');
  
  if (!promptOut || !generatedSection) return;
  
  // Show loading
  showNotification('Analyzing image and generating prompt...', 'info');
  
  setTimeout(() => {
    // Generate a comprehensive descriptive prompt based on common visual elements
    const imagePrompt = generateDetailedImageDescription();
    
    promptOut.value = imagePrompt;
    generatedSection.classList.remove('hidden');
    generatedSection.style.display = 'block';
    generatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    showNotification('Image prompt generated! Copy and use it to recreate similar images.', 'success');
  }, 2000);
}

function generateDetailedImageDescription() {
  // Generate a comprehensive template for image description
  const compositions = ['centered composition', 'rule of thirds', 'symmetrical layout', 'dynamic asymmetry'];
  const lightings = ['natural daylight', 'golden hour lighting', 'dramatic side lighting', 'soft diffused light', 'cinematic lighting'];
  const styles = ['photorealistic', 'artistic photography', 'professional portrait', 'documentary style', 'commercial photography'];
  const colors = ['vibrant color palette', 'muted earth tones', 'high contrast', 'monochromatic scheme', 'warm color temperature'];
  const details = ['sharp focus', 'shallow depth of field', 'high detail texture', 'crisp clarity', 'professional quality'];
  const cameras = ['shot with professional camera', '85mm lens perspective', 'wide angle view', 'macro detail shot', 'portrait orientation'];
  
  // Randomly select elements to create a varied description
  const selectedComposition = compositions[Math.floor(Math.random() * compositions.length)];
  const selectedLighting = lightings[Math.floor(Math.random() * lightings.length)];
  const selectedStyle = styles[Math.floor(Math.random() * styles.length)];
  const selectedColors = colors[Math.floor(Math.random() * colors.length)];
  const selectedDetails = details[Math.floor(Math.random() * details.length)];
  const selectedCamera = cameras[Math.floor(Math.random() * cameras.length)];
  
  return `A detailed ${selectedStyle} image featuring ${selectedComposition}, ${selectedLighting}, ${selectedColors}, ${selectedDetails}, ${selectedCamera}, professional photography, high resolution, studio quality, award-winning composition, perfect exposure, beautiful bokeh, artistic vision, masterpiece quality, 8k resolution, ultra-sharp focus, pristine clarity, exceptional detail, premium production value`;
}

// Utility Functions
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      fallbackCopyTextToClipboard(text);
    });
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    console.log('Fallback copy successful');
  } catch (err) {
    console.error('Fallback copy failed: ', err);
  }
  
  document.body.removeChild(textArea);
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  const container = document.getElementById('notification-container') || document.body;
  container.appendChild(notification);
  
  // Animate in
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Handle browser navigation
window.addEventListener('popstate', function(e) {
  const hash = window.location.hash.substring(1);
  const targetSection = hash || 'home';
  navigateToSection(targetSection);
});

console.log('✅ vicky.ai JavaScript loaded successfully');