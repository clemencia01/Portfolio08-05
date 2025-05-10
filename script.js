document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for navbar height
            behavior: "smooth",
          })
  
          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse")
          if (navbarCollapse.classList.contains("show")) {
            document.querySelector(".navbar-toggler").click()
          }
        }
      })
    })
  
    // Project filtering
    const filterButtons = document.querySelectorAll(".filter-btn")
    const galleryItems = document.querySelectorAll(".gallery-grid article")
    const carouselItems = document.querySelectorAll(".carousel-item")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")
  
        const filter = this.getAttribute("data-filter")
  
        // Filter gallery items
        galleryItems.forEach((item) => {
          if (filter === "all" || item.getAttribute("data-category") === filter) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
  
        // Filter carousel items and reset to first matching item
        let firstMatchFound = false
  
        carouselItems.forEach((item) => {
          if (filter === "all" || item.getAttribute("data-category") === filter) {
            item.classList.remove("d-none")
  
            if (!firstMatchFound) {
              // Set this as the active item
              carouselItems.forEach((ci) => ci.classList.remove("active"))
              item.classList.add("active")
              firstMatchFound = true
            }
          } else {
            item.classList.add("d-none")
            item.classList.remove("active")
          }
        })
      })
    })
  
    /* Contact form submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
  
        // Here you would typically send the data to a server
        console.log("Form submitted:", { name, email, message })
  
        // Show success message
        alert("Merci pour votre message ! Je vous répondrai dès que possible.")
  
        // Reset form
        contactForm.reset()
      })
    }*/

      emailjs.init("MjzK-W8e3IqgnqtjA");

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Valider le format de l'e-mail
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert("Veuillez entrer un e-mail valide.");
        return;
      }

      const templateParams = {
        name: name,
        email: email,
        message: message,
      };

      // Envoyer l'e-mail via EmailJS
      
       emailjs.send("portfolio", "template_pfkijrf", templateParams)
        .then(
          (response) => {
            console.log("E-mail envoyé avec succès !", response.status, response.text);
            alert("Merci pour votre message ! Je vous répondrai dès que possible.");
            contactForm.reset();
          },
          (error) => {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
            alert("Une erreur s'est produite. Veuillez réessayer.");
          }
        );
    });
  }

  // Bouton WhatsApp
  const sendWhatsapp = document.getElementById("sendWhatsapp");
  if (sendWhatsapp) {
    sendWhatsapp.addEventListener("click", () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      const phoneNumber = "+22891699261"; 
      const formattedMessage = `Nom: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
      window.open(whatsappUrl, "_blank");
    });
  }
  
    // Animate sections on scroll
    const sections = document.querySelectorAll("section")
  
    function checkScroll() {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (sectionTop < windowHeight * 0.75) {
          section.style.animation = "fadeInUp 0.6s ease-out forwards"
        }
      })
    }
  
    // Initial check
    checkScroll()
  
    // Check on scroll
    window.addEventListener("scroll", checkScroll)
  })
  