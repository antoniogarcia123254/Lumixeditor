const STORAGE_KEYS = {
  users: "framelab_users",
  auth: "framelab_auth",
  theme: "lumix_theme",
  inquiries: "lumix_contact_inquiries",
  newsletter: "lumix_newsletter_signups",
  guestAnalyses: "lumix_guest_analysis_count",
};

const GUEST_ANALYSIS_LIMIT = 3;

const presets = [
  {
    id: "pixel",
    name: "Pixel Studio",
    description: "Turn photographs into clean grid-based pixel compositions with adjustable block size.",
    useCase: "Gaming visuals, posters, album art, avatars, and stylized campaigns.",
    mode: "pixel",
  },
  {
    id: "glitch",
    name: "Glitch",
    description: "Split color channels, tear scanlines, and introduce digital corruption for a broken-signal look.",
    useCase: "Music artwork, experimental campaigns, posters, and motion-inspired stills.",
    mode: "glitch",
  },
  {
    id: "halftone",
    name: "Halftone",
    description: "Convert the image into a dot-grid pattern inspired by newspaper print and pop art posters.",
    useCase: "Editorial visuals, posters, shirts, and high-contrast social assets.",
    mode: "halftone",
  },
  {
    id: "duotone",
    name: "Duotone",
    description: "Map shadows and highlights to two custom colors for a bold graphic result.",
    useCase: "Brand campaigns, portraits, hero images, and promotional assets.",
    mode: "duotone",
  },
  {
    id: "ascii",
    name: "ASCII Art",
    description: "Render the image as text-based art directly on canvas using density-based characters.",
    useCase: "Creative coding visuals, posters, covers, and experimental web art.",
    mode: "ascii",
  },
  {
    id: "vhs",
    name: "VHS / Retro",
    description: "Add scanlines, channel bleed, slight vertical roll, and analog noise.",
    useCase: "Throwback visuals, brand campaigns, flyers, and motion-inspired stills.",
    mode: "vhs",
  },
  {
    id: "dither",
    name: "Dither",
    description: "Reduce the image to two-color Floyd-Steinberg dithering for a gritty print-like finish.",
    useCase: "Posters, icons, monochrome graphics, and low-fi editorial treatments.",
    mode: "dither",
  },
  {
    id: "chromatic",
    name: "Chromatic Aberration",
    description: "Slightly split RGB channels apart to create lens distortion and optical tension.",
    useCase: "Fashion imagery, editorials, posters, and cinematic product shots.",
    mode: "chromatic",
  },
  {
    id: "oil",
    name: "Oil Paint",
    description: "Simulate painterly brush clusters by averaging neighboring color blocks.",
    useCase: "Art treatments, posters, portrait stylization, and gallery-inspired outputs.",
    mode: "oil",
  },
  {
    id: "selective",
    name: "Selective Color Pop",
    description: "Keep one hue range vivid while the rest of the image fades to grayscale.",
    useCase: "Product highlights, branded accents, hero visuals, and storytelling imagery.",
    mode: "selective",
  },
  {
    id: "neon",
    name: "Neon Glow",
    description: "Detect edges, darken the base, and bloom glowing outlines over the composition.",
    useCase: "Night posters, music visuals, cyber-inspired branding, and social promos.",
    mode: "neon",
  },
  {
    id: "tile",
    name: "Tile Mirror",
    description: "Split the image into mirrored quadrants for a kaleidoscope-like composition.",
    useCase: "Abstract visuals, artwork, album covers, and patterned campaigns.",
    mode: "tile",
  },
  {
    id: "thermal",
    name: "Thermal Map",
    description: "Remap tones into infrared-inspired heat gradients for dramatic imaging.",
    useCase: "Experimental branding, tech campaigns, and striking editorial assets.",
    mode: "thermal",
  },
  {
    id: "blueprint",
    name: "Blueprint Draft",
    description: "Emphasize edges and lines to create a technical drawing look.",
    useCase: "Architecture, industrial design, product presentations, and concept boards.",
    mode: "blueprint",
  },
];

const DEMO_EFFECTS = {
  duotone: {
    src: "./demo-duotone.svg",
    caption: "Duotone poster mode for campaign covers and hero art.",
    presetId: "duotone",
  },
  pixel: {
    src: "./demo-pixel.svg",
    caption: "Pixel Studio turns a smooth source into a stylized grid-based export.",
    presetId: "pixel",
  },
  glitch: {
    src: "./demo-glitch.svg",
    caption: "Glitch adds RGB separation, tears, and motion-heavy digital damage.",
    presetId: "glitch",
  },
  neon: {
    src: "./demo-neon.svg",
    caption: "Neon Glow darkens the base and pushes bright edge bloom over the image.",
    presetId: "neon",
  },
  blueprint: {
    src: "./demo-blueprint.svg",
    caption: "Blueprint Draft reframes the same source into clean technical lines.",
    presetId: "blueprint",
  },
};

const STARTER_PROJECT_TEMPLATES = [
  {
    name: "Starter Pixel Poster",
    effect: "Pixel Studio",
    effectId: "pixel",
    thumbnail: "./demo-pixel.svg",
    original: "./demo-original.svg",
    note: "Starter demo",
  },
  {
    name: "Starter Glitch Broadcast",
    effect: "Glitch",
    effectId: "glitch",
    thumbnail: "./demo-glitch.svg",
    original: "./demo-original.svg",
    note: "Starter demo",
  },
  {
    name: "Starter Duotone Cover",
    effect: "Duotone",
    effectId: "duotone",
    thumbnail: "./demo-duotone.svg",
    original: "./demo-original.svg",
    note: "Starter demo",
  },
  {
    name: "Starter Blueprint Study",
    effect: "Blueprint Draft",
    effectId: "blueprint",
    thumbnail: "./demo-blueprint.svg",
    original: "./demo-original.svg",
    note: "Starter demo",
  },
];

const state = {
  route: "landing",
  dashboardView: "home",
  authTab: "signin",
  user: null,
  pendingRoute: null,
  showingBefore: false,
  activePreset: presets[0],
  sourceImage: new Image(),
  originalDataUrl: "",
  loadedRemoteUrl: "",
  activeProjectId: null,
  activeHeroDemo: "duotone",
  lookGrade: null,
};

