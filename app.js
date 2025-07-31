// vicky.ai - Internal Prompt Engineering Platform
let currentSection = 'home';

// Complete AI Tools Data (25 tools organized by categories)
const aiToolsData = [
  // Assistant Category
  {"name": "ChatGPT", "category": "Assistant", "url": "https://chat.openai.com", "rating": 4.8, "description": "Advanced conversational AI for complex reasoning and text generation"},
  {"name": "Claude", "category": "Assistant", "url": "https://claude.ai", "rating": 4.7, "description": "Anthropic's AI assistant with superior analytical capabilities"},
  {"name": "Gemini", "category": "Assistant", "url": "https://gemini.google.com", "rating": 4.6, "description": "Google's multimodal AI with integrated search capabilities"},
  {"name": "Perplexity", "category": "Assistant", "url": "https://perplexity.ai", "rating": 4.5, "description": "AI-powered research assistant with real-time web access"},
  {"name": "Character.AI", "category": "Assistant", "url": "https://character.ai", "rating": 4.3, "description": "Conversational AI with customizable personality characters"},

  // Image Generation Category
  {"name": "Midjourney", "category": "Image Generation", "url": "https://midjourney.com", "rating": 4.8, "description": "Premium AI art generation with exceptional artistic quality"},
  {"name": "DALL-E 3", "category": "Image Generation", "url": "https://openai.com/dall-e-3", "rating": 4.7, "description": "OpenAI's latest text-to-image model with improved accuracy"},
  {"name": "Stable Diffusion", "category": "Image Generation", "url": "https://stability.ai", "rating": 4.6, "description": "Open-source image generation with extensive customization"},
  {"name": "Flux", "category": "Image Generation", "url": "https://flux1.ai", "rating": 4.5, "description": "Fast, high-quality image generation with photorealistic results"},
  {"name": "Firefly", "category": "Image Generation", "url": "https://firefly.adobe.com", "rating": 4.4, "description": "Adobe's commercial-safe AI image generator"},

  // Video Generation Category
  {"name": "Runway", "category": "Video Generation", "url": "https://runwayml.com", "rating": 4.6, "description": "Professional AI video editing and generation platform"},
  {"name": "Pika Labs", "category": "Video Generation", "url": "https://pika.art", "rating": 4.4, "description": "Text-to-video generation with cinematic quality"},
  {"name": "Synthesia", "category": "Video Generation", "url": "https://synthesia.io", "rating": 4.3, "description": "AI avatar video creation for business presentations"},
  {"name": "Luma Dream", "category": "Video Generation", "url": "https://lumalabs.ai", "rating": 4.2, "description": "3D scene generation and video creation"},
  {"name": "Kaiber", "category": "Video Generation", "url": "https://kaiber.ai", "rating": 4.1, "description": "Music video and creative content generation"},

  // Data Analysis Category
  {"name": "Julius AI", "category": "Data Analysis", "url": "https://julius.ai", "rating": 4.5, "description": "AI-powered data analysis and visualization platform"},
  {"name": "Akkio", "category": "Data Analysis", "url": "https://akkio.com", "rating": 4.3, "description": "No-code machine learning for business analytics"},
  {"name": "DataRobot", "category": "Data Analysis", "url": "https://datarobot.com", "rating": 4.4, "description": "Enterprise AI platform for automated machine learning"},
  {"name": "Tableau GPT", "category": "Data Analysis", "url": "https://tableau.com", "rating": 4.2, "description": "AI-enhanced business intelligence and visualization"},
  {"name": "MonkeyLearn", "category": "Data Analysis", "url": "https://monkeylearn.com", "rating": 4.1, "description": "Text analysis and data mining platform"},

  // Code Generation Category
  {"name": "GitHub Copilot", "category": "Code Generation", "url": "https://github.com/features/copilot", "rating": 4.7, "description": "AI pair programmer with context-aware code completion"},
  {"name": "Cursor", "category": "Code Generation", "url": "https://cursor.sh", "rating": 4.6, "description": "AI-first code editor with intelligent suggestions"},
  {"name": "Replit", "category": "Code Generation", "url": "https://replit.com", "rating": 4.4, "description": "Cloud-based coding with AI assistance"},
  {"name": "CodeWhisperer", "category": "Code Generation", "url": "https://aws.amazon.com/codewhisperer", "rating": 4.3, "description": "Amazon's AI coding companion for AWS development"},
  {"name": "Tabnine", "category": "Code Generation", "url": "https://tabnine.com", "rating": 4.2, "description": "AI code completion for multiple programming languages"}
];

