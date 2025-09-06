class PostItManager {
  constructor() {
    this.total = 0;
    this.selectedItems = [];
    this.init();
  }

  init() {
    this.checklistItems = document.querySelectorAll(".checklist-item");
    this.totalAmount = document.querySelector(".total-amount");
    this.whatsappBtn = document.getElementById("whatsappBtn");

    this.addEventListeners();
    this.updateTotal();
    this.updateWhatsAppButton();
  }

  addEventListeners() {
    this.checklistItems.forEach((item) => {
      item.addEventListener("click", () => this.toggleSelection(item));
    });

    if (this.whatsappBtn) {
      this.whatsappBtn.addEventListener("click", () => this.sendWhatsApp());
    }
  }

  toggleSelection(item) {
    const isSelected = item.classList.contains("selected");
    const price = parseInt(item.getAttribute("data-price"));

    if (isSelected) {
      item.classList.remove("selected");
      this.total -= price;
      this.selectedItems = this.selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
    } else {
      item.classList.add("selected");
      this.total += price;
      this.selectedItems.push(item);
    }

    this.updateTotal();
    this.updateWhatsAppButton();
  }

  updateTotal() {
    if (this.totalAmount) {
      this.totalAmount.textContent = `$${this.total}`;
      this.totalAmount.classList.add("animate");

      setTimeout(() => {
        this.totalAmount.classList.remove("animate");
      }, 600);
    }
  }

  updateWhatsAppButton() {
    if (this.whatsappBtn) {
      if (this.selectedItems.length > 0) {
        this.whatsappBtn.disabled = false;
        this.whatsappBtn.style.opacity = "1";
        this.whatsappBtn.style.cursor = "pointer";
        this.whatsappBtn.querySelector(".btn-text").textContent =
          "Enviar por WhatsApp";
      } else {
        this.whatsappBtn.disabled = true;
        this.whatsappBtn.style.opacity = "0.6";
        this.whatsappBtn.style.cursor = "not-allowed";
        this.whatsappBtn.querySelector(".btn-text").textContent =
          "Selecciona servicios";
      }
    }
  }

  sendWhatsApp() {
    if (this.selectedItems.length === 0) {
      alert("Por favor selecciona al menos un servicio.");
      return;
    }

    const phoneNumber = "4492790351";
    let message =
      "Hola! Me interesa obtener una cotización para los siguientes servicios:\n\n";

    this.selectedItems.forEach((item) => {
      const title = item.querySelector(".item-title").textContent;
      const price = item.querySelector(".item-price").textContent;
      message += `• ${title}: ${price}\n`;
    });

    message += `\n💰 Total: $${this.total}\n\n`;
    message += `📅 Fecha: ${new Date().toLocaleDateString("es-ES")}\n`;
    message += `🕐 Hora: ${new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })}\n\n`;
    message += "Espero tu respuesta. ¡Gracias!";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new PostItManager();

  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";

  // Add loading animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  window.addEventListener("load", function () {
    document.body.style.opacity = "1";
  });
});

// Add intersection observer for animations
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe checklist items for animation
  const checklistItems = document.querySelectorAll(".checklist-item");
  checklistItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
  });
});