const ui = {
  routeViews: [...document.querySelectorAll(".route-view")],
  authButton: document.querySelector("#authButton"),
  themeToggle: document.querySelector("#themeToggle"),
  themeFooterButton: document.querySelector("#themeFooterButton"),
  searchButton: document.querySelector("#searchButton"),
  searchFooterButton: document.querySelector("#searchFooterButton"),
  menuToggle: document.querySelector("#menuToggle"),
  topnav: document.querySelector(".topnav"),
  topImportButton: document.querySelector("#topImportButton"),
  dashboardImportButton: document.querySelector("#dashboardImportButton"),
  globalImageInput: document.querySelector("#globalImageInput"),
  editorImageInput: document.querySelector("#editorImageInput"),
  heroDemoShell: document.querySelector("#heroDemoShell"),
  heroDemoSlider: document.querySelector("#heroDemoSlider"),
  heroDemoAfter: document.querySelector("#heroDemoAfter"),
  heroDemoCaption: document.querySelector("#heroDemoCaption"),
  heroDemoTabs: [...document.querySelectorAll("[data-demo-effect]")],
  dropzone: document.querySelector("#dropzone"),
  lookPromptInput: document.querySelector("#lookPromptInput"),
  applyLookPromptButton: document.querySelector("#applyLookPromptButton"),
  lookPromptStatus: document.querySelector("#lookPromptStatus"),
  presetSelect: document.querySelector("#presetSelect"),
  presetPills: document.querySelector("#presetPills"),
  intensityRange: document.querySelector("#intensityRange"),
  intensityValue: document.querySelector("#intensityValue"),
  detailRange: document.querySelector("#detailRange"),
  detailValue: document.querySelector("#detailValue"),
  contrastRange: document.querySelector("#contrastRange"),
  contrastValue: document.querySelector("#contrastValue"),
  hueRange: document.querySelector("#hueRange"),
  hueValue: document.querySelector("#hueValue"),
  shadowColorInput: document.querySelector("#shadowColorInput"),
  highlightColorInput: document.querySelector("#highlightColorInput"),
  resetButton: document.querySelector("#resetButton"),
  beforeAfterButton: document.querySelector("#beforeAfterButton"),
  saveProjectButton: document.querySelector("#saveProjectButton"),
  downloadButton: document.querySelector("#downloadButton"),
  previewCanvas: document.querySelector("#previewCanvas"),
  editorCompareShell: document.querySelector("#editorCompareShell"),
  editorCompareSlider: document.querySelector("#editorCompareSlider"),
  editorCompareBeforeCanvas: document.querySelector("#editorCompareBeforeCanvas"),
  editorCompareAfterCanvas: document.querySelector("#editorCompareAfterCanvas"),
  previewStatus: document.querySelector("#previewStatus"),
  effectTitle: document.querySelector("#effectTitle"),
  effectDescription: document.querySelector("#effectDescription"),
  effectUseCase: document.querySelector("#effectUseCase"),
  authModal: document.querySelector("#authModal"),
  authOverlay: document.querySelector("#authOverlay"),
  closeAuthButton: document.querySelector("#closeAuthButton"),
  signInTab: document.querySelector("#signInTab"),
  signUpTab: document.querySelector("#signUpTab"),
  signInForm: document.querySelector("#signInForm"),
  signUpForm: document.querySelector("#signUpForm"),
  authStatus: document.querySelector("#authStatus"),
  contactForm: document.querySelector("#contactForm"),
  contactStatus: document.querySelector("#contactStatus"),
  newsletterForm: document.querySelector("#newsletterForm"),
  newsletterStatus: document.querySelector("#newsletterStatus"),
  focusContactFormButton: document.querySelector("#focusContactFormButton"),
  dashboardGreeting: document.querySelector("#dashboardGreeting"),
  dashboardHeroTitle: document.querySelector("#dashboardHeroTitle"),
  dashboardHeroNote: document.querySelector("#dashboardHeroNote"),
  statImages: document.querySelector("#statImages"),
  statFavorite: document.querySelector("#statFavorite"),
  statExports: document.querySelector("#statExports"),
  statDays: document.querySelector("#statDays"),
  recentProjectsGrid: document.querySelector("#recentProjectsGrid"),
  allProjectsGrid: document.querySelector("#allProjectsGrid"),
  activityFeed: document.querySelector("#activityFeed"),
  dashboardPanels: [...document.querySelectorAll("[data-dashboard-panel]")],
  dashboardLinks: [...document.querySelectorAll(".sidebar-link")],
  settingsForm: document.querySelector("#settingsForm"),
  settingsDisplayName: document.querySelector("#settingsDisplayName"),
  settingsDefaultFilter: document.querySelector("#settingsDefaultFilter"),
  settingsTheme: document.querySelector("#settingsTheme"),
  settingsStatus: document.querySelector("#settingsStatus"),
  clearHistoryButton: document.querySelector("#clearHistoryButton"),
  profileToggle: document.querySelector("#profileToggle"),
  profileMenu: document.querySelector("#profileMenu"),
  profileName: document.querySelector("#profileName"),
  profileInitial: document.querySelector("#profileInitial"),
  logoutButton: document.querySelector("#logoutButton"),
  profileLogout: document.querySelector("#profileLogout"),
  importUrlButton: document.querySelector("#importUrlButton"),
  cursorDot: document.querySelector("#cursorDot"),
};

const ctx = ui.previewCanvas.getContext("2d", { willReadFrequently: true });
const compareBeforeCtx = ui.editorCompareBeforeCanvas?.getContext("2d", { willReadFrequently: true }) || null;
const compareAfterCtx = ui.editorCompareAfterCanvas?.getContext("2d", { willReadFrequently: true }) || null;

function init() {
  buildPresetInputs();
  bindRoutes();
  bindAuth();
  bindEditor();
  bindDashboard();
  bindForms();
  bindAppChrome();
  bindLandingDemo();
  bindMicroInteractions();
  bindPressFeedback();
  restoreAuth();
  createDefaultArtwork();
  setHeroDemoEffect(state.activeHeroDemo);
  applyTheme(getInitialTheme());
  updateControlReadouts();
  setComparePosition(ui.heroDemoShell, ui.heroDemoSlider?.value || 58);
  setComparePosition(ui.editorCompareShell, ui.editorCompareSlider?.value || 58);
  renderAuthState();
  routeTo("landing");
}

function bindAppChrome() {
  ui.themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    persistTheme(nextTheme);
  });
  ui.themeFooterButton?.addEventListener("click", () => ui.themeToggle.click());

  ui.searchButton.addEventListener("click", () => {
    const query = window.prompt("Jump to: home, effects, workflow, pricing, contact, dashboard, or editor");
    if (!query) {
      return;
    }
    const normalized = query.trim().toLowerCase();
    const routeMap = {
      home: "landing",
      effects: "effects",
      workflow: "workflow",
      pricing: "pricing",
      contact: "contact",
      dashboard: "dashboard",
      editor: "editor",
    };
    routeTo(routeMap[normalized] || "landing");
  });
  ui.searchFooterButton?.addEventListener("click", () => ui.searchButton.click());

  ui.menuToggle?.addEventListener("click", () => {
    ui.topnav.classList.toggle("is-collapsed");
  });

  bindCursorDot();
}

function bindRoutes() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      ui.topnav.classList.remove("is-collapsed");
      routeTo(button.dataset.route);
    });
  });
}

function bindLandingDemo() {
  ui.heroDemoSlider?.addEventListener("input", (event) => {
    setComparePosition(ui.heroDemoShell, event.target.value);
  });

  ui.heroDemoTabs.forEach((button) => {
    button.addEventListener("click", () => setHeroDemoEffect(button.dataset.demoEffect));
  });

  bindSwipeSurface(
    ui.heroDemoShell,
    () => cycleHeroDemo(1),
    () => cycleHeroDemo(-1)
  );
}

function bindAuth() {
  ui.authButton.addEventListener("click", () => {
    if (state.user) {
      routeTo("dashboard");
    } else {
      openAuthModal("signin");
    }
  });

  ui.signInTab.addEventListener("click", () => setAuthTab("signin"));
  ui.signUpTab.addEventListener("click", () => setAuthTab("signup"));
  ui.closeAuthButton.addEventListener("click", closeAuthModal);
  ui.authOverlay.addEventListener("click", closeAuthModal);

  ui.signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#signUpName").value.trim();
    const email = document.querySelector("#signUpEmail").value.trim().toLowerCase();
    const password = document.querySelector("#signUpPassword").value.trim();

    if (!name || !email || password.length < 6) {
      setStatus(ui.authStatus, "Use a valid name, email, and at least 6 characters.");
      return;
    }

    const users = getUsers();
    if (users.some((user) => user.email === email)) {
      setStatus(ui.authStatus, "An account with that email already exists.");
      return;
    }

    const newUser = {
      id: createId(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    setUsers(users);
    setAuthUser(newUser.id);
    ensureUserCollections();
    savePreferences({ ...getPreferences(), defaultFilter: state.activePreset.id, theme: "light" });
    logActivity("auth", `Created account for ${name}`);
    closeAuthModal();
    applyTheme(getPreferences().theme || "light");
    renderAuthState();
    refreshDashboard();
    const nextRoute = state.pendingRoute || "dashboard";
    state.pendingRoute = null;
    routeTo(nextRoute);
  });

  ui.signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#signInEmail").value.trim().toLowerCase();
    const password = document.querySelector("#signInPassword").value.trim();
    const user = getUsers().find((item) => item.email === email && item.password === password);

    if (!email || !password) {
      setStatus(ui.authStatus, "Fill in both sign-in fields.");
      return;
    }

    if (!user) {
      setStatus(ui.authStatus, "Incorrect email or password.");
      return;
    }

    setAuthUser(user.id);
    closeAuthModal();
    applyTheme(getPreferences().theme || "light");
    renderAuthState();
    logActivity("auth", `Signed in as ${user.name}`);
    refreshDashboard();
    const nextRoute = state.pendingRoute || "dashboard";
    state.pendingRoute = null;
    routeTo(nextRoute);
  });
}

function bindEditor() {
  ui.topImportButton.addEventListener("click", () => routeTo("editor"));
  ui.dashboardImportButton.addEventListener("click", () => ui.globalImageInput.click());
  ui.globalImageInput.addEventListener("change", handleGlobalImport);
  ui.editorImageInput.addEventListener("change", handleEditorImport);
  ui.applyLookPromptButton?.addEventListener("click", applyLookPrompt);
  ui.lookPromptInput?.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      applyLookPrompt();
    }
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    ui.dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      ui.dropzone.classList.add("drag-active");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    ui.dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      ui.dropzone.classList.remove("drag-active");
    });
  });

  ui.dropzone.addEventListener("drop", (event) => {
    const [file] = event.dataTransfer.files;
    if (file) {
      loadFileIntoEditor(file);
      routeTo("editor");
    }
  });

  ui.presetSelect.addEventListener("change", (event) => setPreset(event.target.value));
  ui.intensityRange.addEventListener("input", handleControlChange);
  ui.detailRange.addEventListener("input", handleControlChange);
  ui.contrastRange.addEventListener("input", handleControlChange);
  ui.hueRange.addEventListener("input", handleControlChange);
  ui.shadowColorInput.addEventListener("input", renderPreview);
  ui.highlightColorInput.addEventListener("input", renderPreview);

  ui.resetButton.addEventListener("click", resetEditor);
  ui.saveProjectButton.addEventListener("click", saveProject);
  ui.downloadButton.addEventListener("click", downloadCurrentRender);
  ui.editorCompareSlider?.addEventListener("input", (event) => {
    setComparePosition(ui.editorCompareShell, event.target.value);
  });

  ["mousedown", "touchstart"].forEach((eventName) => {
    ui.beforeAfterButton.addEventListener(eventName, () => {
      state.showingBefore = true;
      ui.previewStatus.textContent = "Showing original";
      renderPreview();
    });
  });

  ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach((eventName) => {
    ui.beforeAfterButton.addEventListener(eventName, () => {
      state.showingBefore = false;
      ui.previewStatus.textContent = "Previewing current effect";
      renderPreview();
    });
  });

  bindSwipeSurface(
    ui.editorCompareShell,
    () => cyclePreset(1),
    () => cyclePreset(-1)
  );
}