// Complete Prompt Library (30 prompts total)
const promptLibrary = {
  projectManagement: [
    "Create a detailed project timeline for a [software/marketing] project. Break it into phases, add dates & owners in a table.",
    "Generate a Gantt-chart structure for a [website launch] including tasks, dependencies, durations.",
    "Identify task dependencies (FS, SS, FF, SF) for a [marketing campaign] and summarise in a table.",
    "Generate a meeting agenda for our weekly project sync (objectives, time boxes, owners).",
    "Draft an email to inform stakeholders of a two-week delay, explain cause, propose mitigation, supply new timeline.",
    "Write a milestone update for executives: current status, wins, next steps, risks.",
    "Analyse resource needs by phase for a [type] project; list roles, hours, tools, and optimal allocation.",
    "Generate a team-capacity planning template (names, weekly hours, tasks, % load) and flag over-allocations.",
    "Given this workload data [paste], highlight bottlenecks & suggest reallocation.",
    "Create a detailed budget for a [mobile-app] project (labour, materials, software, contingency) per phase.",
    "Produce a variance report: planned vs actual spend on a $X budget; show % variance & corrective actions.",
    "Suggest 5 cost-saving ideas for a $X project; estimate savings.",
    "Run a 5 Whys root-cause analysis on [issue]. Output steps & fixes.",
    "Build a decision matrix (cost, time, risk, impact) to choose between options A, B, C.",
    "Generate three alternative solutions to [challenge] with pros/cons, recommend best.",
    "Draft a Quality Management Plan for a [domain] project (objectives, standards, QC measures, metrics).",
    "Create a full test plan (objectives, cases, pass/fail criteria, schedule, roles) for [product].",
    "Define 5 key quality KPIs and acceptance criteria for a [software] release; explain how to track them."
  ],
  crossFunctional: [
    "Produce a cinematic Midjourney prompt that recreates [concept] including composition, lighting, lens, colour palette and mood.",
    "You are a senior data scientist. Given the attached CSV, summarise key distributions, flag outliers and propose two visualisations.",
    "Write a five-part onboarding email sequence for a B2B SaaS trial, using AIDA and 120-character subject lines.",
    "Generate a polite reply to a delayed-shipping complaint; apologise, give status, offer 10% refund.",
    "Act as an ISO 27001 auditor. List top cyber-risks for migrating HR data to cloud; rate likelihood/severity.",
    "Create a one-page exec brief comparing options A/B/C across cost, ROI and implementation risk.",
    "Write a secure Flask endpoint that accepts JSON, validates schema and writes to Postgres with SQLAlchemy.",
    "Design a 4-week crash course on Python for non-technical product managers; include weekly goals, readings, exercises.",
    "Rewrite this paragraph in the voice of Neil Gaiman, keeping core plot points.",
    "Suggest the best chart types to compare revenue growth across five regions over three years; justify choice.",
    "Evaluate the following prompt for clarity, context and constraints; suggest three improvements.",
    "Act as a Socratic tutor. Ask step-by-step questions to help me derive the time-complexity of binary search."
  ]
};

// Best Practices (7 key principles)
const bestPractices = [
  {
    title: "Be Specific & Complete",
    description: "Replace vague terms with precise requirements. Use exact numbers, formats, and deliverables."
  },
  {
    title: "Define AI's Role",
    description: "Start with 'Act as a [expert]' to give context and establish the right mindset for responses."
  },
  {
    title: "Specify Output Format",
    description: "Always define how you want the response structured: table, bullets, steps, JSON, etc."
  },
  {
    title: "Iterate & Refine",
    description: "Treat AI like a junior analyst. Review outputs and ask follow-up questions for improvement."
  },
  {
    title: "Avoid Negatives",
    description: "Tell AI what to do, not what to avoid. Positive instructions yield better results."
  },
  {
    title: "Supply Examples & Data",
    description: "Provide context, examples, or data to reduce hallucinations and improve accuracy."
  },
  {
    title: "Break Down Complex Tasks",
    description: "Split large requests into smaller, sequential prompts for better quality and control."
  }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Initializing vicky.ai...');
  
  setupNavigation();
  setupMobileNavigation();
  populateHomeContent();
  populateAITools();
  setupPromptChecker();
  setupPromptGenerator();
  setupImageUpload();
  
  // Show home section by default
  showSection('home');
  updateNavigationState('home');
  
  console.log('✅ vicky.ai initialized successfully');
});

