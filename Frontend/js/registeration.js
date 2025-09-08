// Form validation and UI logic
const form = document.getElementById("registrationForm")
const successScreen = document.getElementById("successScreen")

// Validation patterns
const namePattern = /^[a-zA-Z\s]+$/
const phonePattern = /^[6-9]\d{9}$/

// Age calculation function
function calculateAge(birthDate) {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

// Show/hide error messages
function showError(fieldId, message) {
  const field = document.getElementById(fieldId)
  const errorElement = document.getElementById(fieldId + "-error")

  field.setAttribute("aria-invalid", "true")
  errorElement.textContent = message
  errorElement.style.display = "block"
}

function hideError(fieldId) {
  const field = document.getElementById(fieldId)
  const errorElement = document.getElementById(fieldId + "-error")

  field.setAttribute("aria-invalid", "false")
  errorElement.style.display = "none"
}

// Validation functions
function validateName(value, fieldId) {
  if (!value.trim()) {
    showError(fieldId, "This field is required")
    return false
  }

  if (!namePattern.test(value)) {
    showError(fieldId, "Only letters and spaces are allowed")
    return false
  }

  hideError(fieldId)
  return true
}

function validatePhone(value) {
  if (!value.trim()) {
    showError("phone", "Phone number is required")
    return false
  }

  if (!phonePattern.test(value)) {
    showError("phone", "Enter a valid 10-digit Indian mobile number starting with 6-9")
    return false
  }

  hideError("phone")
  return true
}

function validateDOB(value) {
  if (!value) {
    showError("dob", "Date of birth is required")
    return false
  }

  const age = calculateAge(value)

  if (age < 13 || age > 25) {
    showError("dob", "Age must be between 13 and 25 years")
    return false
  }

  hideError("dob")
  return true
}

function validatePercentage(value) {
  const percentageRadio = document.getElementById("percentage")

  if (percentageRadio.checked) {
    if (!value) {
      showError("percentage", "Percentage is required when selected")
      return false
    }

    const num = Number.parseFloat(value)
    if (isNaN(num) || num < 0 || num > 100) {
      showError("percentage", "Percentage must be between 0 and 100")
      return false
    }
  }

  hideError("percentage")
  return true
}

function validateConsent(fieldId) {
  const field = document.getElementById(fieldId)

  if (!field.checked) {
    showError(fieldId, "This consent is required")
    return false
  }

  hideError(fieldId)
  return true
}

// Event listeners for real-time validation
document.getElementById("firstName").addEventListener("blur", function () {
  validateName(this.value, "firstName")
})

document.getElementById("surname").addEventListener("blur", function () {
  validateName(this.value, "surname")
})

document.getElementById("phone").addEventListener("blur", function () {
  validatePhone(this.value)
})

document.getElementById("dob").addEventListener("change", function () {
  validateDOB(this.value)
})

document.getElementById("percentageValue").addEventListener("blur", function () {
  validatePercentage(this.value)
})

// Photo preview functionality
document.getElementById("photo").addEventListener("change", (e) => {
  const file = e.target.files[0]
  const preview = document.getElementById("photoPreview")
  const img = document.getElementById("previewImg")

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      img.src = e.target.result
      preview.style.display = "block"
    }
    reader.readAsDataURL(file)
  } else {
    preview.style.display = "none"
  }
})

// Conditional input visibility
document.getElementById("percentage").addEventListener("change", function () {
  const percentageInput = document.getElementById("percentageInput")
  percentageInput.style.display = this.checked ? "block" : "none"
})

document.getElementById("other-skill").addEventListener("change", function () {
  const otherInput = document.getElementById("otherSkillInput")
  otherInput.style.display = this.checked ? "block" : "none"
})

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault()

  let isValid = true

  // Validate all required fields
  isValid &= validateName(document.getElementById("firstName").value, "firstName")
  isValid &= validateName(document.getElementById("surname").value, "surname")
  isValid &= validatePhone(document.getElementById("phone").value)
  isValid &= validateDOB(document.getElementById("dob").value)
  isValid &= validatePercentage(document.getElementById("percentageValue").value)
  isValid &= validateConsent("accuracy")
  isValid &= validateConsent("consent")

  if (isValid) {
    showSuccessScreen()
    updateProgressIndicator("success")
  }
})

// Reset functionality
document.getElementById("resetBtn").addEventListener("click", () => {
  form.reset()
  document.getElementById("photoPreview").style.display = "none"
  document.getElementById("percentageInput").style.display = "none"
  document.getElementById("otherSkillInput").style.display = "none"

  // Hide all error messages
  const errorMessages = document.querySelectorAll(".error-message")
  errorMessages.forEach((error) => (error.style.display = "none"))

  // Reset aria-invalid attributes
  const inputs = document.querySelectorAll("input, select")
  inputs.forEach((input) => input.setAttribute("aria-invalid", "false"))
})

// Print functionality
document.getElementById("printBtn").addEventListener("click", () => {
  window.print()
})

document.getElementById("printSummary").addEventListener("click", () => {
  window.print()
})

// Success screen functionality
function showSuccessScreen() {
  form.style.display = "none"
  successScreen.style.display = "block"
  generateSummary()
}

function generateSummary() {
  const formData = new FormData(form)
  const summaryList = document.getElementById("summaryList")
  summaryList.innerHTML = ""

  // Collect form data
  const data = {
    "First Name": formData.get("firstName"),
    Surname: formData.get("surname"),
    Gender: formData.get("gender") || "Not specified",
    "Date of Birth": formData.get("dob"),
    Phone: formData.get("phone"),
    City: formData.get("city") || "Not specified",
    State: formData.get("state") || "Not specified",
    "10th Board": formData.get("board") || "Not specified",
    "Primary Career Interest": formData.get("careerInterest") || "Not specified",
  }

  // Add percentage if selected
  if (formData.get("resultType") === "Percentage") {
    data["10th Percentage"] = formData.get("percentageValue") + "%"
  }

  // Add skills
  const skills = formData.getAll("skills")
  if (skills.length > 0) {
    let skillsText = skills.join(", ")
    if (skills.includes("Other") && formData.get("otherSkillText")) {
      skillsText = skillsText.replace("Other", formData.get("otherSkillText"))
    }
    data["Skills/Interests"] = skillsText
  }

  // Generate summary HTML
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      const item = document.createElement("div")
      item.className = "summary-item"
      item.innerHTML = `
                <span class="summary-label">${key}:</span>
                <span>${value}</span>
            `
      summaryList.appendChild(item)
    }
  })
}

// New registration
document.getElementById("newRegistration").addEventListener("click", () => {
  form.style.display = "block"
  successScreen.style.display = "none"
  form.reset()
  document.getElementById("photoPreview").style.display = "none"
  document.getElementById("percentageInput").style.display = "none"
  document.getElementById("otherSkillInput").style.display = "none"
  updateProgressIndicator("form")

  // Hide all error messages
  const errorMessages = document.querySelectorAll(".error-message")
  errorMessages.forEach((error) => (error.style.display = "none"))
})

// Progress indicator
function updateProgressIndicator(step) {
  const steps = ["form", "review", "success"]
  steps.forEach((s) => {
    document.getElementById(`step-${s}`).classList.remove("active")
  })

  if (step === "success") {
    document.getElementById("step-review").classList.add("active")
    document.getElementById("step-success").classList.add("active")
  } else {
    document.getElementById(`step-${step}`).classList.add("active")
  }
}