function bindDashboard() {
  document.querySelectorAll("[data-dashboard-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.dashboardView = button.dataset.dashboardView;
      routeTo("dashboard");
    });
  });

  document.querySelectorAll("[data-dashboard-route]").forEach((button) => {
    button.addEventListener("click", () => routeTo(button.dataset.dashboardRoute));
  });

  ui.profileToggle.addEventListener("click", () => {
    ui.profileMenu.classList.toggle("is-hidden");
  });

  ui.logoutButton.addEventListener("click", logout);
  ui.profileLogout.addEventListener("click", logout);

  ui.importUrlButton.addEventListener("click", async () => {
    const url = window.prompt("Paste an image URL to import");
    if (!url) {
      return;
    }
    importImageFromUrl(url);
  });
}

function bindForms() {
  ui.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#contactName")?.value.trim() || "";
    const email = document.querySelector("#contactEmail")?.value.trim() || "";
    const project = document.querySelector("#contactProject")?.value.trim() || "Custom editor";
    const timeline = document.querySelector("#contactTimeline")?.value.trim() || "Flexible";
    const message = document.querySelector("#contactMessage")?.value.trim() || "";

    if (!name || !email || !message) {
      setStatus(ui.contactStatus, "Add your name, email, and a short project brief.");
      return;
    }

    const inquiries = safeParse(localStorage.getItem(STORAGE_KEYS.inquiries), []);
    inquiries.unshift({
      id: createId(),
      name,
      email,
      project,
      timeline,
      message,
      time: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(inquiries.slice(0, 50)));

    if (state.user) {
      logActivity("contact", `Submitted inquiry for ${project}`);
      refreshDashboard();
    }

    setStatus(ui.contactStatus, `Project inquiry saved for ${name}. We captured the brief successfully.`);
    ui.contactForm.reset();
  });

  ui.newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#newsletterEmail")?.value.trim().toLowerCase() || "";

    if (!email) {
      setStatus(ui.newsletterStatus, "Add your email first.");
      return;
    }

    const signups = safeParse(localStorage.getItem(STORAGE_KEYS.newsletter), []);
    if (!signups.includes(email)) {
      signups.unshift(email);
      localStorage.setItem(STORAGE_KEYS.newsletter, JSON.stringify(signups.slice(0, 100)));
    }

    setStatus(ui.newsletterStatus, "You are on the Lumix updates list.");
    ui.newsletterForm.reset();
  });

  ui.focusContactFormButton?.addEventListener("click", () => {
    ui.contactForm?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      document.querySelector("#contactName")?.focus();
    }, 220);
  });

  ui.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.user) {
      return;
    }

    state.user.name = ui.settingsDisplayName.value.trim() || state.user.name;
    const users = getUsers().map((user) => (user.id === state.user.id ? state.user : user));
    setUsers(users);
    savePreferences({
      ...getPreferences(),
      defaultFilter: ui.settingsDefaultFilter.value,
      theme: ui.settingsTheme.value,
    });
    applyTheme(ui.settingsTheme.value);
    persistTheme(ui.settingsTheme.value);
    renderAuthState();
    setStatus(ui.settingsStatus, "Settings saved.");
  });

  ui.clearHistoryButton.addEventListener("click", () => {
    if (!state.user) {
      return;
    }

    setProjects([]);
    setActivity([]);
    setStatus(ui.settingsStatus, "Project history cleared.");
    refreshDashboard();
  });
}

function routeTo(route) {
  if (["effects", "workflow", "contact"].includes(route)) {
    state.route = "landing";
    showRoute("landing");
    document.getElementById(route)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (route === "dashboard" && !state.user) {
    state.pendingRoute = "dashboard";
    openAuthModal("signin");
    return;
  }

  state.route = route;
  showRoute(route);
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (route === "dashboard") {
    renderDashboardPanels();
    refreshDashboard();
  }

  if (route === "editor") {
    renderPreview();
  }
}

function showRoute(route) {
  ui.routeViews.forEach((view) => {
    view.classList.toggle("is-hidden", view.dataset.view !== route);
  });
}

function openAuthModal(tab) {
  setAuthTab(tab);
  ui.authModal.classList.remove("is-hidden");
  ui.authModal.setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
  ui.authModal.classList.add("is-hidden");
  ui.authModal.setAttribute("aria-hidden", "true");
  setStatus(ui.authStatus, "");
  ui.signInForm.reset();
  ui.signUpForm.reset();
}

function setAuthTab(tab) {
  state.authTab = tab;
  ui.signInTab.classList.toggle("is-active", tab === "signin");
  ui.signUpTab.classList.toggle("is-active", tab === "signup");
  ui.signInForm.classList.toggle("is-hidden", tab !== "signin");
  ui.signUpForm.classList.toggle("is-hidden", tab !== "signup");
}

function renderAuthState() {
  if (state.user) {
    ui.authButton.textContent = "Dashboard";
    ui.dashboardGreeting.textContent = `Welcome back, ${state.user.name}.`;
    ui.profileName.textContent = state.user.name;
    ui.profileInitial.textContent = state.user.name.charAt(0).toUpperCase();
    ui.settingsDisplayName.value = state.user.name;
  } else {
    ui.authButton.textContent = "Sign In";
    ui.dashboardGreeting.textContent = "Welcome back.";
    ui.profileName.textContent = "lumix User";
    ui.profileInitial.textContent = "L";
    ui.settingsDisplayName.value = "";
  }

  populateDefaultFilterSelect();
  syncThemeToggle();
}

function renderDashboardPanels() {
  ui.dashboardPanels.forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.dataset.dashboardPanel !== state.dashboardView);
  });

  ui.dashboardLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.dashboardView === state.dashboardView);
  });
}

function buildPresetInputs() {
  presets.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.name;
    ui.presetSelect.append(option);

    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "preset-pill";
    pill.textContent = preset.name;
    pill.dataset.presetId = preset.id;
    pill.addEventListener("click", () => setPreset(preset.id));
    ui.presetPills.append(pill);
  });

  populateDefaultFilterSelect();
}

function populateDefaultFilterSelect() {
  const current = ui.settingsDefaultFilter.value;
  ui.settingsDefaultFilter.innerHTML = "";
  presets.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.name;
    ui.settingsDefaultFilter.append(option);
  });

  const preferences = getPreferences();
  ui.settingsDefaultFilter.value = preferences.defaultFilter || current || presets[0].id;
  ui.settingsTheme.value = preferences.theme || "light";
}

function setPreset(id) {
  const nextPreset = presets.find((preset) => preset.id === id) || presets[0];
  const changed = state.activePreset.id !== nextPreset.id;
  state.activePreset = nextPreset;
  ui.presetSelect.value = nextPreset.id;
  ui.effectTitle.textContent = nextPreset.name;
  ui.effectDescription.textContent = nextPreset.description;
  ui.effectUseCase.textContent = nextPreset.useCase;

  document.querySelectorAll(".preset-pill").forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.presetId === nextPreset.id);
  });

  if (changed && state.user) {
    logActivity("filter", `Applied ${nextPreset.name}`);
  }

  updateControlReadouts();
  renderPreview();
}

function handleControlChange() {
  updateControlReadouts();
  renderPreview();
}

function updateControlReadouts() {
  ui.intensityValue.textContent = ui.intensityRange.value;
  ui.detailValue.textContent = ui.detailRange.value;
  ui.contrastValue.textContent = ui.contrastRange.value;
  ui.hueValue.textContent = ui.hueRange.value;
}

function handleGlobalImport(event) {
  const [file] = event.target.files;
  if (file) {
    loadFileIntoEditor(file);
    routeTo("editor");
  }
  event.target.value = "";
}

function handleEditorImport(event) {
  const [file] = event.target.files;
  if (file) {
    loadFileIntoEditor(file);
  }
  event.target.value = "";
}

