// Global state
let currentPage = "dashboard"
let sidebarOpen = false

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  showPage("dashboard")
  updateActiveNavItem("dashboard")
})

// Navigation functions
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => page.classList.remove("active"))

  // Show selected page
  const targetPage = document.getElementById(pageId + "-page")
  if (targetPage) {
    targetPage.classList.add("active")
    currentPage = pageId
    updateActiveNavItem(pageId)
  }

  // Close sidebar on mobile after navigation
  if (window.innerWidth <= 768) {
    closeSidebar()
  }
}

function updateActiveNavItem(pageId) {
  // Remove active class from all nav items
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => item.classList.remove("active"))

  // Add active class to current nav item
  const activeItem = document.querySelector(`[data-page="${pageId}"]`)
  if (activeItem) {
    activeItem.classList.add("active")
  }
}

// Profile dropdown functions
function toggleProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown")
  dropdown.classList.toggle("show")

  // Close dropdown when clicking outside
  document.addEventListener("click", function closeDropdown(e) {
    if (!e.target.closest(".profile-dropdown")) {
      dropdown.classList.remove("show")
      document.removeEventListener("click", closeDropdown)
    }
  })
}

// Mobile sidebar functions
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar")
  sidebar.classList.toggle("show")
  sidebarOpen = !sidebarOpen
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar")
  sidebar.classList.remove("show")
  sidebarOpen = false
}

// Interactive functions
function takeTest() {
  alert("Starting new assessment...")
  // In a real app, this would redirect to the test platform
}

function logout() {
  alert("Logging out...")
  // In a real app, this would handle logout logic
}

// Progress animation
function animateProgress() {
  const progressBars = document.querySelectorAll(".progress-fill")
  progressBars.forEach((bar) => {
    const width = bar.style.width
    bar.style.width = "0%"
    setTimeout(() => {
      bar.style.width = width
    }, 500)
  })
}

// Initialize animations when page loads
window.addEventListener("load", () => {
  setTimeout(animateProgress, 1000)
})

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeSidebar()
  }
})

// Smooth scrolling for better UX
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
// Theme toggle
function toggleTheme() {
  const body = document.body
  const themeIcon = document.getElementById("theme-icon")

  body.classList.toggle("dark-mode")

  if (body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
    localStorage.setItem("theme", "dark")
  } else {
    themeIcon.classList.remove("fa-sun")
    themeIcon.classList.add("fa-moon")
    localStorage.setItem("theme", "light")
  }
}

// Load saved theme
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme")
  const body = document.body
  const themeIcon = document.getElementById("theme-icon")

  if (savedTheme === "dark") {
    body.classList.add("dark-mode")
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
  }
})

