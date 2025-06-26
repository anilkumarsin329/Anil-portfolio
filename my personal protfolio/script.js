// Import configuration
const config = window.portfolioConfig

// DOM Elements
const elements = {
  // Navigation
  navToggle: document.getElementById("nav-toggle"),
  navMenu: document.getElementById("nav-menu"),
  navLinks: document.querySelectorAll(".nav__link"),

  // Theme
  themeToggle: document.getElementById("theme-toggle"),

  // Hero
  heroName: document.getElementById("hero-name"),
  typewriter: document.getElementById("typewriter"),
  downloadCV: document.getElementById("download-cv"),
  hireMeHero: document.getElementById("hire-me-hero"),

  // About
  aboutDescription: document.getElementById("about-description"),
  locationText: document.getElementById("location-text"),
  geoLocationBtn: document.getElementById("geo-location"),
  timeline: document.getElementById("timeline"),

  // Skills
  frontendSkills: document.getElementById("frontend-skills"),
  backendSkills: document.getElementById("backend-skills"),
  toolsSkills: document.getElementById("tools-skills"),

  // Projects
  projectsContainer: document.getElementById("projects-container"),

  // Contact
  contactEmail: document.getElementById("contact-email"),
  contactPhone: document.getElementById("contact-phone"),
  hireMeContact: document.getElementById("hire-me-contact"),
  contactForm: document.getElementById("contact-form"),

  // Footer
  footerName: document.getElementById("footer-name"),
  footerBio: document.getElementById("footer-bio"),
  footerCopyName: document.getElementById("footer-copy-name"),
  socialLinks: document.getElementById("social-links"),
  currentYear: document.getElementById("current-year"),
  lastUpdated: document.getElementById("last-updated"),

  // WhatsApp
  whatsappButton: document.getElementById("whatsapp-button"),

  // Back to top
  backToTop: document.getElementById("back-to-top"),
}

// Initialize the portfolio
class Portfolio {
  constructor() {
    this.init()
  }

  init() {
    this.populateContent()
    this.setupEventListeners()
    this.setupTheme()
    this.setupAnimations()
    this.setupTypewriter()
    this.updateFooterDate()
    this.initEmailJS()
  }

  // Populate content from config
  populateContent() {
    // Hero section
    if (elements.heroName) {
      elements.heroName.textContent = config.personal.name
    }

    // About section
    if (elements.aboutDescription) {
      elements.aboutDescription.textContent = config.personal.bio
    }

    if (elements.locationText) {
      elements.locationText.textContent = `📍 ${config.personal.location}`
    }

    // Contact section
    if (elements.contactEmail) {
      elements.contactEmail.textContent = config.contact.email
    }

    if (elements.contactPhone) {
      elements.contactPhone.textContent = config.contact.phone
    }

    // Footer
    if (elements.footerName) {
      elements.footerName.textContent = config.personal.name
    }

    if (elements.footerBio) {
      elements.footerBio.textContent = config.personal.shortBio
    }

    if (elements.footerCopyName) {
      elements.footerCopyName.textContent = config.personal.name
    }

    // Download CV link
    if (elements.downloadCV) {
      elements.downloadCV.href = config.links.resume
    }

    // Populate timeline
    this.populateTimeline()

    // Populate skills
    this.populateSkills()

    // Populate projects
    this.populateProjects()

    // Populate social links
    this.populateSocialLinks()

    // Add this to the populateContent method after the existing footer population
    if (elements.footerEmail) {
      elements.footerEmail = document.getElementById("footer-email")
      elements.footerEmail.textContent = config.contact.email
    }

    if (elements.footerPhone) {
      elements.footerPhone = document.getElementById("footer-phone")
      elements.footerPhone.textContent = config.contact.phone
    }

    if (elements.footerLocation) {
      elements.footerLocation = document.getElementById("footer-location")
      elements.footerLocation.textContent = config.personal.location
    }

    // Populate footer services
    this.populateFooterServices()

    // Populate footer stats
    this.populateFooterStats()
  }

  // Populate timeline
  populateTimeline() {
    if (!elements.timeline) return

    elements.timeline.innerHTML = config.timeline
      .map(
        (item) => `
            <div class="timeline__item fade-in">
                <h4 class="timeline__title">${item.title}</h4>
                <p class="timeline__subtitle">${item.company}</p>
                <p class="timeline__date">${item.date}</p>
                <p class="timeline__description">${item.description}</p>
            </div>
        `,
      )
      .join("")
  }

  // Populate skills
  populateSkills() {
    this.populateSkillCategory(elements.frontendSkills, config.skills.frontend)
    this.populateSkillCategory(elements.backendSkills, config.skills.backend)
    this.populateSkillCategory(elements.toolsSkills, config.skills.tools)
  }

