    (function(){
      const signinImg = "https://i.pinimg.com/736x/90/30/b2/9030b2c9a9068af4d6f76ef2e304bc83.jpg";
      const registerImg = "https://i.pinimg.com/1200x/16/b0/80/16b080bb8978c6e6860a5c3450046253.jpg";
      const heroImage = document.getElementById("heroImage");

      const tabLogin = document.getElementById("tabLogin");
      const tabRegister = document.getElementById("tabRegister");
      const lead = document.getElementById("lead");
      const loginForm = document.getElementById("loginForm");
      const registerForm = document.getElementById("registerForm");

      // Restore remembered username
      const savedUser = localStorage.getItem("growhub_username");
      const loginUsername = document.getElementById("login-username");
      const remember = document.getElementById("remember");
      if(savedUser){
        loginUsername.value = savedUser;
        remember.checked = true;
      }

      function setActive(isLogin){
        // toggle aria states
        tabLogin.setAttribute("aria-selected", String(isLogin));
        tabRegister.setAttribute("aria-selected", String(!isLogin));
        tabLogin.setAttribute("aria-pressed", String(isLogin));
        tabRegister.setAttribute("aria-pressed", String(!isLogin));

        // swap content
        if(isLogin){
          heroImage.src = signinImg;
          heroImage.alt = "Child learning numbers in classroom";
          lead.textContent = "Log in to continue your Career Finding journey with CareerMate — your personal online Path Finder..";
          loginForm.classList.remove("hidden");
          registerForm.classList.add("hidden");
        } else {
          heroImage.src = registerImg;
          heroImage.alt = "Child raising hand in classroom";
          lead.textContent = "Sign Up to continue your Career Finding journey with CareerMate — your personal online Path Finder..";
          registerForm.classList.remove("hidden");
          loginForm.classList.add("hidden");
        }
      }

      tabLogin.addEventListener("click", ()=> setActive(true));
      tabRegister.addEventListener("click", ()=> setActive(false));

      // Password visibility toggles (event delegation)
      document.addEventListener("click", (e)=>{
        const btn = e.target.closest(".toggle-password");
        if(!btn) return;
        const targetId = btn.getAttribute("data-target");
        const input = document.getElementById(targetId);
        if(!input) return;
        const isNowText = input.type === "password";
        input.type = isNowText ? "text" : "password";
        btn.setAttribute("aria-pressed", String(isNowText));
      });

      // Basic form validation and submit handling
      loginForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const user = document.getElementById("login-username");
        const pass = document.getElementById("login-password");
        const uErr = document.getElementById("login-username-error");
        const pErr = document.getElementById("login-password-error");

        let ok = true;
        if(!user.value.trim()){ uErr.classList.remove("hidden"); ok = false; } else { uErr.classList.add("hidden"); }
        if(!pass.value.trim()){ pErr.classList.remove("hidden"); ok = false; } else { pErr.classList.add("hidden"); }

        if(!ok) return;

        // Remember me
        if(remember.checked){
          localStorage.setItem("growhub_username", user.value.trim());
        } else {
          localStorage.removeItem("growhub_username");
        }

        // Simulated success
        alert("Logged in successfully! (demo)");
      });

      registerForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const email = document.getElementById("reg-email");
        const user = document.getElementById("reg-username");
        const pass = document.getElementById("reg-password");
        const eErr = document.getElementById("reg-email-error");
        const uErr = document.getElementById("reg-username-error");
        const pErr = document.getElementById("reg-password-error");

        let ok = true;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        if(!emailValid){ eErr.classList.remove("hidden"); ok = false; } else { eErr.classList.add("hidden"); }
        if(!user.value.trim()){ uErr.classList.remove("hidden"); ok = false; } else { uErr.classList.add("hidden"); }
        if(pass.value.length < 6){ pErr.classList.remove("hidden"); ok = false; } else { pErr.classList.add("hidden"); }

        if(!ok) return;

        alert("Account created! (demo)");
        // After registration, optionally switch to login:
        setActive(true);
        loginUsername.value = user.value.trim();
        remember.checked = true;
        localStorage.setItem("growhub_username", user.value.trim());
      });

      // Initialize default view
      setActive(true);
    })();