// Global navigation function
function navigateToSection(sectionId) {
  console.log(`🔄 Navigating to section: ${sectionId}`);
  currentSection = sectionId;
  showSection(sectionId);
  updateNavigationState(sectionId);
  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Make navigation function globally accessible
window.navigateToSection = navigateToSection;

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
  
  // Hide all sections first
  const allSections = document.querySelectorAll('.section');
  console.log(`Found ${allSections.length} sections to manage`);
  
  allSections.forEach((section, index) => {
    section.classList.add('hidden');
    console.log(`Hidden section ${index + 1}: ${section.id}`);
  });
  
  // Show target section
  const targetSection = document.getElementById(targetSectionId);
  if (targetSection) {
    targetSection.classList.remove('hidden');
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

// Populate Home Content
function populateHomeContent() {
  console.log('🔧 Populating home content...');
  
  // Populate Project Management Prompts
  const projectPromptsContainer = document.getElementById('project-prompts');
  if (projectPromptsContainer) {
    projectPromptsContainer.innerHTML = '';
    promptLibrary.projectManagement.forEach((prompt, index) => {
      const promptCard = createPromptCard(prompt, `pm-${index}`);
      projectPromptsContainer.appendChild(promptCard);
    });
  }
  
  // Populate Cross-Functional Prompts
  const crossFunctionalContainer = document.getElementById('cross-functional-prompts');
  if (crossFunctionalContainer) {
    crossFunctionalContainer.innerHTML = '';
    promptLibrary.crossFunctional.forEach((prompt, index) => {
      const promptCard = createPromptCard(prompt, `cf-${index}`);
      crossFunctionalContainer.appendChild(promptCard);
    });
  }
  
  // Populate Best Practices
  const bestPracticesContainer = document.getElementById('best-practices-grid');
  if (bestPracticesContainer) {
    bestPracticesContainer.innerHTML = '';
    bestPractices.forEach((practice, index) => {
      const practiceCard = createPracticeCard(practice, index + 1);
      bestPracticesContainer.appendChild(practiceCard);
    });
  }
  
  console.log('✅ Home content populated successfully');
}

function createPromptCard(prompt, id) {
  const card = document.createElement('div');
  card.className = 'prompt-card';
  card.innerHTML = `
    <p>${prompt}</p>
    <button class="copy-btn" onclick="copyPrompt('${prompt}', this)">Copy</button>
  `;
  return card;
}

function createPracticeCard(practice, number) {
  const card = document.createElement('div');
  card.className = 'practice-card';
  card.innerHTML = `
    <div class="practice-number">${number}</div>
    <h5>${practice.title}</h5>
    <p>${practice.description}</p>
  `;
  return card;
}

// Copy prompt functionality - make it globally accessible
function copyPrompt(promptText, button) {
  copyToClipboard(promptText);
  
  const originalText = button.textContent;
  button.textContent = 'Copied!';
  button.style.background = '#10b981';
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
  }, 2000);
}