  populateSkillCategory(container, skills) {
    if (!container) return

    container.innerHTML = skills
      .map(
        (skill) => `
            <div class="skill fade-in">
                <div class="skill__header">
                    <span class="skill__name">${skill.name}</span>
                    <span class="skill__percentage">${skill.level}%</span>
                </div>
                <div class="skill__bar">
                    <div class="skill__progress" data-width="${skill.level}"></div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Populate projects
  populateProjects() {
    if (!elements.projectsContainer) return

    elements.projectsContainer.innerHTML = config.projects
      .map(
        (project) => `
            <div class="project fade-in">
                <div class="project__image">
                    <img src="${project.image}" alt="${project.title}" class="project__img" loading="lazy">
                    <div class="project__overlay">
                        <div class="project__links">
                            <a href="${project.github}" class="project__link" target="_blank" rel="noopener">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </a>
                            <a href="${project.demo}" class="project__link" target="_blank" rel="noopener">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15,3 21,3 21,9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                Live Demo
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project__content">
                    <h3 class="project__title">${project.title}</h3>
                    <p class="project__description">${project.description}</p>
                    <div class="project__tech">
                        ${project.tech.map((tech) => `<span class="project__tech-item">${tech}</span>`).join("")}
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Populate social links
  populateSocialLinks() {
    if (!elements.socialLinks) return

    const socialIcons = {
      linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
      github: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
      instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
      twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
    }

    elements.socialLinks.innerHTML = Object.entries(config.social)
      .map(
        ([platform, url]) => `
            <a href="${url}" class="social__link" target="_blank" rel="noopener" aria-label="${platform}">
                ${socialIcons[platform] || ""}
            </a>
        `,
      )
      .join("")
  }

  // Add this new method after populateSocialLinks method:
  populateFooterServices() {
    const footerServices = document.getElementById("footer-services")
    if (!footerServices) return

    footerServices.innerHTML = config.services
      .map((service) => `<li><a href="#" class="footer__link">${service}</a></li>`)
      .join("")
  }

  populateFooterStats() {
    const stats = {
      "projects-count": config.stats.projectsCompleted,
      "clients-count": config.stats.happyClients,
      "experience-years": config.stats.yearsExperience,
      "technologies-count": config.stats.technologies,
    }

    Object.entries(stats).forEach(([id, value]) => {
      const element = document.getElementById(id)
      if (element) element.textContent = value
    })
  }

  // Setup event listeners
  setupEventListeners() {
    // Navigation toggle
    if (elements.navToggle) {
      elements.navToggle.addEventListener("click", () => {
        elements.navMenu.classList.toggle("show")
      })
    }

    // Navigation links
    elements.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        elements.navMenu.classList.remove("show")
      })
    })

    // Theme toggle
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener("click", () => {
        this.toggleTheme()
      })
    }
    // Hire me buttons
    ;[elements.hireMeHero, elements.hireMeContact].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          this.openHireEmail()
        })
      }
    })

    // Get location button
    if (elements.geoLocationBtn) {
      elements.geoLocationBtn.addEventListener("click", () => {
        this.showUserLocation()
      })
    }

    // WhatsApp button
    if (elements.whatsappButton) {
      elements.whatsappButton.addEventListener("click", () => {
        this.openWhatsApp()
      })
    }

    // Back to top button
    if (elements.backToTop) {
      elements.backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      })
    }

    // Contact form
    if (elements.contactForm) {
      elements.contactForm.addEventListener("submit", (e) => {
        this.handleContactForm(e)
      })
    }

    // Scroll events
    window.addEventListener("scroll", () => {
      this.handleScroll()
    })

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })

    // Add newsletter form handling in setupEventListeners method:
    // Newsletter form
    const newsletterForm = document.getElementById("newsletter-form")
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        this.handleNewsletterForm(e)
      })
    }
  }

  // Theme management
  setupTheme() {
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", savedTheme)
    this.updateThemeIcon(savedTheme)
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    this.updateThemeIcon(newTheme)
  }

  updateThemeIcon(theme) {
    if (elements.themeToggle) {
      const icon = elements.themeToggle.querySelector(".theme-toggle__icon")
      icon.textContent = theme === "dark" ? "☀️" : "🌙"
    }
  }

  // Animations
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")

          // Animate skill bars
          if (entry.target.classList.contains("skill")) {
            const progressBar = entry.target.querySelector(".skill__progress")
            if (progressBar) {
              const width = progressBar.getAttribute("data-width")
              setTimeout(() => {
                progressBar.style.width = width + "%"
              }, 200)
            }
          }
        }
      })
    }, observerOptions)

    // Observe all fade-in elements
    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el)
    })
  }

  // Typewriter effect
  setupTypewriter() {
    if (!elements.typewriter) return

    const texts = config.personal.taglines
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typeSpeed = 100

    const type = () => {
      const currentText = texts[textIndex]

      if (isDeleting) {
        elements.typewriter.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
        typeSpeed = 50
      } else {
        elements.typewriter.textContent = currentText.substring(0, charIndex + 1)
        charIndex++
        typeSpeed = 100
      }

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        typeSpeed = 500
      }

      setTimeout(type, typeSpeed)
    }

    type()
  }

  // Scroll handling
  handleScroll() {
    const scrollTop = window.pageYOffset

    // Show/hide back to top button
    if (elements.backToTop) {
      if (scrollTop > 300) {
        elements.backToTop.classList.add("show")
      } else {
        elements.backToTop.classList.remove("show")
      }
    }

    // Update navigation background
    const navbar = document.getElementById("navbar")
    if (navbar) {
      if (scrollTop > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)"
        if (document.documentElement.getAttribute("data-theme") === "dark") {
          navbar.style.background = "rgba(26, 32, 44, 0.98)"
        }
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)"
        if (document.documentElement.getAttribute("data-theme") === "dark") {
          navbar.style.background = "rgba(26, 32, 44, 0.95)"
        }
      }
    }
  }

  // Enhanced Geolocation with better UI
  showUserLocation() {
    if (!navigator.geolocation) {
      this.showLocationPopup(
        "Geolocation Not Supported",
        "Your browser doesn't support geolocation. Please update your browser or enable location services.",
        false,
      )
      return
    }

    // Show loading state
    elements.geoLocationBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
    Getting location...
  `
    elements.geoLocationBtn.disabled = true

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        this.reverseGeocode(latitude, longitude)
      },
      (error) => {
        let message = "Unable to retrieve your location."
        let title = "Location Error"

        switch (error.code) {
          case error.PERMISSION_DENIED:
            title = "Location Access Denied"
            message = "Please enable location access in your browser settings and try again."
            break
          case error.POSITION_UNAVAILABLE:
            title = "Location Unavailable"
            message = "Location information is unavailable. Please check your internet connection."
            break
          case error.TIMEOUT:
            title = "Location Timeout"
            message = "Location request timed out. Please try again."
            break
        }

        this.showLocationPopup(title, message, false)
        this.resetLocationButton()
      },
      options,
    )
  }

  async reverseGeocode(lat, lon) {
    try {
      // Try multiple geocoding services for better accuracy
      let locationData = null

      // Primary service - BigDataCloud
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
        )
        locationData = await response.json()
      } catch (error) {
        console.log("Primary geocoding service failed, trying backup...")
      }

      // Backup service - OpenStreetMap Nominatim
      if (!locationData || !locationData.city) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
          )
          const osmData = await response.json()
          locationData = {
            city: osmData.address?.city || osmData.address?.town || osmData.address?.village,
            principalSubdivision: osmData.address?.state,
            countryCode: osmData.address?.country_code?.toUpperCase(),
            locality: osmData.address?.suburb || osmData.address?.neighbourhood,
          }
        } catch (error) {
          console.log("Backup geocoding service also failed")
        }
      }

      if (locationData) {
        const city = locationData.city || locationData.locality || locationData.principalSubdivision || "Unknown City"
        const state = locationData.principalSubdivision || ""
        const country = locationData.countryCode || ""

        const locationString = `${city}${state ? ", " + state : ""}${country ? ", " + country : ""}`

        // Update location text with animation
        elements.locationText.style.transition = "all 0.3s ease"
        elements.locationText.style.opacity = "0"

        setTimeout(() => {
          elements.locationText.innerHTML = `📍 ${config.personal.location} | Your location: ${locationString}`
          elements.locationText.style.opacity = "1"
        }, 150)

        // Show success popup
        this.showLocationPopup("Location Found!", `Your current location: ${locationString}`, true)

        // Update footer location if needed
        const footerLocation = document.getElementById("footer-location")
        if (footerLocation) {
          footerLocation.textContent = `${config.personal.location} | You: ${locationString}`
        }
      } else {
        // Fallback to coordinates
        elements.locationText.innerHTML = `📍 ${config.personal.location} | Your coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}`

        this.showLocationPopup("Location Found", `Your coordinates: ${lat.toFixed(6)}, ${lon.toFixed(6)}`, true)
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error)
      this.showLocationPopup(
        "Geocoding Error",
        "Found your location but unable to get the city name. Please try again later.",
        false,
      )
    } finally {
      this.resetLocationButton()
    }
  }

  resetLocationButton() {
    elements.geoLocationBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
    Show Your Location
  `
    elements.geoLocationBtn.disabled = false
  }

  showLocationPopup(title, message, isSuccess) {
    // Remove existing popup if any
    const existingPopup = document.querySelector(".location-popup")
    if (existingPopup) {
      existingPopup.remove()
    }
    const existingOverlay = document.querySelector(".location-popup__overlay")
    if (existingOverlay) {
      existingOverlay.remove()
    }

    // Create overlay
    const overlay = document.createElement("div")
    overlay.className = "location-popup__overlay"

    // Create popup
    const popup = document.createElement("div")
    popup.className = "location-popup"
    popup.innerHTML = `
    <div class="location-popup__icon">
      ${
        isSuccess
          ? '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#48bb78" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>'
          : '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f56565" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
      }
    </div>
    <h3 class="location-popup__title">${title}</h3>
    <p class="location-popup__content">${message}</p>
    <div class="location-popup__buttons">
      <button class="btn btn--primary" onclick="this.closest('.location-popup').remove(); document.querySelector('.location-popup__overlay').remove();">
        OK
      </button>
    </div>
  `

    // Add to DOM
    document.body.appendChild(overlay)
    document.body.appendChild(popup)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (popup.parentNode) popup.remove()
      if (overlay.parentNode) overlay.remove()
    }, 5000)

    // Close on overlay click
    overlay.addEventListener("click", () => {
      popup.remove()
      overlay.remove()
    })
  }

  // WhatsApp integration
  openWhatsApp() {
    const message = encodeURIComponent(config.whatsapp.message)
    const url = `https://api.whatsapp.com/send?phone=${config.whatsapp.number}&text=${message}`
    window.open(url, "_blank")
  }

  // Email functionality
  openHireEmail() {
    const subject = encodeURIComponent("Hiring Inquiry")
    const body = encodeURIComponent(
      `Hi ${config.personal.name},\n\nI saw your portfolio and I'm interested in discussing a potential project/position.\n\nBest regards`,
    )
    const mailtoUrl = `mailto:${config.contact.email}?subject=${subject}&body=${body}`
    window.location.href = mailtoUrl
  }

  // EmailJS initialization
  initEmailJS() {
    if (config.emailjs && config.emailjs.publicKey) {
      emailjs.init(config.emailjs.publicKey)
    }
  }

  // Contact form handling
  async handleContactForm(e) {
    e.preventDefault()

    const submitBtn = elements.contactForm.querySelector(".contact__submit")
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = "<span>Sending...</span>"
    submitBtn.disabled = true

    try {
      if (config.emailjs && config.emailjs.serviceId && config.emailjs.templateId) {
        // Use EmailJS
        const formData = new FormData(elements.contactForm)
        const templateParams = {
          from_name: formData.get("name"),
          from_email: formData.get("email"),
          message: formData.get("message"),
          to_name: config.personal.name,
        }

        await emailjs.send(config.emailjs.serviceId, config.emailjs.templateId, templateParams)

        this.showNotification("Message sent successfully!", "success")
        elements.contactForm.reset()
      } else {
        // Fallback to mailto
        const formData = new FormData(elements.contactForm)
        const subject = encodeURIComponent("Portfolio Contact Form")
        const body = encodeURIComponent(
          `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\nMessage:\n${formData.get("message")}`,
        )
        window.location.href = `mailto:${config.contact.email}?subject=${subject}&body=${body}`
      }
    } catch (error) {
      console.error("Error sending email:", error)
      this.showNotification("Failed to send message. Please try again.", "error")
    } finally {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }

  // Add this new method after handleContactForm:
  handleNewsletterForm(e) {
    e.preventDefault()

    const emailInput = e.target.querySelector(".footer__newsletter-input")
    const email = emailInput.value

    if (!this.isValidEmail(email)) {
      this.showNotification("Please enter a valid email address.", "error")
      return
    }

    // Simulate newsletter subscription
    this.showNotification("Thank you for subscribing to our newsletter!", "success")
    emailInput.value = ""
  }

  // Notification system
  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification--${type}`
    notification.textContent = message

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === "success" ? "background: #48bb78;" : "background: #f56565;"}
        `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Update footer date
  updateFooterDate() {
    if (elements.currentYear) {
      elements.currentYear.textContent = new Date().getFullYear()
    }

    if (elements.lastUpdated) {
      elements.lastUpdated.textContent = new Date().toLocaleDateString()
    }
  }

  // Basic email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Portfolio()
})

// Handle lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img)
  })
}

const emailjs = window.emailjs