function loadFileIntoEditor(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      if (!claimGuestAnalysisSlot()) {
        return;
      }
      state.sourceImage = image;
      state.originalDataUrl = reader.result;
      state.activeProjectId = null;
      renderPreview();
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function importImageFromUrl(url) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    if (!claimGuestAnalysisSlot()) {
      return;
    }
    state.sourceImage = image;
    state.originalDataUrl = url;
    state.loadedRemoteUrl = url;
    routeTo("editor");
    renderPreview();
  };
  image.onerror = () => {
    window.alert("This image could not be imported. The source may block cross-origin loading.");
  };
  image.src = url;
}

function createDefaultArtwork() {
  ctx.clearRect(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  const bg = ctx.createLinearGradient(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  bg.addColorStop(0, "#0a1127");
  bg.addColorStop(0.55, "#355cff");
  bg.addColorStop(1, "#61c8ff");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.arc(310, 260, 160, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(720, 160, 420, 440);
  ctx.fillStyle = "#0c1122";
  ctx.fillRect(170, 640, 320, 200);
  ctx.fillStyle = "#e7efff";
  ctx.fillRect(520, 640, 170, 200);

  for (let index = 0; index < 9; index += 1) {
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(810 + index * 24, 140);
    ctx.lineTo(640 + index * 24, 930);
    ctx.stroke();
  }

  ctx.fillStyle = "#eef5ff";
  ctx.font = '800 124px "Manrope", sans-serif';
  ctx.fillText("LUMIX", 110, 955);

  state.originalDataUrl = ui.previewCanvas.toDataURL("image/png");
  const image = new Image();
  image.onload = () => {
    state.sourceImage = image;
    const defaultPreset = getPreferences().defaultFilter || presets[0].id;
    setPreset(defaultPreset);
  };
  image.src = state.originalDataUrl;
}

function resetEditor() {
  ui.intensityRange.value = "72";
  ui.detailRange.value = "12";
  ui.contrastRange.value = "10";
  ui.hueRange.value = "8";
  ui.shadowColorInput.value = "#101a42";
  ui.highlightColorInput.value = "#4d7cff";
  state.lookGrade = null;
  state.activeProjectId = null;
  if (ui.lookPromptInput) {
    ui.lookPromptInput.value = "";
  }
  setStatus(ui.lookPromptStatus, "");
  const base = new Image();
  base.onload = () => {
    state.sourceImage = base;
    state.originalDataUrl = base.src;
    setPreset(getPreferences().defaultFilter || presets[0].id);
  };
  base.src = state.originalDataUrl;
  updateControlReadouts();
}

function applyLookPrompt() {
  const prompt = ui.lookPromptInput?.value.trim().toLowerCase() || "";
  if (!prompt) {
    setStatus(ui.lookPromptStatus, "Describe the look you want first.");
    return;
  }

  const hasEffectRequest = /(pixel|8-bit|8 bit|retro game|arcade|glitch|broken|rgb|digital|signal|distort|vhs|retro|analog|scanline|tape|halftone|comic|newsprint|poster dots|ascii|terminal|code|text|dither|monochrome|two color|print|neon|glow|night|cyber|blueprint|technical|architect|schematic|drawing|thermal|infrared|heat|oil|paint|brush|mirror|kaleidoscope|tile|selective|color pop|keep red|keep blue|keep green)/.test(prompt);
  const hasColorRequest = /(warm|sunset|orange|amber|gold|pink|magenta|rose|green|mint|lime|blue|cool|ice|natural|neutral|reset tint|remove tint)/.test(prompt);

  const next = {
    presetId: state.activePreset.id,
    intensity: Number(ui.intensityRange.value),
    detail: Number(ui.detailRange.value),
    contrast: Number(ui.contrastRange.value),
    hue: Number(ui.hueRange.value),
    shadow: ui.shadowColorInput.value,
    highlight: ui.highlightColorInput.value,
  };

  if (/(pixel|8-bit|8 bit|retro game|arcade)/.test(prompt)) {
    next.presetId = "pixel";
    next.intensity = 84;
    next.detail = 20;
    next.contrast = 18;
  } else if (/(glitch|broken|rgb|digital|signal|distort)/.test(prompt)) {
    next.presetId = "glitch";
    next.intensity = 82;
    next.detail = 18;
    next.contrast = 12;
  } else if (/(vhs|retro|analog|scanline|tape)/.test(prompt)) {
    next.presetId = "vhs";
    next.intensity = 76;
    next.detail = 16;
    next.contrast = 6;
  } else if (/(halftone|comic|newsprint|poster dots)/.test(prompt)) {
    next.presetId = "halftone";
    next.intensity = 68;
    next.detail = 16;
    next.shadow = "#0f1732";
    next.highlight = "#f4efe7";
  } else if (/(ascii|terminal|code|text)/.test(prompt)) {
    next.presetId = "ascii";
    next.intensity = 64;
    next.detail = 14;
  } else if (/(dither|monochrome|two color|print)/.test(prompt)) {
    next.presetId = "dither";
    next.intensity = 66;
    next.detail = 12;
    next.shadow = "#10141f";
    next.highlight = "#f5f2e8";
  } else if (/(neon|glow|night|cyber)/.test(prompt)) {
    next.presetId = "neon";
    next.intensity = 82;
    next.detail = 14;
    next.contrast = 20;
    next.shadow = "#050816";
    next.highlight = "#65d8ff";
  } else if (/(blueprint|technical|architect|schematic|drawing)/.test(prompt)) {
    next.presetId = "blueprint";
    next.intensity = 78;
    next.detail = 18;
    next.contrast = 18;
    next.shadow = "#1b3d90";
    next.highlight = "#cde3ff";
  } else if (/(thermal|infrared|heat)/.test(prompt)) {
    next.presetId = "thermal";
    next.intensity = 80;
    next.detail = 10;
  } else if (/(oil|paint|brush)/.test(prompt)) {
    next.presetId = "oil";
    next.intensity = 70;
    next.detail = 22;
    next.contrast = 10;
  } else if (/(mirror|kaleidoscope|tile)/.test(prompt)) {
    next.presetId = "tile";
    next.intensity = 72;
    next.detail = 12;
  } else if (/(selective|color pop|keep red|keep blue|keep green)/.test(prompt)) {
    next.presetId = "selective";
    next.intensity = 70;
    next.detail = 24;
  }

  if (/(warm|sunset|orange|amber|gold)/.test(prompt)) {
    next.highlight = "#ffb25a";
    next.shadow = "#20133c";
    next.hue = 32;
    state.lookGrade = { color: "#ffb25a", opacity: 0.14, mode: "soft-light" };
  } else if (/(pink|magenta|rose)/.test(prompt)) {
    next.highlight = "#ff72d3";
    next.shadow = "#22103b";
    next.hue = 332;
    state.lookGrade = { color: "#ff72d3", opacity: 0.16, mode: "soft-light" };
  } else if (/(green|mint|lime)/.test(prompt)) {
    next.highlight = "#76ffb1";
    next.shadow = "#112d24";
    next.hue = 128;
    state.lookGrade = { color: "#76ffb1", opacity: 0.15, mode: "soft-light" };
  } else if (/(blue|cool|ice)/.test(prompt)) {
    next.highlight = "#78d4ff";
    next.shadow = "#101a42";
    next.hue = 206;
    state.lookGrade = { color: "#4d7cff", opacity: 0.18, mode: "soft-light" };
  } else if (/(natural|neutral|reset tint|remove tint)/.test(prompt)) {
    state.lookGrade = null;
  } else if (hasEffectRequest && !hasColorRequest) {
    state.lookGrade = null;
  }

  if (/(soft|subtle)/.test(prompt)) {
    next.intensity = Math.max(44, next.intensity - 18);
    next.contrast = Math.max(0, next.contrast - 8);
  }

  if (/(strong|bold|dramatic|intense)/.test(prompt)) {
    next.intensity = Math.min(96, next.intensity + 12);
    next.contrast = Math.min(32, next.contrast + 10);
  }

  ui.intensityRange.value = String(next.intensity);
  ui.detailRange.value = String(next.detail);
  ui.contrastRange.value = String(next.contrast);
  ui.hueRange.value = String(next.hue);
  ui.shadowColorInput.value = next.shadow;
  ui.highlightColorInput.value = next.highlight;
  updateControlReadouts();
  setPreset(next.presetId);
  setStatus(ui.lookPromptStatus, `Applied ${state.activePreset.name} from your description.`);

  if (state.user) {
    logActivity("prompt", `Applied a described look with ${state.activePreset.name}`);
    refreshDashboard();
  }
}

function setComparePosition(shell, value) {
  if (!shell) {
    return;
  }
  shell.style.setProperty("--compare-position", `${value}%`);
}

function syncEditorCompareCanvases(preserveAfter = false) {
  if (!compareBeforeCtx || !compareAfterCtx || !state.sourceImage.complete) {
    return;
  }

  drawBaseImage(state.sourceImage, compareBeforeCtx, ui.editorCompareBeforeCanvas);

  if (preserveAfter) {
    return;
  }

  compareAfterCtx.clearRect(0, 0, ui.editorCompareAfterCanvas.width, ui.editorCompareAfterCanvas.height);
  compareAfterCtx.drawImage(
    ui.previewCanvas,
    0,
    0,
    ui.editorCompareAfterCanvas.width,
    ui.editorCompareAfterCanvas.height
  );
}

function cyclePreset(direction) {
  const currentIndex = presets.findIndex((preset) => preset.id === state.activePreset.id);
  const nextIndex = (currentIndex + direction + presets.length) % presets.length;
  setPreset(presets[nextIndex].id);
}

function setHeroDemoEffect(effectId) {
  const nextDemo = DEMO_EFFECTS[effectId] || DEMO_EFFECTS.duotone;
  state.activeHeroDemo = effectId in DEMO_EFFECTS ? effectId : "duotone";

  if (ui.heroDemoAfter) {
    ui.heroDemoAfter.src = nextDemo.src;
    ui.heroDemoAfter.alt = `${presets.find((preset) => preset.id === nextDemo.presetId)?.name || "Lumix"} demo result`;
  }

  if (ui.heroDemoCaption) {
    ui.heroDemoCaption.textContent = nextDemo.caption;
  }

  ui.heroDemoTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.demoEffect === state.activeHeroDemo);
  });
}

