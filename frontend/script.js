// MOBILE MENU

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


// TYPING EFFECT

const words = [
  "Web Developer",
  "Frontend Developer",
  "Data Analyst",
  "Application Developer",
  "Business Analyst"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement =
  document.getElementById("typing");

function typeEffect() {

  const currentWord =
    words[wordIndex];

  if (!deleting) {

    typingElement.textContent =
      currentWord.substring(
        0,
        charIndex++
      );

    if (
      charIndex >
      currentWord.length
    ) {

      deleting = true;

      setTimeout(
        typeEffect,
        1000
      );

      return;
    }

  } else {

    typingElement.textContent =
      currentWord.substring(
        0,
        charIndex--
      );

    if (charIndex < 0) {

      deleting = false;

      wordIndex =
        (wordIndex + 1) %
        words.length;
    }
  }

  setTimeout(
    typeEffect,
    deleting ? 50 : 100
  );
}

typeEffect();


// CONTACT FORM

const contactForm =
  document.getElementById("contact-form");

const formMessage =
  document.getElementById("form-message");


contactForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const data = {

      name:
        document.getElementById("name").value,

      email:
        document.getElementById("email").value,

      subject:
        document.getElementById("subject").value,

      message:
        document.getElementById("message").value
    };

    formMessage.textContent =
      "Sending message...";

    try {

      const response =
        await fetch(
          "https://my-portfolio-lveu.onrender.com/api/contact",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(data)
          }
        );

      const result =
        await response.json();

      if (response.ok) {

        formMessage.textContent =
          "✅ Message sent successfully!";

        contactForm.reset();

      } else {

        formMessage.textContent =
          "❌ Failed: " +
          result.message;
      }

    } catch (error) {

      formMessage.textContent =
        "❌ Server connection failed.";
    }
  }
);