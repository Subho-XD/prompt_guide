// Enhanced vicky.ai - Internal Prompt Engineering Platform
let currentSection = 'home';
let customTools = [];
let favoriteTools = [];
let savedPrompts = [];
let showingFavoritesOnly = false;

// Enhanced AI Tools Data with comprehensive categories
const defaultAITools = [
  // Conversational AI
  {"id": 1, "name": "ChatGPT", "category": "Conversational AI", "description": "Advanced conversational AI for complex reasoning and text generation", "url": "https://chat.openai.com", "rating": 4.8, "tags": ["text", "conversation", "analysis", "creative"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 2, "name": "Claude", "category": "Conversational AI", "description": "Anthropic's AI assistant with superior analytical capabilities", "url": "https://claude.ai", "rating": 4.7, "tags": ["conversation", "analysis", "writing", "research"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 3, "name": "Gemini", "category": "Conversational AI", "description": "Google's multimodal AI with integrated search capabilities", "url": "https://gemini.google.com", "rating": 4.6, "tags": ["conversation", "multimodal", "search", "analysis"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 4, "name": "Perplexity", "category": "Conversational AI", "description": "AI-powered research assistant with real-time web access", "url": "https://perplexity.ai", "rating": 4.5, "tags": ["research", "web", "realtime", "analysis"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Image Generation
  {"id": 5, "name": "Midjourney", "category": "Image Generation", "description": "Premium AI art generation with exceptional artistic quality", "url": "https://midjourney.com", "rating": 4.8, "tags": ["art", "images", "creative", "design"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 6, "name": "DALL-E 3", "category": "Image Generation", "description": "OpenAI's latest text-to-image model with improved accuracy", "url": "https://openai.com/dall-e-3", "rating": 4.7, "tags": ["images", "art", "generation", "openai"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 7, "name": "Flux", "category": "Image Generation", "description": "Fast, high-quality image generation with photorealistic results", "url": "https://flux1.ai", "rating": 4.6, "tags": ["images", "photorealistic", "fast", "quality"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 8, "name": "Stable Diffusion", "category": "Image Generation", "description": "Open-source image generation with extensive customization", "url": "https://stability.ai", "rating": 4.5, "tags": ["opensource", "customizable", "images", "art"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Video Generation
  {"id": 9, "name": "Synthesia", "category": "Video Generation", "description": "AI avatar video creation for business presentations", "url": "https://synthesia.io", "rating": 4.5, "tags": ["video", "avatars", "presentation", "business"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 10, "name": "RunwayML", "category": "Video Generation", "description": "Professional AI video editing and generation platform", "url": "https://runwayml.com", "rating": 4.4, "tags": ["video", "editing", "professional", "creative"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 11, "name": "Pika Labs", "category": "Video Generation", "description": "Text-to-video generation with cinematic quality", "url": "https://pika.art", "rating": 4.3, "tags": ["video", "cinematic", "generation", "creative"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Data Analysis
  {"id": 12, "name": "Julius AI", "category": "Data Analysis", "description": "AI-powered data analysis and visualization platform", "url": "https://julius.ai", "rating": 4.5, "tags": ["data", "analysis", "visualization", "business"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 13, "name": "DataRobot", "category": "Data Analysis", "description": "Enterprise AI platform for automated machine learning", "url": "https://datarobot.com", "rating": 4.4, "tags": ["enterprise", "ml", "automation", "analytics"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 14, "name": "Tableau AI", "category": "Data Analysis", "description": "AI-enhanced business intelligence and visualization", "url": "https://tableau.com", "rating": 4.3, "tags": ["business", "intelligence", "visualization", "analytics"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Coding
  {"id": 15, "name": "GitHub Copilot", "category": "Coding", "description": "AI pair programmer with context-aware code completion", "url": "https://github.com/features/copilot", "rating": 4.7, "tags": ["coding", "autocomplete", "github", "development"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 16, "name": "Cursor", "category": "Coding", "description": "AI-first code editor with intelligent suggestions", "url": "https://cursor.sh", "rating": 4.6, "tags": ["editor", "ai", "coding", "development"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 17, "name": "Codeium", "category": "Coding", "description": "Free AI coding assistant with multi-language support", "url": "https://codeium.com", "rating": 4.4, "tags": ["free", "multilingual", "coding", "assistant"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Writing
  {"id": 18, "name": "Jasper", "category": "Writing", "description": "AI content creation for marketing and business writing", "url": "https://jasper.ai", "rating": 4.4, "tags": ["content", "marketing", "business", "writing"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 19, "name": "Copy.ai", "category": "Writing", "description": "AI copywriting tool for various content types", "url": "https://copy.ai", "rating": 4.3, "tags": ["copywriting", "content", "marketing", "templates"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 20, "name": "Grammarly", "category": "Writing", "description": "AI-powered writing assistance and grammar checking", "url": "https://grammarly.com", "rating": 4.5, "tags": ["grammar", "writing", "editing", "productivity"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Design
  {"id": 21, "name": "Canva AI", "category": "Design", "description": "AI-enhanced design platform with smart templates", "url": "https://canva.com", "rating": 4.4, "tags": ["design", "templates", "graphics", "social"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 22, "name": "Figma AI", "category": "Design", "description": "AI features integrated into collaborative design platform", "url": "https://figma.com", "rating": 4.3, "tags": ["design", "collaboration", "ui", "prototyping"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Marketing
  {"id": 23, "name": "HubSpot AI", "category": "Marketing", "description": "AI-powered marketing automation and CRM platform", "url": "https://hubspot.com", "rating": 4.5, "tags": ["marketing", "automation", "crm", "analytics"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 24, "name": "AdCreative.ai", "category": "Marketing", "description": "AI-generated ad creatives and marketing materials", "url": "https://adcreative.ai", "rating": 4.2, "tags": ["ads", "creative", "marketing", "automation"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 25, "name": "Brandwatch", "category": "Marketing", "description": "AI-powered social media monitoring and analytics", "url": "https://brandwatch.com", "rating": 4.3, "tags": ["social", "monitoring", "analytics", "insights"], "isCustom": false, "dateAdded": "2025-01-27"}
];

// UNDERRATED AI TOOLS - Free, No Signup Required
const underratedAITools = [
  // Image Generation
  {"id": 101, "name": "Raphael AI", "category": "Image Generation", "description": "Free unlimited AI art generation with no signup required", "url": "https://raphaelai.org", "rating": 4.7, "tags": ["free", "no-signup", "unlimited", "art"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 102, "name": "AIGAZOU", "category": "Image Generation", "description": "Japanese AI image generator with multilingual support", "url": "https://muryou-aigazou.com/en", "rating": 4.5, "tags": ["free", "multilingual", "japanese", "image"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 103, "name": "Magic Hour Image Gen", "category": "Image Generation", "description": "Fast AI image generation with various styles", "url": "https://magichour.ai/products/ai-image-generator", "rating": 4.3, "tags": ["fast", "styles", "generator", "creative"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 104, "name": "Nuelink Image Gen", "category": "Image Generation", "description": "Simple AI image generator for social media", "url": "https://nuelink.com/tools/ai-image-generator", "rating": 4.2, "tags": ["social", "simple", "marketing", "images"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Conversational AI
  {"id": 105, "name": "DuckDuckGo AI Chat", "category": "Conversational AI", "description": "Private, anonymous AI chat with no tracking", "url": "https://duck.ai", "rating": 4.6, "tags": ["private", "anonymous", "no-tracking", "chat"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 106, "name": "Anon ChatGPT", "category": "Conversational AI", "description": "Anonymous access to ChatGPT without registration", "url": "https://deepgram.com/ai-apps/anonchatgpt", "rating": 4.5, "tags": ["anonymous", "free", "gpt", "no-signup"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 107, "name": "HotBot ChatGPT", "category": "Conversational AI", "description": "Free ChatGPT access through HotBot search", "url": "https://www.hotbot.com/free-chatgpt", "rating": 4.4, "tags": ["free", "search", "chatgpt", "accessible"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 108, "name": "EaseMate AI", "category": "Conversational AI", "description": "Free AI assistant for productivity and help", "url": "https://www.easemate.ai/chatgpt-free", "rating": 4.3, "tags": ["productivity", "assistant", "free", "help"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 109, "name": "QuillBot AI Chat", "category": "Conversational AI", "description": "AI chat with writing and paraphrasing focus", "url": "https://quillbot.com/ai-chat", "rating": 4.2, "tags": ["writing", "paraphrasing", "education", "chat"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Utility/Writing
  {"id": 110, "name": "TinyWow Suite", "category": "Utility Suite", "description": "Complete suite of AI tools for PDFs, images, and writing", "url": "https://tinywow.com/tools/write", "rating": 4.4, "tags": ["pdf", "images", "writing", "suite"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 111, "name": "Toolbaz AI Writer", "category": "Writing", "description": "Free AI text generator with multiple templates", "url": "https://toolbaz.com/writer/ai-text-generator", "rating": 4.3, "tags": ["templates", "generator", "free", "writing"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 112, "name": "GenApe", "category": "Writing", "description": "AI writing assistant with creative tools", "url": "https://app.genape.ai", "rating": 4.1, "tags": ["creative", "assistant", "tools", "writing"], "isCustom": false, "dateAdded": "2025-01-27"},

  // Specialized
  {"id": 113, "name": "Earkick", "category": "Mental Health", "description": "AI mental health companion for emotional support", "url": "https://earkick.com", "rating": 4.4, "tags": ["mental-health", "emotional", "support", "wellness"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 114, "name": "Brave Leo", "category": "Conversational AI", "description": "Built-in AI assistant in Brave browser", "url": "https://brave.com/leo/", "rating": 4.2, "tags": ["browser", "built-in", "privacy", "assistant"], "isCustom": false, "dateAdded": "2025-01-27"},
  {"id": 115, "name": "NoteGPT AI Detector", "category": "Content Detection", "description": "Detect AI-generated content with high accuracy", "url": "https://notegpt.io/ai-detector", "rating": 4.0, "tags": ["detection", "content", "accuracy", "analysis"], "isCustom": false, "dateAdded": "2025-01-27"}
];

// Enhanced Prompt Library
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

// Best Practices
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
  console.log('🚀 Initializing Enhanced vicky.ai...');
  
  try {
    loadStoredData();
    setupNavigation();
    setupMobileNavigation();
    populateHomeContent();
    populateAITools();
    setupPromptChecker();
    setupPromptGenerator();
    setupToolsFeatures();
    initWeeklyUpdates();
    
    // Show home section by default
    showSection('home');
    updateNavigationState('home');
    
    console.log('✅ Enhanced vicky.ai initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing application:', error);
  }
});

// Data Loading and Storage
function loadStoredData() {
  try {
    const storedCustomTools = localStorage.getItem('vicky_custom_tools');
    const storedFavorites = localStorage.getItem('vicky_favorite_tools');
    const storedPrompts = localStorage.getItem('vicky_saved_prompts');
    
    customTools = storedCustomTools ? JSON.parse(storedCustomTools) : [];
    favoriteTools = storedFavorites ? JSON.parse(storedFavorites) : [];
    savedPrompts = storedPrompts ? JSON.parse(storedPrompts) : [];
    
    console.log(`Loaded ${customTools.length} custom tools, ${favoriteTools.length} favorites, ${savedPrompts.length} saved prompts`);
  } catch (error) {
    console.error('Error loading stored data:', error);
    customTools = [];
    favoriteTools = [];
    savedPrompts = [];
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// Weekly Auto-Update System
function initWeeklyUpdates() {
  updateTimestamp();
  
  // Simulate weekly updates (in real implementation, this would be more sophisticated)
  const lastUpdate = localStorage.getItem('vicky_last_update');
  const now = new Date();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  
  if (!lastUpdate || (now.getTime() - parseInt(lastUpdate)) > oneWeek) {
    setTimeout(() => {
      fetchLatestAITools();
    }, 3000);
  }
}

function fetchLatestAITools() {
  console.log('🔄 Simulating weekly AI tools update...');
  showNotification('AI tools database updated with latest additions', 'success');
  localStorage.setItem('vicky_last_update', new Date().getTime().toString());
}

function updateTimestamp() {
  const now = new Date();
  const timeString = now.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  const timestampElement = document.getElementById('last-updated-time');
  if (timestampElement) {
    timestampElement.textContent = timeString;
  }
}

// Navigation System - Fixed Implementation
function navigateToSection(sectionId) {
  console.log(`🔄 Navigating to section: ${sectionId}`);
  
  try {
    currentSection = sectionId;
    showSection(sectionId);
    updateNavigationState(sectionId);
    closeMobileMenu();
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log(`✅ Successfully navigated to ${sectionId}`);
  } catch (error) {
    console.error(`❌ Error navigating to ${sectionId}:`, error);
  }
}

// Make navigation function globally accessible
window.navigateToSection = navigateToSection;

function setupNavigation() {
  console.log('🔧 Setting up navigation system...');
  
  try {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    console.log(`Found ${navLinks.length} navigation links`);
    
    navLinks.forEach((link, index) => {
      const targetSection = link.getAttribute('data-section');
      console.log(`Setting up nav link ${index + 1}: ${targetSection}`);
      
      // Remove any existing listeners
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      // Add fresh event listener
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`Navigation clicked: ${targetSection}`);
        navigateToSection(targetSection);
      });
    });
    
    console.log('✅ Navigation system setup complete');
  } catch (error) {
    console.error('❌ Error setting up navigation:', error);
  }
}

function showSection(targetSectionId) {
  console.log(`👁️ Showing section: ${targetSectionId}`);
  
  try {
    // Hide all sections
    const allSections = document.querySelectorAll('.section');
    allSections.forEach((section) => {
      section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
      console.log(`✅ Section ${targetSectionId} is now visible`);
    } else {
      console.error(`❌ Section ${targetSectionId} not found!`);
    }
  } catch (error) {
    console.error(`❌ Error showing section ${targetSectionId}:`, error);
  }
}

function updateNavigationState(activeSectionId) {
  console.log(`🎯 Updating nav state for: ${activeSectionId}`);
  
  try {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    navLinks.forEach(link => {
      const linkSection = link.getAttribute('data-section');
      
      if (linkSection === activeSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    console.log(`✅ Nav state updated for ${activeSectionId}`);
  } catch (error) {
    console.error(`❌ Error updating nav state:`, error);
  }
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
  console.log('🏠 Populating home content...');
  
  try {
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
  } catch (error) {
    console.error('❌ Error populating home content:', error);
  }
}

function createPromptCard(prompt, id) {
  const card = document.createElement('div');
  card.className = 'prompt-card';
  card.innerHTML = `
    <p>${prompt}</p>
    <button class="copy-btn" onclick="copyPrompt('${prompt.replace(/'/g, "\\'")}', this)">Copy</button>
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

// Copy prompt functionality
function copyPrompt(promptText, button) {
  copyToClipboard(promptText);
  
  const originalText = button.textContent;
  button.textContent = 'Copied!';
  button.style.background = '#00c851';
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
  }, 2000);
}

window.copyPrompt = copyPrompt;

// Enhanced AI Tools Management
function populateAITools() {
  console.log('🔧 Populating AI tools...');
  
  try {
    // Populate Underrated Tools
    populateUnderratedTools();
    
    // Populate Main Tools
    populateMainTools();
    
    console.log('✅ AI tools populated successfully');
  } catch (error) {
    console.error('❌ Error populating AI tools:', error);
  }
}

function populateUnderratedTools() {
  const underratedContainer = document.getElementById('underratedToolsContainer');
  if (!underratedContainer) return;
  
  // Apply filters to underrated tools
  let filteredTools = [...underratedAITools];
  
  const searchInput = document.getElementById('tools-search');
  const categoryFilter = document.getElementById('category-filter');
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const categoryFilterValue = categoryFilter ? categoryFilter.value : '';
  
  if (searchTerm) {
    filteredTools = filteredTools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  if (categoryFilterValue) {
    filteredTools = filteredTools.filter(tool => tool.category === categoryFilterValue);
  }
  
  if (showingFavoritesOnly) {
    filteredTools = filteredTools.filter(tool => favoriteTools.includes(tool.id));
  }
  
  // Group by category
  const categories = {};
  filteredTools.forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  });
  
  underratedContainer.innerHTML = '';
  
  if (Object.keys(categories).length === 0) {
    underratedContainer.innerHTML = '<p class="empty-state">No underrated tools found matching your criteria.</p>';
    return;
  }
  
  Object.entries(categories).forEach(([category, tools]) => {
    const categorySection = document.createElement('div');
    categorySection.className = 'tools-category';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.innerHTML = `${category} <span class="category-count">(${tools.length})</span>`;
    categorySection.appendChild(categoryTitle);
    
    const toolsGrid = document.createElement('div');
    toolsGrid.className = 'tools-grid';
    
    tools.forEach(tool => {
      const toolCard = createToolCard(tool, true);
      toolsGrid.appendChild(toolCard);
    });
    
    categorySection.appendChild(toolsGrid);
    underratedContainer.appendChild(categorySection);
  });
}

function populateMainTools() {
  const toolsContainer = document.getElementById('toolsContainer');
  if (!toolsContainer) return;
  
  const allTools = [...defaultAITools, ...customTools];
  let filteredTools = allTools;
  
  // Apply filters
  const searchInput = document.getElementById('tools-search');
  const categoryFilter = document.getElementById('category-filter');
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const categoryFilterValue = categoryFilter ? categoryFilter.value : '';
  
  if (searchTerm) {
    filteredTools = filteredTools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  if (categoryFilterValue) {
    filteredTools = filteredTools.filter(tool => tool.category === categoryFilterValue);
  }
  
  if (showingFavoritesOnly) {
    filteredTools = filteredTools.filter(tool => favoriteTools.includes(tool.id));
  }
  
  // Group by category
  const categories = {};
  filteredTools.forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  });
  
  toolsContainer.innerHTML = '';
  
  if (Object.keys(categories).length === 0) {
    toolsContainer.innerHTML = '<p class="empty-state">No tools found matching your criteria.</p>';
    return;
  }
  
  Object.entries(categories).forEach(([category, tools]) => {
    const categorySection = document.createElement('div');
    categorySection.className = 'tools-category';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.innerHTML = `${category} <span class="category-count">(${tools.length})</span>`;
    categorySection.appendChild(categoryTitle);
    
    const toolsGrid = document.createElement('div');
    toolsGrid.className = 'tools-grid';
    
    tools.forEach(tool => {
      const toolCard = createToolCard(tool, false);
      toolsGrid.appendChild(toolCard);
    });
    
    categorySection.appendChild(toolsGrid);
    toolsContainer.appendChild(categorySection);
  });
}

function createToolCard(tool, isUnderrated = false) {
  const isNew = isToolNew(tool.dateAdded);
  const isFavorite = favoriteTools.includes(tool.id);
  
  const toolCard = document.createElement('div');
  toolCard.className = 'tool-card';
  
  const badgeHtml = isUnderrated ? '<span class="new-badge">Free & No Signup</span>' : 
                   (isNew ? '<span class="new-badge">New</span>' : '') +
                   (tool.isCustom ? '<span class="custom-badge">Custom</span>' : '');
  
  toolCard.innerHTML = `
    <h4>
      ${tool.name}
      <div class="tool-actions">
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${tool.id})" title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
          ${isFavorite ? '★' : '☆'}
        </button>
      </div>
    </h4>
    <p>${tool.description}</p>
    <div class="tool-meta">
      <div class="tool-rating">
        <span class="stars">${generateStars(tool.rating)}</span>
        <span class="rating-text">${tool.rating}★</span>
      </div>
      <div>
        ${badgeHtml}
      </div>
    </div>
    <div class="tool-tags">
      ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
    </div>
  `;
  
  toolCard.addEventListener('click', (e) => {
    if (!e.target.classList.contains('favorite-btn')) {
      window.open(tool.url, '_blank');
    }
  });
  
  return toolCard;
}

function isToolNew(dateAdded) {
  const toolDate = new Date(dateAdded);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return toolDate > oneWeekAgo;
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

function toggleFavorite(toolId) {
  const index = favoriteTools.indexOf(toolId);
  if (index > -1) {
    favoriteTools.splice(index, 1);
    showNotification('Removed from favorites', 'info');
  } else {
    favoriteTools.push(toolId);
    showNotification('Added to favorites', 'success');
  }
  
  saveToStorage('vicky_favorite_tools', favoriteTools);
  populateAITools();
}

function toggleFavoritesOnly() {
  showingFavoritesOnly = !showingFavoritesOnly;
  const button = document.getElementById('favorites-toggle');
  if (button) {
    button.textContent = showingFavoritesOnly ? 'Show All' : 'Show Favorites';
  }
  populateAITools();
}

window.toggleFavorite = toggleFavorite;
window.toggleFavoritesOnly = toggleFavoritesOnly;

// Setup Tools Features
function setupToolsFeatures() {
  const searchInput = document.getElementById('tools-search');
  const categoryFilter = document.getElementById('category-filter');
  
  if (searchInput) {
    searchInput.addEventListener('input', populateAITools);
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', populateAITools);
  }
}

// Custom Tool Modal Management
function showAddToolModal() {
  const modal = document.getElementById('addToolModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function hideAddToolModal() {
  const modal = document.getElementById('addToolModal');
  if (modal) {
    modal.classList.add('hidden');
    clearToolForm();
  }
}

function clearToolForm() {
  const fields = ['tool-name', 'tool-description', 'tool-url', 'tool-category', 'tool-rating', 'tool-tags'];
  fields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = fieldId === 'tool-rating' ? '4' : '';
    }
  });
}

function saveCustomTool() {
  const name = document.getElementById('tool-name')?.value.trim();
  const description = document.getElementById('tool-description')?.value.trim();
  const url = document.getElementById('tool-url')?.value.trim();
  const category = document.getElementById('tool-category')?.value;
  const rating = parseFloat(document.getElementById('tool-rating')?.value || '4');
  const tagsInput = document.getElementById('tool-tags')?.value.trim();
  
  if (!name || !description || !url || !category) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
  
  const newTool = {
    id: Date.now(),
    name,
    description,
    url,
    category,
    rating,
    tags,
    isCustom: true,
    dateAdded: new Date().toISOString().split('T')[0]
  };
  
  customTools.push(newTool);
  saveToStorage('vicky_custom_tools', customTools);
  
  hideAddToolModal();
  populateAITools();
  showNotification(`Added "${name}" to your custom tools`, 'success');
}

window.showAddToolModal = showAddToolModal;
window.hideAddToolModal = hideAddToolModal;
window.saveCustomTool = saveCustomTool;

// Enhanced Prompt Checker with Auto-Fix
function setupPromptChecker() {
  console.log('🔧 Setting up Prompt Checker...');
  
  try {
    const analyzeBtn = document.getElementById('analyze-btn');
    const autoFixBtn = document.getElementById('auto-fix-btn');
    const promptInput = document.getElementById('checkerInput');
    const resultsSection = document.getElementById('checkerResults');
    
    if (!analyzeBtn || !promptInput || !resultsSection) {
      console.log('⚠️ Prompt checker elements not found');
      return;
    }
    
    analyzeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const promptText = promptInput.value.trim();
      if (!promptText) {
        showNotification('Please enter a prompt to analyze', 'error');
        return;
      }
      
      const originalHTML = analyzeBtn.innerHTML;
      analyzeBtn.innerHTML = 'Analyzing...';
      analyzeBtn.disabled = true;
      
      setTimeout(() => {
        const analysis = analyzePrompt(promptText);
        displayAnalysisResults(analysis, promptText);
        
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        analyzeBtn.innerHTML = originalHTML;
        analyzeBtn.disabled = false;
      }, 1500);
    });
    
    if (autoFixBtn) {
      autoFixBtn.addEventListener('click', function() {
        const originalPrompt = promptInput.value.trim();
        if (originalPrompt) {
          autoFixPrompt(originalPrompt);
        }
      });
    }
    
    console.log('✅ Prompt checker setup complete');
  } catch (error) {
    console.error('❌ Error setting up prompt checker:', error);
  }
}

function analyzePrompt(text) {
  const wordCount = text.split(/\s+/).length;
  let score = 0;
  const feedback = [];
  
  // Enhanced analysis criteria
  const hasRole = /(?:act as|you are|assume the role|as a)/i.test(text);
  const hasContext = /(?:context|background|scenario|situation|given|considering)/i.test(text);
  const hasFormat = /(?:format|structure|table|list|bullet|json|step-by-step|numbered)/i.test(text);
  const hasSpecificity = /(?:specific|detailed|exactly|precisely|particular|exact)/i.test(text);
  const hasExamples = /(?:example|for instance|such as|like|including)/i.test(text);
  const hasConstraints = /(?:must|should|avoid|don't|ensure|require|limit)/i.test(text);
  
  // Check for vague terms
  const vagueTerms = ['something', 'anything', 'stuff', 'things', 'better', 'improve', 'good', 'nice', 'great', 'awesome'];
  const hasVagueTerms = vagueTerms.some(term => text.toLowerCase().includes(term));
  
  // Length analysis
  if (wordCount >= 30 && wordCount <= 200) {
    score += 2;
    feedback.push({
      type: 'positive',
      title: '✅ Optimal Length',
      message: `Prompt length (${wordCount} words) is within the optimal range for detailed, actionable results.`
    });
  } else if (wordCount < 30) {
    score -= 1;
    feedback.push({
      type: 'negative',
      title: '⚠️ Too Short',
      message: 'Consider adding more context, specific requirements, examples, and desired output format for better results.'
    });
  } else {
    feedback.push({
      type: 'negative',
      title: '⚠️ Too Long',
      message: 'Consider breaking this into smaller, focused prompts or use structured sections for better clarity.'
    });
  }
  
  // Role definition
  if (hasRole) {
    score += 3;
    feedback.push({
      type: 'positive',
      title: '🎯 Role Defined',
      message: 'Excellent! You\'ve defined a specific role/persona for the AI, which provides crucial context and expertise framing.'
    });
  } else {
    score -= 2;
    feedback.push({
      type: 'negative',
      title: '❌ Missing Role',
      message: 'Start with "Act as a [expert]" to give the AI proper context, expertise level, and perspective for better responses.'
    });
  }
  
  // Context check
  if (hasContext) {
    score += 2;
    feedback.push({
      type: 'positive',
      title: '📝 Context Provided',
      message: 'Good! Context helps the AI understand the situation, background, and constraints for more relevant responses.'
    });
  } else {
    score -= 1;
    feedback.push({
      type: 'negative',
      title: '💡 Add Context',
      message: 'Include background information, situational context, or constraints to help the AI understand the bigger picture.'
    });
  }
  
  // Format specification
  if (hasFormat) {
    score += 2;
    feedback.push({
      type: 'positive',
      title: '📋 Format Specified',
      message: 'Great! You\'ve specified the desired output format, which ensures structured, usable results.'
    });
  } else {
    score -= 1;
    feedback.push({
      type: 'negative',
      title: '❌ No Format Specified',
      message: 'Specify desired output format (bullet points, table, numbered steps, JSON, etc.) for better structured responses.'
    });
  }
  
  // Specificity and detail
  if (hasSpecificity) {
    score += 2;
    feedback.push({
      type: 'positive',
      title: '🔍 Specific Language',
      message: 'Excellent use of specific, detailed language that leads to more precise and actionable results.'
    });
  } else {
    score -= 1;
    feedback.push({
      type: 'negative',
      title: '🎯 Add Specificity',
      message: 'Use more specific language with exact requirements, quantities, or measurable criteria for better precision.'
    });
  }
  
  // Examples and constraints
  if (hasExamples) {
    score += 1;
    feedback.push({
      type: 'positive',
      title: '📖 Examples Included',
      message: 'Providing examples helps the AI understand exactly what you\'re looking for and improves output quality.'
    });
  }
  
  if (hasConstraints) {
    score += 1;
    feedback.push({
      type: 'positive',
      title: '🚧 Clear Constraints',
      message: 'You\'ve included helpful constraints or requirements that guide the AI toward your desired outcome.'
    });
  }
  
  // Vague terms penalty
  if (hasVagueTerms) {
    score -= 2;
    feedback.push({
      type: 'negative',
      title: '🚫 Vague Language Detected',
      message: 'Replace vague terms like "better," "good," or "something" with specific, measurable requirements for dramatically better results.'
    });
  }
  
  // Calculate grade
  let grade = 'F';
  if (score >= 7) grade = 'A';
  else if (score >= 5) grade = 'B';
  else if (score >= 2) grade = 'C';
  else if (score >= 0) grade = 'D';
  
  return { score, grade, feedback, wordCount, needsAutoFix: ['C', 'D', 'F'].includes(grade) };
}

function displayAnalysisResults(analysis, originalPrompt) {
  const scoreElement = document.getElementById('overall-score');
  const contentElement = document.getElementById('results-content');
  const autoFixBtn = document.getElementById('auto-fix-btn');
  
  if (!scoreElement || !contentElement) return;
  
  // Update score badge
  scoreElement.textContent = `Grade: ${analysis.grade}`;
  scoreElement.className = `status status--${analysis.grade === 'A' ? 'success' : analysis.grade === 'B' ? 'warning' : 'error'}`;
  
  // Show/hide auto-fix button
  if (autoFixBtn) {
    if (analysis.needsAutoFix) {
      autoFixBtn.classList.remove('hidden');
    } else {
      autoFixBtn.classList.add('hidden');
    }
  }
  
  // Clear and populate results
  contentElement.innerHTML = '';
  
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

function autoFixPrompt(originalPrompt) {
  const fixBtn = document.getElementById('auto-fix-btn');
  const fixResults = document.getElementById('fixResults');
  
  if (!fixBtn || !fixResults) return;
  
  const originalHTML = fixBtn.innerHTML;
  fixBtn.innerHTML = 'Fixing...';
  fixBtn.disabled = true;
  
  setTimeout(() => {
    const fixedPrompt = generateImprovedPrompt(originalPrompt);
    displayFixedPrompt(originalPrompt, fixedPrompt);
    
    fixResults.classList.remove('hidden');
    fixResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    fixBtn.innerHTML = originalHTML;
    fixBtn.disabled = false;
    
    showNotification('Prompt automatically improved!', 'success');
  }, 2000);
}

function generateImprovedPrompt(originalPrompt) {
  let improved = originalPrompt;
  
  // Add role if missing
  if (!/(?:act as|you are|assume the role)/i.test(improved)) {
    improved = "Act as an expert professional and " + improved.toLowerCase();
  }
  
  // Add structure
  if (!/(?:format|structure|table|list|bullet|json|step-by-step)/i.test(improved)) {
    improved += " Structure your response with: 1) Clear overview, 2) Detailed analysis with specific points, 3) Actionable recommendations with next steps.";
  }
  
  // Add context request if missing
  if (!/(?:context|background|scenario|situation|given|considering)/i.test(improved)) {
    improved += " Provide comprehensive context and reasoning for your recommendations.";
  }
  
  // Add specificity requirements
  if (!/(?:specific|detailed|exactly|precisely|particular|exact)/i.test(improved)) {
    improved += " Be specific and detailed in your response, including concrete examples where applicable.";
  }
  
  // Improve format specification
  improved += " Use professional language appropriate for business communication and ensure all information is accurate and actionable.";
  
  return improved;
}

function displayFixedPrompt(original, fixed) {
  const originalDisplay = document.getElementById('original-prompt-display');
  const fixedDisplay = document.getElementById('fixed-prompt-display');
  const explanationDiv = document.getElementById('improvements-explanation');
  
  if (originalDisplay) originalDisplay.value = original;
  if (fixedDisplay) fixedDisplay.value = fixed;
  
  if (explanationDiv) {
    explanationDiv.innerHTML = `
      <h4>Improvements Made:</h4>
      <ul>
        <li><strong>Added Expert Role:</strong> Defined a professional role for better context and expertise</li>
        <li><strong>Structured Format:</strong> Added clear response structure with numbered sections</li>
        <li><strong>Enhanced Specificity:</strong> Requested detailed, concrete information and examples</li>
        <li><strong>Professional Tone:</strong> Specified business-appropriate communication style</li>
        <li><strong>Actionable Focus:</strong> Emphasized practical recommendations and next steps</li>
      </ul>
    `;
  }
  
  // Setup copy buttons
  const copyOriginalBtn = document.getElementById('copy-original-btn');
  const copyFixedBtn = document.getElementById('copy-fixed-btn');
  
  if (copyOriginalBtn) {
    copyOriginalBtn.onclick = () => {
      copyToClipboard(original);
      showNotification('Original prompt copied!', 'info');
    };
  }
  
  if (copyFixedBtn) {
    copyFixedBtn.onclick = () => {
      copyToClipboard(fixed);
      showNotification('Enhanced prompt copied!', 'success');
    };
  }
}

// Enhanced Prompt Generator with Live Preview
function setupPromptGenerator() {
  console.log('🔧 Setting up Prompt Generator...');
  
  try {
    const generateBtn = document.getElementById('generate-btn');
    const userInput = document.getElementById('userInput');
    const purpose = document.getElementById('purpose');
    const model = document.getElementById('model');
    const persona = document.getElementById('persona');
    const tone = document.getElementById('tone');
    const format = document.getElementById('format');
    const livePreview = document.getElementById('live-preview');
    const charCount = document.getElementById('char-count');
    
    if (!generateBtn) {
      console.log('⚠️ Generate button not found');
      return;
    }
    
    // Setup live preview
    function updateLivePreview() {
      if (userInput && livePreview && charCount) {
        const input = userInput.value.trim();
        charCount.textContent = input.length;
        
        if (input) {
          const preview = buildEnhancedPrompt(true);
          livePreview.innerHTML = `<p>${preview.substring(0, 200)}${preview.length > 200 ? '...' : ''}</p>`;
          
          // Update preview stats
          const previewLength = document.getElementById('preview-length');
          const previewQuality = document.getElementById('preview-quality');
          
          if (previewLength) {
            previewLength.textContent = preview.split(' ').length;
          }
          
          if (previewQuality) {
            const quality = estimatePromptQuality(preview);
            previewQuality.textContent = quality;
            previewQuality.className = `status status--${quality === 'High' ? 'success' : quality === 'Medium' ? 'warning' : 'error'}`;
          }
        } else {
          livePreview.innerHTML = '<p>Configure your prompt above to see a live preview...</p>';
        }
      }
    }
    
    // Add event listeners for live preview
    [userInput, purpose, model, persona, tone, format].forEach(element => {
      if (element) {
        element.addEventListener('input', updateLivePreview);
        element.addEventListener('change', updateLivePreview);
      }
    });
    
    generateBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const input = userInput ? userInput.value.trim() : '';
      if (!input) {
        showNotification('Please enter a basic prompt description', 'error');
        return;
      }
      
      const originalHTML = generateBtn.innerHTML;
      generateBtn.innerHTML = 'Generating...';
      generateBtn.disabled = true;
      
      setTimeout(() => {
        const enhancedPrompt = buildEnhancedPrompt();
        displayGeneratedPrompt(enhancedPrompt);
        
        generateBtn.innerHTML = originalHTML;
        generateBtn.disabled = false;
        
        showNotification('Enhanced prompt generated successfully!', 'success');
      }, 1000);
    });
    
    // Setup additional buttons
    setupPromptActions();
    
    console.log('✅ Prompt generator setup complete');
  } catch (error) {
    console.error('❌ Error setting up prompt generator:', error);
  }
}

function buildEnhancedPrompt(isPreview = false) {
  const userInput = document.getElementById('userInput')?.value.trim() || '';
  const purpose = document.getElementById('purpose')?.value || 'General Use';
  const model = document.getElementById('model')?.value || 'General';
  const persona = document.getElementById('persona')?.value || 'Expert';
  const tone = document.getElementById('tone')?.value || 'Professional';
  const format = document.getElementById('format')?.value || 'Structured Report';
  
  // Handle Image Generation with ultra-detailed prompts
  if (purpose === 'Image Generation') {
    return generateDetailedImagePrompt(userInput, model, isPreview);
  }
  
  // Handle Report Analysis with comprehensive structure
  if (purpose === 'Report Analysis') {
    return generateReportAnalysisPrompt(userInput, persona, tone, format, isPreview);
  }
  
  // Handle Data Analysis with statistical framework
  if (purpose === 'Data Analysis') {
    return generateDataAnalysisPrompt(userInput, persona, tone, format, isPreview);
  }
  
  // Build structured prompt for other purposes
  return generateStructuredPrompt(userInput, purpose, model, persona, tone, format, isPreview);
}

function generateDetailedImagePrompt(userInput, model, isPreview) {
  const compositions = [
    'centered composition with rule of thirds placement',
    'dynamic asymmetrical layout with strong focal points',
    'symmetrical balance with perfect geometric harmony',
    'leading lines drawing viewer attention to subject',
    'frame-within-frame composition creating depth'
  ];
  
  const lightingConditions = [
    'golden hour warm lighting with soft shadows',
    'cinematic three-point lighting setup with dramatic contrast',
    'natural daylight with diffused soft illumination',
    'studio photography lighting with professional quality',
    'dramatic side lighting creating mood and atmosphere'
  ];
  
  const cameraSettings = [
    'shot with professional DSLR camera, 85mm portrait lens',
    'wide-angle 24mm lens with slight perspective distortion',
    'telephoto 200mm lens with beautiful background compression',
    'macro lens capturing incredible fine detail',
    'medium format camera for ultimate image quality'
  ];
  
  const colorPalettes = [
    'vibrant saturated colors with high contrast',
    'muted earth tones with warm color temperature',
    'cool blue color grading with teal highlights',
    'monochromatic color scheme with subtle variations',
    'complementary color palette creating visual impact'
  ];
  
  const moods = [
    'cinematic and dramatic atmosphere',
    'dreamy and ethereal quality',
    'energetic and dynamic feeling',
    'serene and peaceful ambiance',
    'mysterious and moody character'
  ];
  
  const technicalSpecs = [
    '8k ultra-high resolution',
    'award-winning photography quality',
    'professional color grading and post-processing',
    'perfect exposure with detail in highlights and shadows',
    'exceptional sharpness and clarity'
  ];
  
  // Randomly select elements for variety
  const selectedComposition = compositions[Math.floor(Math.random() * compositions.length)];
  const selectedLighting = lightingConditions[Math.floor(Math.random() * lightingConditions.length)];
  const selectedCamera = cameraSettings[Math.floor(Math.random() * cameraSettings.length)];
  const selectedColors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
  const selectedMood = moods[Math.floor(Math.random() * moods.length)];
  const selectedTech = technicalSpecs.slice(0, 3);
  
  let prompt = `${userInput}, ${selectedComposition}, ${selectedLighting}, ${selectedCamera}, ${selectedColors}, ${selectedMood}, ${selectedTech.join(', ')}`;
  
  // Model-specific optimizations
  if (model === 'Midjourney' && !isPreview) {
    prompt += ', --ar 16:9 --v 6 --style raw --quality 2';
  } else if (model === 'Flux' && !isPreview) {
    prompt += ', trending on artstation, masterpiece quality';
  } else if (model === 'DALL-E' && !isPreview) {
    prompt += ', digital art style, hyperrealistic details';
  }
  
  return prompt;
}

function generateReportAnalysisPrompt(userInput, persona, tone, format, isPreview) {
  const expertLevel = persona.toLowerCase().includes('expert') ? 'senior' : 'professional';
  
  let prompt = `Act as a ${expertLevel} business analyst with expertise in comprehensive document review and quality assurance. ${userInput}

**Comprehensive Analysis Framework:**

1. **Document Structure Review:**
   - Examine overall document organization and flow
   - Verify logical progression of ideas and arguments
   - Check for consistency in formatting and presentation

2. **Content Quality Assessment:**
   - Evaluate accuracy and completeness of information
   - Identify any factual inconsistencies or contradictions
   - Verify supporting data, statistics, and references

3. **Language and Communication:**
   - Review grammar, punctuation, and spelling accuracy
   - Assess tone consistency and appropriateness for audience
   - Evaluate clarity and conciseness of expression

4. **Error Identification and Documentation:**
   For each issue identified, provide:
   - **Location:** Specific section or paragraph reference
   - **Current Text:** Exact quote of problematic content  
   - **Issue Type:** Category of error (spelling, grammar, factual, structural)
   - **Recommended Fix:** Specific correction or improvement
   - **Priority Level:** High, Medium, or Low based on impact

**Professional Standards:**
- Use formal business language appropriate for executive review
- Provide constructive, actionable feedback
- Focus on improvements that enhance document quality and effectiveness
- Ensure all recommendations are specific and implementable

Approach this review with the meticulousness of a senior editor preparing a document for board-level presentation.`;

  return prompt;
}

function generateDataAnalysisPrompt(userInput, persona, tone, format, isPreview) {
  const expertLevel = persona.toLowerCase().includes('expert') ? 'expert' : 'experienced';
  
  let prompt = `Act as an ${expertLevel} data scientist with extensive experience in statistical analysis, data visualization, and business intelligence. ${userInput}

**Comprehensive Data Analysis Framework:**

1. **Data Overview and Quality Assessment:**
   - Examine data structure, dimensions, and completeness
   - Identify missing values, outliers, and data quality issues
   - Calculate basic descriptive statistics (mean, median, mode, standard deviation)

2. **Statistical Analysis:**
   - Perform correlation analysis to identify relationships between variables
   - Conduct significance testing where appropriate
   - Apply relevant statistical methods as needed
   - Calculate confidence intervals and effect sizes

3. **Pattern Recognition and Trends:**
   - Identify seasonal patterns, trends, and cyclical behaviors
   - Detect anomalies and unusual patterns in the data
   - Analyze distribution shapes and data clustering
   - Examine time-series patterns if applicable

4. **Business Intelligence Insights:**
   - Translate statistical findings into business implications
   - Identify key performance indicators (KPIs) and metrics
   - Highlight actionable opportunities and areas for improvement
   - Assess potential impact of identified trends on business outcomes

**Analysis Standards:**
- Use appropriate statistical methods and clearly state assumptions
- Provide confidence levels and statistical significance where applicable
- Include data-driven recommendations with quantified expected outcomes
- Present findings in language accessible to business stakeholders
- Ensure all conclusions are supported by robust statistical evidence

Focus on delivering insights that drive informed business decision-making and measurable outcomes.`;

  return prompt;
}

function generateStructuredPrompt(userInput, purpose, model, persona, tone, format, isPreview) {
  const roles = {
    'Code Generation': 'senior software engineer',
    'Content Creation': 'professional content strategist', 
    'Conversational AI': 'helpful AI assistant',
    'General Use': 'expert consultant'
  };
  
  const role = roles[purpose] || 'expert professional';
  let prompt = `Act as a ${persona.toLowerCase()} ${role} and ${userInput}.`;
  
  // Add purpose-specific guidance
  const purposeFrameworks = {
    'Code Generation': 'Provide clean, well-commented code with: 1) Proper error handling, 2) Best practices implementation, 3) Security considerations, 4) Performance optimization, 5) Testing recommendations.',
    'Content Creation': 'Create content that is: 1) Audience-focused and engaging, 2) SEO-optimized with relevant keywords, 3) Brand-aligned and consistent, 4) Action-oriented with clear calls-to-action, 5) Measurable with success metrics.',
    'Conversational AI': 'Respond in a way that is: 1) Conversational and empathetic, 2) Practical and immediately actionable, 3) Clear and easy to understand, 4) Comprehensive yet concise.',
    'General Use': 'Structure your response with: 1) Clear overview and context, 2) Detailed analysis with supporting evidence, 3) Practical recommendations with implementation steps, 4) Success metrics and expected outcomes.'
  };
  
  if (purposeFrameworks[purpose]) {
    prompt += ` ${purposeFrameworks[purpose]}`;
  }
  
  // Add tone-specific guidance
  const toneStyles = {
    'Professional': 'Use formal, business-appropriate language with industry terminology.',
    'Technical': 'Use precise technical terminology with detailed explanations.',
    'Creative': 'Use engaging, innovative language with creative examples.',
    'Analytical': 'Use data-driven language with logical reasoning and evidence-based conclusions.',
    'Conversational': 'Use friendly, approachable language that\'s easy to understand.'
  };
  
  if (toneStyles[tone]) {
    prompt += ` ${toneStyles[tone]}`;
  }
  
  return prompt;
}

function estimatePromptQuality(prompt) {
  const wordCount = prompt.split(' ').length;
  const hasRole = /act as|you are/i.test(prompt);
  const hasStructure = /\d+\)|structure|format/i.test(prompt);
  const hasSpecificity = /specific|detailed|exactly/i.test(prompt);
  
  let score = 0;
  if (wordCount > 50) score++;
  if (hasRole) score++;
  if (hasStructure) score++;
  if (hasSpecificity) score++;
  
  return score >= 3 ? 'High' : score >= 2 ? 'Medium' : 'Low';
}

function displayGeneratedPrompt(enhancedPrompt) {
  const generatedSection = document.getElementById('generated-section');
  const promptOut = document.getElementById('promptOut');
  const outputLength = document.getElementById('output-length');
  const optimizationScore = document.getElementById('optimization-score');
  const modelCompatibility = document.getElementById('model-compatibility');
  
  if (promptOut) {
    promptOut.value = enhancedPrompt;
  }
  
  if (generatedSection) {
    generatedSection.classList.remove('hidden');
    generatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Update analysis
  if (outputLength) {
    outputLength.textContent = enhancedPrompt.split(' ').length;
  }
  
  if (optimizationScore) {
    const quality = estimatePromptQuality(enhancedPrompt);
    optimizationScore.textContent = quality;
    optimizationScore.className = `status status--${quality === 'High' ? 'success' : quality === 'Medium' ? 'warning' : 'error'}`;
  }
  
  if (modelCompatibility) {
    const model = document.getElementById('model')?.value || 'General';
    modelCompatibility.textContent = model === 'General' ? 'Universal' : `Optimized for ${model}`;
  }
}

function setupPromptActions() {
  const copyBtn = document.getElementById('copy-generated-btn');
  const saveBtn = document.getElementById('save-prompt-btn');
  const clearSavedBtn = document.getElementById('clear-saved-btn');
  
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const promptOut = document.getElementById('promptOut');
      if (promptOut && promptOut.value) {
        copyToClipboard(promptOut.value);
        showNotification('Enhanced prompt copied to clipboard!', 'success');
      }
    });
  }
  
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      const promptOut = document.getElementById('promptOut');
      if (promptOut && promptOut.value) {
        savePromptToFavorites(promptOut.value);
      }
    });
  }
  
  if (clearSavedBtn) {
    clearSavedBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear all saved prompts?')) {
        savedPrompts = [];
        saveToStorage('vicky_saved_prompts', savedPrompts);
        updateSavedPromptsList();
        showNotification('All saved prompts cleared', 'info');
      }
    });
  }
  
  // Initial load of saved prompts
  updateSavedPromptsList();
}

function savePromptToFavorites(promptText) {
  const timestamp = new Date().toLocaleDateString();
  const savedPrompt = {
    id: Date.now(),
    text: promptText.substring(0, 200) + (promptText.length > 200 ? '...' : ''),
    fullText: promptText,
    date: timestamp
  };
  
  savedPrompts.unshift(savedPrompt);
  if (savedPrompts.length > 10) {
    savedPrompts = savedPrompts.slice(0, 10);
  }
  
  saveToStorage('vicky_saved_prompts', savedPrompts);
  updateSavedPromptsList();
  showNotification('Prompt saved to favorites!', 'success');
}

function updateSavedPromptsList() {
  const savedPromptsList = document.getElementById('saved-prompts-list');
  if (!savedPromptsList) return;
  
  if (savedPrompts.length === 0) {
    savedPromptsList.innerHTML = '<p class="empty-state">No saved prompts yet. Generate and save prompts to see them here.</p>';
    return;
  }
  
  savedPromptsList.innerHTML = '';
  
  savedPrompts.forEach(prompt => {
    const promptItem = document.createElement('div');
    promptItem.className = 'saved-prompt-item';
    promptItem.innerHTML = `
      <div class="saved-prompt-content">${prompt.text}</div>
      <div class="saved-prompt-actions">
        <button class="btn btn--outline btn-small" onclick="copyToClipboard('${prompt.fullText.replace(/'/g, "\\'")}'); showNotification('Saved prompt copied!', 'success')">Copy</button>
        <button class="btn btn--outline btn-small" onclick="removeSavedPrompt(${prompt.id})">Remove</button>
      </div>
    `;
    savedPromptsList.appendChild(promptItem);
  });
}

function removeSavedPrompt(promptId) {
  savedPrompts = savedPrompts.filter(p => p.id !== promptId);
  saveToStorage('vicky_saved_prompts', savedPrompts);
  updateSavedPromptsList();
  showNotification('Prompt removed from favorites', 'info');
}

window.removeSavedPrompt = removeSavedPrompt;

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
  
  setTimeout(() => notification.classList.add('show'), 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

console.log('✅ Enhanced vicky.ai JavaScript loaded successfully');