function cycleHeroDemo(direction) {
  const ids = Object.keys(DEMO_EFFECTS);
  const currentIndex = ids.indexOf(state.activeHeroDemo);
  const nextIndex = (currentIndex + direction + ids.length) % ids.length;
  setHeroDemoEffect(ids[nextIndex]);
}

function bindSwipeSurface(element, onNext, onPrevious) {
  if (!element) {
    return;
  }

  let startX = 0;
  let startY = 0;

  element.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true }
  );

  element.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }
      if (deltaX < 0) {
        onNext();
      } else {
        onPrevious();
      }
    },
    { passive: true }
  );
}

function renderPreview() {
  if (!state.sourceImage.complete) {
    return;
  }

  if (state.showingBefore) {
    drawBaseImage(state.sourceImage, ctx, ui.previewCanvas);
    syncEditorCompareCanvases(true);
    return;
  }

  switch (state.activePreset.mode) {
    case "pixel":
      renderPixel();
      break;
    case "glitch":
      renderGlitch();
      break;
    case "halftone":
      renderHalftone();
      break;
    case "duotone":
      renderDuotone();
      break;
    case "ascii":
      renderAscii();
      break;
    case "vhs":
      renderVhs();
      break;
    case "dither":
      renderDither();
      break;
    case "chromatic":
      renderChromatic();
      break;
    case "oil":
      renderOil();
      break;
    case "selective":
      renderSelectiveColor();
      break;
    case "neon":
      renderNeon();
      break;
    case "tile":
      renderTileMirror();
      break;
    case "thermal":
      renderThermal();
      break;
    case "blueprint":
      renderBlueprint();
      break;
    default:
      drawBaseImage(state.sourceImage, ctx, ui.previewCanvas);
  }

  applyLookGrade();
  syncEditorCompareCanvases();
}

