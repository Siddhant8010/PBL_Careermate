document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const submitBtn = document.getElementById('submitBtn');
            const successMessage = document.getElementById('successMessage');

            // Validation functions
            function validateName(name) {
                return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
            }

            function validatePhone(phone) {
                return /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''));
            }

            function validateAge(age) {
                const ageNum = parseInt(age);
                return ageNum >= 15 && ageNum <= 25;
            }

            function validatePercentage(percentage) {
                const percentNum = parseFloat(percentage);
                return percentNum >= 0 && percentNum <= 100;
            }

            function validateSubjectMarks(marks) {
                const marksNum = parseInt(marks);
                return marksNum >= 0 && marksNum <= 100;
            }

            function validateCity(city) {
                return city.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(city.trim());
            }

            function validateState(state) {
                return state.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(state.trim());
            }

            function showError(fieldId, message) {
                const field = document.getElementById(fieldId);
                const errorElement = document.getElementById(fieldId + 'Error');
                
                field.classList.add('error');
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }

            function hideError(fieldId) {
                const field = document.getElementById(fieldId);
                const errorElement = document.getElementById(fieldId + 'Error');
                
                field.classList.remove('error');
                errorElement.style.display = 'none';
            }

            function validateField(fieldId, validator, errorMessage) {
                const field = document.getElementById(fieldId);
                const value = field.value.trim();
                
                if (!value || !validator(value)) {
                    showError(fieldId, errorMessage);
                    return false;
                } else {
                    hideError(fieldId);
                    return true;
                }
            }

            // Real-time validation
            document.getElementById('firstName').addEventListener('blur', function() {
                validateField('firstName', validateName, 'Please enter a valid first name (letters only, min 2 characters)');
            });

            document.getElementById('middleName').addEventListener('blur', function() {
                const value = this.value.trim();
                if (value && !validateName(value)) {
                    showError('middleName', 'Please enter a valid middle name (letters only, min 2 characters)');
                } else {
                    hideError('middleName');
                }
            });

            document.getElementById('lastName').addEventListener('blur', function() {
                validateField('lastName', validateName, 'Please enter a valid last name (letters only, min 2 characters)');
            });

            document.getElementById('phone').addEventListener('blur', function() {
                validateField('phone', validatePhone, 'Please enter a valid 10-digit phone number starting with 6-9');
            });

            document.getElementById('age').addEventListener('blur', function() {
                validateField('age', validateAge, 'Age must be between 15 and 25');
            });

            document.getElementById('dob').addEventListener('blur', function() {
                validateField('dob', validateDateOfBirth, 'Please select a valid date of birth (age 15-25)');
            });

            document.getElementById('tenthPercentage').addEventListener('blur', function() {
                validateField('tenthPercentage', validatePercentage, 'Please enter a valid percentage (0-100)');
            });

            document.getElementById('physicsMarks').addEventListener('blur', function() {
                validateField('physicsMarks', validateSubjectMarks, 'Please enter valid Physics marks (0-100)');
            });

            document.getElementById('chemistryMarks').addEventListener('blur', function() {
                validateField('chemistryMarks', validateSubjectMarks, 'Please enter valid Chemistry marks (0-100)');
            });

            document.getElementById('mathsMarks').addEventListener('blur', function() {
                validateField('mathsMarks', validateSubjectMarks, 'Please enter valid Maths marks (0-100)');
            });

            document.getElementById('biologyMarks').addEventListener('blur', function() {
                validateField('biologyMarks', validateSubjectMarks, 'Please enter valid Biology marks (0-100)');
            });

            document.getElementById('board').addEventListener('change', function() {
                if (this.value) {
                    hideError('board');
                }
            });

            document.getElementById('interest').addEventListener('blur', function() {
                if (this.value.trim().length >= 3) {
                    hideError('interest');
                } else {
                    showError('interest', 'Please enter your area of interest (min 3 characters)');
                }
            });

            document.getElementById('gender').addEventListener('change', function() {
                if (this.value) {
                    hideError('gender');
                }
            });

            document.getElementById('city').addEventListener('blur', function() {
                validateField('city', validateCity, 'Please enter a valid city name (letters only, min 2 characters)');
            });

            document.getElementById('state').addEventListener('blur', function() {
                validateField('state', validateState, 'Please enter a valid state name (letters only, min 2 characters)');
            });

            document.getElementById('accuracyConsent').addEventListener('change', function() {
                if (this.checked) {
                    hideError('accuracyConsent');
                }
            });

            document.getElementById('contactConsent').addEventListener('change', function() {
                if (this.checked) {
                    hideError('contactConsent');
                }
            });

            // Phone number formatting
            document.getElementById('phone').addEventListener('input', function() {
                let value = this.value.replace(/\D/g, '');
                if (value.length > 10) {
                    value = value.slice(0, 10);
                }
                this.value = value;
            });

            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                
                // Validate all fields
                isValid &= validateField('firstName', validateName, 'Please enter a valid first name (letters only, min 2 characters)');
                
                // Validate middle name if provided
                const middleName = document.getElementById('middleName');
                if (middleName.value.trim() && !validateName(middleName.value)) {
                    showError('middleName', 'Please enter a valid middle name (letters only, min 2 characters)');
                    isValid = false;
                } else {
                    hideError('middleName');
                }
                
                isValid &= validateField('lastName', validateName, 'Please enter a valid last name (letters only, min 2 characters)');
                isValid &= validateField('phone', validatePhone, 'Please enter a valid 10-digit phone number starting with 6-9');
                isValid &= validateField('age', validateAge, 'Age must be between 15 and 25');
                isValid &= validateField('dob', validateDateOfBirth, 'Please select a valid date of birth (age 15-25)');
                isValid &= validateField('tenthPercentage', validatePercentage, 'Please enter a valid percentage (0-100)');
                isValid &= validateField('physicsMarks', validateSubjectMarks, 'Please enter valid Physics marks (0-100)');
                isValid &= validateField('chemistryMarks', validateSubjectMarks, 'Please enter valid Chemistry marks (0-100)');
                isValid &= validateField('mathsMarks', validateSubjectMarks, 'Please enter valid Maths marks (0-100)');
                isValid &= validateField('biologyMarks', validateSubjectMarks, 'Please enter valid Biology marks (0-100)');
                isValid &= validateField('city', validateCity, 'Please enter a valid city name (letters only, min 2 characters)');
                isValid &= validateField('state', validateState, 'Please enter a valid state name (letters only, min 2 characters)');
                
                // Validate board selection
                const board = document.getElementById('board');
                if (!board.value) {
                    showError('board', 'Please select your board');
                    isValid = false;
                } else {
                    hideError('board');
                }
                
                // Validate interest
                const interest = document.getElementById('interest');
                if (interest.value.trim().length < 3) {
                    showError('interest', 'Please enter your area of interest (min 3 characters)');
                    isValid = false;
                } else {
                    hideError('interest');
                }
                
                // Validate gender selection
                const gender = document.getElementById('gender');
                if (!gender.value) {
                    showError('gender', 'Please select your gender');
                    isValid = false;
                } else {
                    hideError('gender');
                }

                // Validate consent checkboxes
                const accuracyConsent = document.getElementById('accuracyConsent');
                if (!accuracyConsent.checked) {
                    showError('accuracyConsent', 'Please confirm the accuracy of your information');
                    isValid = false;
                } else {
                    hideError('accuracyConsent');
                }

                const contactConsent = document.getElementById('contactConsent');
                if (!contactConsent.checked) {
                    showError('contactConsent', 'Please provide consent to be contacted');
                    isValid = false;
                } else {
                    hideError('contactConsent');
                }
                
                if (isValid) {
                    // Show loading state
                    submitBtn.classList.add('loading');
                    submitBtn.textContent = 'Processing...';
                    
                    // Simulate form submission
                    setTimeout(() => {
                        submitBtn.classList.remove('loading');
                        submitBtn.textContent = 'Register Now';
                        successMessage.style.display = 'block';
                        form.reset();
                        
                        // Scroll to success message
                        successMessage.scrollIntoView({ behavior: 'smooth' });
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 5000);
                    }, 2000);
                } else {
                    // Scroll to first error
                    const firstError = document.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });

            // Auto-calculate age from date of birth
            document.getElementById('dob').addEventListener('change', function() {
                if (this.value) {
                    const birthDate = new Date(this.value);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    
                    document.getElementById('age').value = age;
                }
            });
        });