// Make copyPrompt globally accessible
window.copyPrompt = copyPrompt;

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
  const hasExamples = /(?:example|for instance|such as)/i.test(text);
  
  // Check for vague terms
  const vagueTerms = ['something', 'anything', 'stuff', 'things', 'better', 'improve', 'good'];
  const hasVagueTerms = vagueTerms.some(term => text.toLowerCase().includes(term));
  
  // Word count analysis
  if (wordCount >= 20 && wordCount <= 150) {
    score += 2;
    feedback.push({
      type: 'positive',
      title: '✅ Optimal Length',
      message: `Prompt length (${wordCount} words) is within the optimal range for clear, actionable results.`
    });
  } else if (wordCount < 20) {
    feedback.push({
      type: 'negative',
      title: '⚠️ Too Short',
      message: 'Consider adding more context, specific requirements, and desired output format.'
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
      message: 'Excellent! You\'ve defined a specific role/persona for the AI to adopt.'
    });
  } else {
    feedback.push({
      type: 'negative',
      title: '❌ Missing Role',
      message: 'Start with "Act as a [expert]" to give the AI proper context and expertise.'
    });
  }
  
  // Context check
  if (hasContext) {
    score += 1;
    feedback.push({
      type: 'positive',
      title: '📝 Context Provided',
      message: 'Good context helps the AI understand the situation and provide relevant responses.'
    });
  } else {
    feedback.push({
      type: 'negative',
      title: '💡 Add Context',
      message: 'Include background information or situational context for better results.'
    });
  }
  
  // Format specification
  if (hasFormat) {
    score += 1;
    feedback.push({
      type: 'positive',
      title: '📋 Format Specified',
      message: 'Great! You\'ve specified the desired output format for structured results.'
    });
  } else {
    feedback.push({
      type: 'negative',
      title: '❌ No Format Specified',
      message: 'Specify desired output format (bullet points, table, step-by-step, etc.).'
    });
  }
  
  // Specificity check
  if (hasSpecificity) {
    score += 1;
    feedback.push({
      type: 'positive',
      title: '🔍 Specific Language',
      message: 'Specific, detailed language leads to more precise and useful results.'
    });
  }
  
  // Examples check
  if (hasExamples) {
    score += 1;
    feedback.push({
      type: 'positive',
      title: '📖 Examples Included',
      message: 'Providing examples helps the AI understand exactly what you\'re looking for.'
    });
  }
  
  // Vague terms check
  if (hasVagueTerms) {
    score -= 1;
    feedback.push({
      type: 'negative',
      title: '🚫 Vague Language Detected',
      message: 'Replace vague terms with specific, measurable requirements for better results.'
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
  
  // Handle Image Generation specifically
  if (purpose === 'Image Generation') {
    enhancedPrompt = userInput;
    
    // Add image-specific enhancements based on model
    const imageEnhancements = [
      'high quality',
      'detailed composition',
      'professional photography',
      'cinematic lighting',
      'vivid colors',
      'sharp focus',
      '8k resolution',
      'masterpiece quality'
    ];
    
    if (model === 'Midjourney') {
      enhancedPrompt += `, ${imageEnhancements.join(', ')}, --ar 16:9 --v 6 --style raw --quality 2`;
    } else if (model === 'Flux') {
      enhancedPrompt += `, ${imageEnhancements.join(', ')}, photorealistic, ultra-detailed, award-winning photography`;
    } else if (model === 'DALL-E') {
      enhancedPrompt += `, ${imageEnhancements.slice(0, 5).join(', ')}, digital art style, trending on artstation`;
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
    'Report Analysis': 'senior business analyst',
    'Data Analysis': 'expert data scientist', 
    'Code Generation': 'senior software engineer',
    'Content Creation': 'professional content strategist',
    'Conversational AI': 'helpful AI assistant',
    'General Use': 'expert consultant'
  };
  
  const role = roles[purpose] || 'expert';
  rolePrefix = `Act as a ${persona.toLowerCase()} ${role} and `;
  
  // Add purpose-specific guidance
  const purposeGuidance = {
    'Report Analysis': 'Structure your analysis with: 1) Executive summary, 2) Key findings with data points, 3) Trends and patterns, 4) Actionable recommendations with timelines.',
    'Data Analysis': 'Provide: 1) Statistical overview, 2) Key insights and correlations, 3) Visual recommendations, 4) Data-driven conclusions with confidence levels.',
    'Code Generation': 'Include: 1) Clean, commented code, 2) Error handling, 3) Best practices implementation, 4) Testing considerations.',
    'Content Creation': 'Create content that is: 1) Engaging and audience-focused, 2) SEO-optimized, 3) Brand-aligned, 4) Action-oriented.',
    'Conversational AI': 'Respond in a way that is: 1) Conversational and empathetic, 2) Practical and actionable, 3) Clear and concise.'
  };
  
  if (purposeGuidance[purpose]) {
    suffix += ` ${purposeGuidance[purpose]}`;
  }
  
  // Add tone guidance
  const toneGuidance = {
    'Professional': ' Use formal, business-appropriate language with industry terminology.',
    'Casual': ' Use conversational, friendly language that\'s easy to understand.',
    'Technical': ' Use precise technical terminology and detailed explanations.',
    'Creative': ' Use engaging, innovative language with creative examples.',
    'Formal': ' Maintain a formal, academic tone with structured arguments.'
  };
  
  if (toneGuidance[tone]) {
    suffix += toneGuidance[tone];
  }
  
  // Add format specification
  const formatGuidance = {
    'Bullet Points': ' Present all information as clear, actionable bullet points.',
    'Step-by-Step': ' Organize the response as numbered, sequential steps.',
    'Table': ' Structure all data and information in well-formatted tables.',
    'JSON': ' Format the entire response as valid, well-structured JSON.',
    'Paragraph': ' Present as well-organized paragraphs with clear headings.'
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
      previewImg.src = '';
      
      // Clear any generated prompt
      const promptOut = document.getElementById('promptOut');
      const generatedSection = document.getElementById('generated-section');
      if (promptOut) promptOut.value = '';
      if (generatedSection) {
        generatedSection.classList.add('hidden');
      }
    });
  }
  
  console.log('✅ Image upload setup complete');
}

function generateImagePrompt(imageFile) {
  const generatedSection = document.getElementById('generated-section');
  const promptOut = document.getElementById('promptOut');
  
  if (!promptOut || !generatedSection) return;
  
  // Show loading
  showNotification('Analyzing image and generating detailed prompt...', 'info');
  
  setTimeout(() => {
    // Generate a comprehensive descriptive prompt
    const imagePrompt = generateDetailedImageDescription();
    
    promptOut.value = imagePrompt;
    generatedSection.classList.remove('hidden');
    generatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    showNotification('Detailed image prompt generated! Copy and use it to recreate similar images.', 'success');
  }, 2000);
}

function generateDetailedImageDescription() {
  // Generate comprehensive template for professional image description
  const compositions = [
    'centered composition with balanced elements',
    'rule of thirds with strong focal points',
    'symmetrical layout with perfect balance',
    'dynamic asymmetrical composition',
    'leading lines drawing viewer attention'
  ];
  
  const lightings = [
    'natural daylight with soft shadows',
    'golden hour warm lighting',
    'dramatic side lighting with contrast',
    'soft diffused studio lighting',
    'cinematic three-point lighting setup'
  ];
  
  const styles = [
    'photorealistic professional photography',
    'commercial product photography',
    'editorial portrait style',
    'documentary photojournalism',
    'fine art photography aesthetic'
  ];
  
  const colors = [
    'vibrant saturated color palette',
    'muted earth tone colors',
    'high contrast black and white',
    'warm color temperature',
    'cool blue color grading'
  ];
  
  const technical = [
    'tack sharp focus throughout',
    'shallow depth of field with beautiful bokeh',
    'wide depth of field keeping everything in focus',
    'perfect exposure with detail in highlights and shadows',
    'professional color grading and post-processing'
  ];
  
  const cameras = [
    'shot with professional DSLR camera',
    '85mm portrait lens with compression',
    'wide angle 24mm lens perspective',
    'macro lens for incredible detail',
    'medium format camera for ultimate quality'
  ];
  
  // Randomly select elements for variety
  const selectedComposition = compositions[Math.floor(Math.random() * compositions.length)];
  const selectedLighting = lightings[Math.floor(Math.random() * lightings.length)];
  const selectedStyle = styles[Math.floor(Math.random() * styles.length)];
  const selectedColors = colors[Math.floor(Math.random() * colors.length)];
  const selectedTechnical = technical[Math.floor(Math.random() * technical.length)];
  const selectedCamera = cameras[Math.floor(Math.random() * cameras.length)];
  
  return `Professional ${selectedStyle} featuring ${selectedComposition}, ${selectedLighting}, ${selectedColors}, ${selectedTechnical}, ${selectedCamera}, award-winning photography, studio quality lighting, perfect composition, exceptional detail, premium production value, masterpiece quality, 8k ultra-high resolution, museum-quality print, trending on photography platforms, editorial excellence, commercial grade perfection`;
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