function applyLookGrade() {
  if (!state.lookGrade) {
    return;
  }

  ctx.save();
  ctx.globalAlpha = state.lookGrade.opacity;
  ctx.globalCompositeOperation = state.lookGrade.mode;
  ctx.fillStyle = state.lookGrade.color;
  ctx.fillRect(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  ctx.restore();
}

function getIntensity() {
  return Number(ui.intensityRange.value) / 100;
}

function getDetail() {
  return Number(ui.detailRange.value);
}

function getContrast() {
  return 1 + Number(ui.contrastRange.value) / 100;
}

function renderPixel() {
  const sampleCanvas = document.createElement("canvas");
  const sampleCtx = sampleCanvas.getContext("2d");
  const pixelSize = Math.max(2, getDetail());
  sampleCanvas.width = Math.max(24, Math.floor(ui.previewCanvas.width / pixelSize));
  sampleCanvas.height = Math.max(24, Math.floor(ui.previewCanvas.height / pixelSize));
  sampleCtx.imageSmoothingEnabled = false;
  drawBaseImage(state.sourceImage, sampleCtx, sampleCanvas);
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  ctx.drawImage(sampleCanvas, 0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  ctx.imageSmoothingEnabled = true;
  const frame = ctx.getImageData(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  const posterLevels = 3 + Math.round(getIntensity() * 4);
  forEachPixel(frame.data, (r, g, b, index, data) => {
    data[index] = posterize(applyContrast(r, getContrast()), posterLevels);
    data[index + 1] = posterize(applyContrast(g, getContrast()), posterLevels);
    data[index + 2] = posterize(applyContrast(b, getContrast()), posterLevels);
  });
  ctx.putImageData(frame, 0, 0);
}

function renderGlitch() {
  drawBaseImage(state.sourceImage, ctx, ui.previewCanvas);
  const frame = ctx.getImageData(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  const clone = new Uint8ClampedArray(frame.data);
  const shift = Math.max(4, Math.round(getDetail() * (0.5 + getIntensity())));
  const width = frame.width;
  const height = frame.height;

  for (let y = 0; y < height; y += 1) {
    const rowShift = y % 23 < 4 ? shift * 2 : shift;
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const rIndex = (y * width + clampInt(x + rowShift, 0, width - 1)) * 4;
      const bIndex = (y * width + clampInt(x - rowShift, 0, width - 1)) * 4;
      frame.data[index] = clone[rIndex];
      frame.data[index + 1] = applyContrast(clone[index + 1], getContrast());
      frame.data[index + 2] = clone[bIndex + 2];
    }
  }

  ctx.putImageData(frame, 0, 0);
  ctx.save();
  for (let i = 0; i < 14; i += 1) {
    const tearY = Math.random() * ui.previewCanvas.height;
    const tearHeight = 2 + Math.random() * 8;
    const tearOffset = (Math.random() - 0.5) * getDetail() * 8;
    ctx.drawImage(ui.previewCanvas, 0, tearY, ui.previewCanvas.width, tearHeight, tearOffset, tearY, ui.previewCanvas.width, tearHeight);
  }
  ctx.restore();
}

function renderHalftone() {
  const temp = getBaseImageData();
  ctx.clearRect(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  ctx.fillStyle = "#f7f2ec";
  ctx.fillRect(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  const step = Math.max(6, getDetail() + 2);
  const dotColor = hexToRgb(ui.shadowColorInput.value);
  for (let y = 0; y < temp.height; y += step) {
    for (let x = 0; x < temp.width; x += step) {
      const index = (y * temp.width + x) * 4;
      const luma = (temp.data[index] + temp.data[index + 1] + temp.data[index + 2]) / 765;
      const radius = (1 - luma) * step * (0.6 + getIntensity());
      ctx.fillStyle = `rgb(${dotColor.join(",")})`;
      ctx.beginPath();
      ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function renderDuotone() {
  const frame = getBaseImageData();
  const shadow = hexToRgb(ui.shadowColorInput.value);
  const highlight = hexToRgb(ui.highlightColorInput.value);
  forEachPixel(frame.data, (r, g, b, index, data) => {
    const luma = clamp((r + g + b) / 765 + getIntensity() * 0.08, 0, 1);
    const blend = blendColors(shadow, highlight, luma);
    data[index] = blend[0];
    data[index + 1] = blend[1];
    data[index + 2] = blend[2];
  });
  ctx.putImageData(frame, 0, 0);
}

function renderAscii() {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = ui.previewCanvas.width;
  tempCanvas.height = ui.previewCanvas.height;
  drawBaseImage(state.sourceImage, tempCtx, tempCanvas);
  const sample = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const chars = "@%#*+=-:. ";
  const step = Math.max(7, getDetail() + 4);
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  ctx.fillStyle = "#ffeddc";
  ctx.font = `${step}px Menlo, Monaco, monospace`;
  for (let y = 0; y < sample.height; y += step) {
    for (let x = 0; x < sample.width; x += step * 0.68) {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const index = (iy * sample.width + ix) * 4;
      const luma = (sample.data[index] + sample.data[index + 1] + sample.data[index + 2]) / 765;
      const charIndex = Math.min(chars.length - 1, Math.floor(luma * (chars.length - 1)));
      ctx.fillText(chars[charIndex], x, y);
    }
  }
}

function renderVhs() {
  renderChromaticBase(6 + getDetail() / 2);
  const frame = ctx.getImageData(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  for (let y = 0; y < ui.previewCanvas.height; y += 4) {
    for (let x = 0; x < ui.previewCanvas.width; x += 1) {
      const index = (y * ui.previewCanvas.width + x) * 4;
      const noise = (Math.random() - 0.5) * 40 * getIntensity();
      frame.data[index] = clamp(frame.data[index] + 14 + noise, 0, 255);
      frame.data[index + 1] = clamp(frame.data[index + 1] + noise * 0.4, 0, 255);
      frame.data[index + 2] = clamp(frame.data[index + 2] + 24 + noise * 0.8, 0, 255);
    }
  }
  ctx.putImageData(frame, 0, 0);
  ctx.save();
  ctx.globalAlpha = 0.12 + getIntensity() * 0.12;
  for (let y = 0; y < ui.previewCanvas.height; y += 5) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, y, ui.previewCanvas.width, 1);
  }
  ctx.restore();
}

function renderDither() {
  const frame = getBaseImageData();
  const dark = hexToRgb(ui.shadowColorInput.value);
  const light = hexToRgb(ui.highlightColorInput.value);
  const grayscale = new Float32Array(frame.width * frame.height);

  for (let i = 0, p = 0; i < frame.data.length; i += 4, p += 1) {
    grayscale[p] = (frame.data[i] + frame.data[i + 1] + frame.data[i + 2]) / 3;
  }

  for (let y = 0; y < frame.height; y += 1) {
    for (let x = 0; x < frame.width; x += 1) {
      const index = y * frame.width + x;
      const oldPixel = grayscale[index];
      const threshold = 128 + (getIntensity() - 0.5) * 50;
      const newPixel = oldPixel < threshold ? 0 : 255;
      const error = oldPixel - newPixel;
      grayscale[index] = newPixel;

      diffuseError(grayscale, frame.width, frame.height, x + 1, y, error * (7 / 16));
      diffuseError(grayscale, frame.width, frame.height, x - 1, y + 1, error * (3 / 16));
      diffuseError(grayscale, frame.width, frame.height, x, y + 1, error * (5 / 16));
      diffuseError(grayscale, frame.width, frame.height, x + 1, y + 1, error * (1 / 16));
    }
  }

  for (let y = 0; y < frame.height; y += 1) {
    for (let x = 0; x < frame.width; x += 1) {
      const gray = grayscale[y * frame.width + x] / 255;
      const color = blendColors(dark, light, gray);
      const offset = (y * frame.width + x) * 4;
      frame.data[offset] = color[0];
      frame.data[offset + 1] = color[1];
      frame.data[offset + 2] = color[2];
    }
  }

  ctx.putImageData(frame, 0, 0);
}

function renderChromatic() {
  renderChromaticBase(Math.max(3, getDetail() / 2));
}

function renderChromaticBase(shiftAmount) {
  drawBaseImage(state.sourceImage, ctx, ui.previewCanvas);
  const frame = ctx.getImageData(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  const clone = new Uint8ClampedArray(frame.data);
  const width = frame.width;

  for (let y = 0; y < frame.height; y += 1) {
    for (let x = 0; x < frame.width; x += 1) {
      const index = (y * width + x) * 4;
      const rIndex = (y * width + clampInt(x + shiftAmount, 0, width - 1)) * 4;
      const bIndex = (y * width + clampInt(x - shiftAmount, 0, width - 1)) * 4;
      frame.data[index] = clone[rIndex];
      frame.data[index + 2] = clone[bIndex + 2];
      frame.data[index + 1] = applyContrast(clone[index + 1], getContrast());
    }
  }

  ctx.putImageData(frame, 0, 0);
}

function renderOil() {
  const base = getBaseImageData();
  const size = Math.max(3, Math.round(getDetail() / 2));
  ctx.clearRect(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  for (let y = 0; y < base.height; y += size) {
    for (let x = 0; x < base.width; x += size) {
      const avg = getAverageBlockColor(base, x, y, size);
      ctx.fillStyle = `rgb(${avg[0]}, ${avg[1]}, ${avg[2]})`;
      ctx.fillRect(x, y, size + 1, size + 1);
    }
  }
}

function renderSelectiveColor() {
  const frame = getBaseImageData();
  const targetHue = Number(ui.hueRange.value);
  const tolerance = 18 + getDetail() / 2;
  forEachPixel(frame.data, (r, g, b, index, data) => {
    const [h] = rgbToHsl(r, g, b);
    const distance = hueDistance(h, targetHue);
    if (distance > tolerance) {
      const gray = (r + g + b) / 3;
      data[index] = gray;
      data[index + 1] = gray;
      data[index + 2] = gray;
    } else {
      data[index] = applyContrast(r, getContrast());
      data[index + 1] = applyContrast(g, getContrast());
      data[index + 2] = applyContrast(b, getContrast());
    }
  });
  ctx.putImageData(frame, 0, 0);
}

function renderNeon() {
  const frame = getBaseImageData();
  const width = frame.width;
  const height = frame.height;
  const shadow = hexToRgb(ui.shadowColorInput.value);
  const glow = hexToRgb(ui.highlightColorInput.value);
  const output = ctx.createImageData(width, height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const edge = getEdgeStrength(frame.data, x, y, width, height);
      const baseDark = 10 + edge * 50;
      const mixColor = blendColors(shadow, glow, clamp(edge * 1.4, 0, 1));
      output.data[index] = clamp(baseDark + mixColor[0] * edge * (1.2 + getIntensity()), 0, 255);
      output.data[index + 1] = clamp(baseDark + mixColor[1] * edge * (1.2 + getIntensity()), 0, 255);
      output.data[index + 2] = clamp(baseDark + mixColor[2] * edge * (1.2 + getIntensity()), 0, 255);
      output.data[index + 3] = 255;
    }
  }

  ctx.putImageData(output, 0, 0);
}

function renderTileMirror() {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = ui.previewCanvas.width / 2;
  tempCanvas.height = ui.previewCanvas.height / 2;
  drawBaseImage(state.sourceImage, tempCtx, tempCanvas);
  ctx.clearRect(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.save();
  ctx.translate(ui.previewCanvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(0, ui.previewCanvas.height);
  ctx.scale(1, -1);
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(ui.previewCanvas.width, ui.previewCanvas.height);
  ctx.scale(-1, -1);
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.restore();
}

function renderThermal() {
  const frame = getBaseImageData();
  forEachPixel(frame.data, (r, g, b, index, data) => {
    const mapped = thermalMap((r + g + b) / 765);
    data[index] = mapped[0];
    data[index + 1] = mapped[1];
    data[index + 2] = mapped[2];
  });
  ctx.putImageData(frame, 0, 0);
}

function renderBlueprint() {
  const frame = getBaseImageData();
  const width = frame.width;
  const height = frame.height;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const edge = getEdgeStrength(frame.data, x, y, width, height);
      frame.data[index] = clamp(18 + edge * 220, 0, 255);
      frame.data[index + 1] = clamp(90 + edge * 170, 0, 255);
      frame.data[index + 2] = clamp(160 + edge * 90, 0, 255);
    }
  }
  ctx.putImageData(frame, 0, 0);
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  for (let x = 0; x < ui.previewCanvas.width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ui.previewCanvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < ui.previewCanvas.height; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ui.previewCanvas.width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBaseImage(image, targetCtx, targetCanvas) {
  const scale = Math.max(targetCanvas.width / image.width, targetCanvas.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  const x = (targetCanvas.width - width) / 2;
  const y = (targetCanvas.height - height) / 2;
  targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  targetCtx.drawImage(image, x, y, width, height);
}

function getBaseImageData() {
  drawBaseImage(state.sourceImage, ctx, ui.previewCanvas);
  return ctx.getImageData(0, 0, ui.previewCanvas.width, ui.previewCanvas.height);
}

function saveProject() {
  if (!state.user) {
    state.pendingRoute = "dashboard";
    openAuthModal("signin");
    setStatus(ui.authStatus, "Sign in to save projects to your dashboard.");
    return;
  }

  const projects = getProjects();
  const project = {
    id: state.activeProjectId || createId(),
    name: `${state.activePreset.name} Edit`,
    effect: state.activePreset.name,
    effectId: state.activePreset.id,
    date: new Date().toISOString(),
    thumbnail: ui.previewCanvas.toDataURL("image/png"),
    original: state.originalDataUrl,
    settings: getCurrentEditorSettings(),
    lookGrade: state.lookGrade,
    lookPrompt: ui.lookPromptInput?.value.trim() || "",
  };

  const nextProjects = [project, ...projects.filter((item) => item.id !== project.id)].slice(0, 24);
  setProjects(nextProjects);
  state.activeProjectId = project.id;
  logActivity("save", `Saved project with ${state.activePreset.name}`);
  refreshDashboard();
  setStatus(ui.previewStatus, "Project saved to dashboard.");
}

function downloadCurrentRender() {
  const link = document.createElement("a");
  link.download = `${state.activePreset.id}-effect.png`;
  link.href = ui.previewCanvas.toDataURL("image/png");
  link.click();

  if (state.user) {
    logActivity("export", `Exported PNG with ${state.activePreset.name}`);
    refreshDashboard();
  }
}

function claimGuestAnalysisSlot() {
  if (state.user) {
    return true;
  }

  const currentCount = getGuestAnalysisCount();
  if (currentCount >= GUEST_ANALYSIS_LIMIT) {
    state.pendingRoute = "editor";
    openAuthModal("signin");
    setStatus(
      ui.authStatus,
      `You have reached the free limit of ${GUEST_ANALYSIS_LIMIT} image analyses. Sign in to keep editing.`
    );
    setStatus(ui.previewStatus, "Free guest limit reached. Sign in to analyze more images.");
    return false;
  }

  const nextCount = currentCount + 1;
  setGuestAnalysisCount(nextCount);
  const remaining = GUEST_ANALYSIS_LIMIT - nextCount;
  setStatus(
    ui.previewStatus,
    remaining > 0 ? `${remaining} free image analyses remaining.` : "Free guest limit reached after this analysis."
  );
  return true;
}

function getGuestAnalysisCount() {
  return Number(localStorage.getItem(STORAGE_KEYS.guestAnalyses) || "0");
}

function setGuestAnalysisCount(value) {
  localStorage.setItem(STORAGE_KEYS.guestAnalyses, String(value));
}

function refreshDashboard() {
  if (!state.user) {
    return;
  }

  const projects = getProjects();
  const activity = getActivity();
  const realProjects = projects.filter((project) => !project.demo);
  const starterProjects = projects.filter((project) => project.demo);
  const favorite = getFavoriteFilter(projects, activity);
  const exportsCount = Math.max(
    activity.filter((item) => item.type === "export").length,
    realProjects.length ? 0 : starterProjects.length
  );
  const daysActive = getDaysActive(activity, state.user.createdAt);
  ui.statImages.textContent = String(projects.length);
  ui.statFavorite.textContent = favorite;
  ui.statExports.textContent = String(exportsCount);
  ui.statDays.textContent = String(daysActive);

  if (!realProjects.length && starterProjects.length) {
    ui.dashboardHeroTitle.textContent = "Starter projects are loaded so your dashboard feels alive from the first visit.";
    ui.dashboardHeroNote.textContent =
      "Use the sample edits as a quality benchmark, then replace them with your own work as you save and export.";
  } else if (realProjects.length) {
    ui.dashboardHeroTitle.textContent = "Your edits, exports, and saved looks are all tracked in one workspace.";
    ui.dashboardHeroNote.textContent =
      "Keep building from your own saved projects, reopen them quickly, and use the dashboard as your creative command center.";
  }

  ui.recentProjectsGrid.innerHTML = "";
  ui.allProjectsGrid.innerHTML = "";
  ui.activityFeed.innerHTML = "";

  if (!projects.length) {
    ui.recentProjectsGrid.append(buildEmptyStateCard("No projects yet", "Open the editor, apply a look, and save your first project."));
    ui.allProjectsGrid.append(buildEmptyStateCard("Your project library is empty", "Use the starter demo or import an image to begin building a real archive."));
  } else {
    projects.slice(0, 4).forEach((project) => ui.recentProjectsGrid.append(buildProjectCard(project)));
    projects.forEach((project) => ui.allProjectsGrid.append(buildProjectCard(project)));
  }

  if (!activity.length) {
    ui.activityFeed.append(buildEmptyStateCard("No activity yet", "Apply a filter, save a project, or export a PNG to start the feed."));
  } else {
    activity.slice(0, 10).forEach((item) => {
      const row = document.createElement("div");
      row.className = "activity-row";
      row.innerHTML = `<strong>${item.label}</strong><div class="activity-time">${formatDate(item.time)}</div>`;
      ui.activityFeed.append(row);
    });
  }
}

function buildProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.innerHTML = `
    <img class="project-thumb" src="${project.thumbnail}" alt="${project.name}" />
    <div class="project-info">
      <span class="project-tag">${project.demo ? `${project.effect} · Demo` : project.effect}</span>
      <h4>${project.name}</h4>
      <p class="project-meta">${project.demo ? `${project.note} · ${formatDate(project.date)}` : formatDate(project.date)}</p>
    </div>
    <div class="project-overlay">
      <button type="button" data-project-open="${project.id}">Open in Editor</button>
      <button type="button" data-project-download="${project.id}">Download</button>
    </div>
  `;

  card.querySelector("[data-project-open]").addEventListener("click", () => openProject(project.id));
  card.querySelector("[data-project-download]").addEventListener("click", () => downloadProject(project.id));
  return card;
}

function buildEmptyStateCard(title, message) {
  const card = document.createElement("div");
  card.className = "empty-state";
  card.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  return card;
}

function openProject(projectId) {
  const project = getProjects().find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  const image = new Image();
  image.onload = () => {
    state.sourceImage = image;
    state.originalDataUrl = project.original || project.thumbnail;
    state.activeProjectId = project.id;
    applyEditorSettings(project.settings);
    state.lookGrade = project.lookGrade || null;
    if (ui.lookPromptInput) {
      ui.lookPromptInput.value = project.lookPrompt || "";
    }
    setPreset(project.effectId || presets[0].id);
    routeTo("editor");
  };
  image.src = project.original || project.thumbnail;
}

function downloadProject(projectId) {
  const project = getProjects().find((item) => item.id === projectId);
  if (!project) {
    return;
  }
  const link = document.createElement("a");
  link.href = project.thumbnail;
  link.download = `${project.effectId || "project"}-saved.png`;
  link.click();
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.auth);
  state.user = null;
  state.dashboardView = "home";
  ui.profileMenu.classList.add("is-hidden");
  applyTheme(getInitialTheme());
  renderAuthState();
  routeTo("landing");
}

function restoreAuth() {
  const auth = safeParse(localStorage.getItem(STORAGE_KEYS.auth), null);
  if (!auth?.userId) {
    return;
  }
  state.user = getUsers().find((user) => user.id === auth.userId) || null;
  ensureUserCollections();
}

function setAuthUser(userId) {
  localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify({ userId }));
  state.user = getUsers().find((user) => user.id === userId) || null;
}

function getUsers() {
  return safeParse(localStorage.getItem(STORAGE_KEYS.users), []);
}

function setUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function ensureUserCollections() {
  if (!state.user) {
    return;
  }

  if (!localStorage.getItem(preferencesKey())) {
    savePreferences({ defaultFilter: "pixel", theme: "light" });
  }

  const seedKey = workspaceSeedKey();
  const hasSeeded = localStorage.getItem(seedKey) === "true";
  const currentProjects = safeParse(localStorage.getItem(projectsKey()), []);
  const currentActivity = safeParse(localStorage.getItem(activityKey()), []);

  if (!hasSeeded && !currentProjects.length && !currentActivity.length) {
    setProjects(buildStarterProjects());
    setActivity(buildStarterActivity());
    localStorage.setItem(seedKey, "true");
    return;
  }

  if (!localStorage.getItem(projectsKey())) {
    setProjects([]);
  }
  if (!localStorage.getItem(activityKey())) {
    setActivity([]);
  }
}

function getProjects() {
  if (!state.user) {
    return [];
  }
  return safeParse(localStorage.getItem(projectsKey()), []);
}

function setProjects(projects) {
  localStorage.setItem(projectsKey(), JSON.stringify(projects));
}

function getActivity() {
  if (!state.user) {
    return [];
  }
  return safeParse(localStorage.getItem(activityKey()), []);
}

function setActivity(activity) {
  localStorage.setItem(activityKey(), JSON.stringify(activity));
}

function logActivity(type, label) {
  if (!state.user) {
    return;
  }
  const activity = getActivity();
  activity.unshift({
    id: createId(),
    type,
    label,
    time: new Date().toISOString(),
  });
  setActivity(activity.slice(0, 60));
}

function getPreferences() {
  if (!state.user) {
    return { defaultFilter: "pixel", theme: "light" };
  }
  return safeParse(localStorage.getItem(preferencesKey()), { defaultFilter: "pixel", theme: "light" });
}

function savePreferences(preferences) {
  if (!state.user) {
    return;
  }
  localStorage.setItem(preferencesKey(), JSON.stringify(preferences));
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", theme === "dark" ? "#131928" : "#365CFF");
  }
  syncThemeToggle();
}

function persistTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  if (state.user) {
    savePreferences({ ...getPreferences(), theme });
  }
}

function getInitialTheme() {
  if (state.user) {
    return getPreferences().theme || localStorage.getItem(STORAGE_KEYS.theme) || "light";
  }
  return localStorage.getItem(STORAGE_KEYS.theme) || "light";
}

function syncThemeToggle() {
  if (!ui.themeToggle) {
    return;
  }
  ui.themeToggle.textContent = document.body.dataset.theme === "dark" ? "◐" : "◌";
  ui.themeToggle.title = document.body.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

function projectsKey() {
  return `framelab_projects_${state.user.id}`;
}

function activityKey() {
  return `framelab_activity_${state.user.id}`;
}

function preferencesKey() {
  return `framelab_preferences_${state.user.id}`;
}

function workspaceSeedKey() {
  return `lumix_workspace_seeded_${state.user.id}`;
}

function buildStarterProjects() {
  const now = Date.now();
  return STARTER_PROJECT_TEMPLATES.map((template, index) => ({
    id: createId(),
    name: template.name,
    effect: template.effect,
    effectId: template.effectId,
    date: new Date(now - index * 1000 * 60 * 90).toISOString(),
    thumbnail: template.thumbnail,
    original: template.original,
    demo: true,
    note: template.note,
  }));
}

function buildStarterActivity() {
  const now = Date.now();
  return [
    { id: createId(), type: "demo", label: "Loaded starter workspace with 4 sample edits", time: new Date(now - 600000).toISOString() },
    { id: createId(), type: "demo", label: "Starter compare demo ready in the editor", time: new Date(now - 420000).toISOString() },
    { id: createId(), type: "demo", label: "Starter PNG exports included for preview", time: new Date(now - 240000).toISOString() },
  ];
}

function getFavoriteFilter(projects, activity) {
  const counts = new Map();
  projects.forEach((project) => {
    counts.set(project.effect, (counts.get(project.effect) || 0) + 1);
  });
  activity
    .filter((item) => item.type === "filter")
    .forEach((item) => {
      const name = item.label.replace("Applied ", "");
      counts.set(name, (counts.get(name) || 0) + 1);
    });

  if (!counts.size) {
    return "None yet";
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function bindMicroInteractions() {
  const targets = document.querySelectorAll(
    ".button, .nav-button, .feature-card, .workflow-card, .hero-panel, .quick-card, .project-card, .control-panel, .preview-panel, .contact-card, .stat-card, .home-card, .effect-demo-card, .showcase-tile, .contact-banner, .contact-form-card, .newsletter-card, .dashboard-hero-card, .workflow-board-main, .workflow-board-side, .hero-demo-card, .result-card, .pricing-card, .pricing-compare"
  );

  targets.forEach((element) => {
    element.classList.add("tilt-hover");
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      element.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
      element.style.setProperty("--ry", `${(x - 0.5) * 6}deg`);
      element.style.setProperty("--tx", `${(x - 0.5) * 4}px`);
      element.style.setProperty("--ty", `${(y - 0.5) * 4}px`);
      element.style.setProperty("--glow-x", `${x * 100}%`);
      element.style.setProperty("--glow-y", `${y * 100}%`);
    });

    element.addEventListener("pointerleave", () => {
      element.style.removeProperty("--rx");
      element.style.removeProperty("--ry");
      element.style.removeProperty("--tx");
      element.style.removeProperty("--ty");
      element.style.removeProperty("--glow-x");
      element.style.removeProperty("--glow-y");
    });
  });
}

function bindCursorDot() {
  if (!ui.cursorDot) {
    return;
  }

  if (window.matchMedia("(pointer: coarse)").matches) {
    ui.cursorDot.classList.add("is-hidden");
    return;
  }

  const interactiveSelector =
    "a, button, input, select, textarea, .home-card, .showcase-tile, .effect-demo-card, .quick-card, .project-card, .stat-card, .stack-card, .hero-demo-card, .pricing-card";

  window.addEventListener("pointermove", (event) => {
    ui.cursorDot.style.left = `${event.clientX}px`;
    ui.cursorDot.style.top = `${event.clientY}px`;
    ui.cursorDot.classList.add("is-visible");

    if (event.target instanceof Element) {
      ui.cursorDot.classList.toggle("is-active", Boolean(event.target.closest(interactiveSelector)));
    }
  });

  window.addEventListener("pointerdown", () => {
    ui.cursorDot.classList.add("is-pressed");
  });

  window.addEventListener("pointerup", () => {
    ui.cursorDot.classList.remove("is-pressed");
  });

  window.addEventListener("blur", () => {
    ui.cursorDot.classList.remove("is-visible", "is-active", "is-pressed");
  });
}

function bindPressFeedback() {
  const selector = ".nav-link, .nav-button, .button, .showcase-pill, .demo-effect-tab, .sidebar-link";

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target.closest(selector) : null;
    if (!target) {
      return;
    }

    target.classList.remove("is-clicked");
    window.requestAnimationFrame(() => {
      target.classList.add("is-clicked");
      window.setTimeout(() => target.classList.remove("is-clicked"), 430);
    });
  });
}

function getDaysActive(activity, createdAt) {
  const first = activity.length ? activity[activity.length - 1].time : createdAt;
  const start = new Date(first);
  const diff = Date.now() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getCurrentEditorSettings() {
  return {
    intensity: ui.intensityRange.value,
    detail: ui.detailRange.value,
    contrast: ui.contrastRange.value,
    hue: ui.hueRange.value,
    shadow: ui.shadowColorInput.value,
    highlight: ui.highlightColorInput.value,
  };
}

function applyEditorSettings(settings = {}) {
  ui.intensityRange.value = settings.intensity || ui.intensityRange.value;
  ui.detailRange.value = settings.detail || ui.detailRange.value;
  ui.contrastRange.value = settings.contrast || ui.contrastRange.value;
  ui.hueRange.value = settings.hue || ui.hueRange.value;
  ui.shadowColorInput.value = settings.shadow || ui.shadowColorInput.value;
  ui.highlightColorInput.value = settings.highlight || ui.highlightColorInput.value;
  updateControlReadouts();
}

function setStatus(element, message) {
  element.textContent = message;
}

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function diffuseError(buffer, width, height, x, y, amount) {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return;
  }
  buffer[y * width + x] += amount;
}

function getAverageBlockColor(imageData, startX, startY, size) {
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (let y = startY; y < Math.min(imageData.height, startY + size); y += 1) {
    for (let x = startX; x < Math.min(imageData.width, startX + size); x += 1) {
      const index = (y * imageData.width + x) * 4;
      r += imageData.data[index];
      g += imageData.data[index + 1];
      b += imageData.data[index + 2];
      count += 1;
    }
  }
  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

function getEdgeStrength(data, x, y, width, height) {
  const current = getLuma(data, x, y, width);
  const right = getLuma(data, Math.min(width - 1, x + 1), y, width);
  const down = getLuma(data, x, Math.min(height - 1, y + 1), width);
  return Math.min(1, (Math.abs(current - right) + Math.abs(current - down)) / 180);
}

function getLuma(data, x, y, width) {
  const index = (y * width + x) * 4;
  return (data[index] + data[index + 1] + data[index + 2]) / 3;
}

function forEachPixel(data, callback) {
  for (let index = 0; index < data.length; index += 4) {
    callback(data[index], data[index + 1], data[index + 2], index, data);
  }
}

function blendColors(start, end, amount) {
  const clamped = clamp(amount, 0, 1);
  return [
    Math.round(mix(start[0], end[0], clamped)),
    Math.round(mix(start[1], end[1], clamped)),
    Math.round(mix(start[2], end[2], clamped)),
  ];
}

function thermalMap(value) {
  const stops = [
    [37, 29, 121],
    [70, 108, 245],
    [194, 88, 255],
    [255, 101, 74],
    [255, 201, 77],
    [255, 246, 196],
  ];
  const scaled = clamp(value, 0, 1) * (stops.length - 1);
  const index = Math.floor(scaled);
  const blend = scaled - index;
  return blendColors(stops[index], stops[Math.min(index + 1, stops.length - 1)], blend);
}

function posterize(value, levels) {
  const step = 255 / Math.max(levels - 1, 1);
  return Math.round(value / step) * step;
}

function applyContrast(value, contrast) {
  return clamp((value - 128) * contrast + 128, 0, 255);
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = Number.parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const lightness = (max + min) / 2;
  let hue = 0;
  let saturation = 0;

  if (max !== min) {
    const d = max - min;
    saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        hue = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        hue = (bn - rn) / d + 2;
        break;
      default:
        hue = (rn - gn) / d + 4;
        break;
    }
    hue /= 6;
  }

  return [Math.round(hue * 360), saturation, lightness];
}

function hueDistance(a, b) {
  const diff = Math.abs(a - b);
  return Math.min(diff, 360 - diff);
}

function mix(start, end, amount) {
  return start + (end - start) * amount;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clampInt(value, min, max) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

init();
