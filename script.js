// Base de datos de soluciones y niveles
const solucionesData = {
  "cumplimiento-validacion": {
    title: "Momentum de Cumplimiento y Confianza",
    subtitle: "Cumplir con normas nacionales e internacionales",
    niveles: [
      {
        nivel: "Ignite",
        precio: "5,000 - 10,000",
        descripcion:
          "Implementación de acciones correctivas y evidencias básicas",
      },
      {
        nivel: "Advanced",
        precio: "18,000 - 40,000",
        descripcion:
          "Transformación por procesos, roadmap de cumplimiento, formación interna",
      },
      {
        nivel: "360°",
        precio: "40,000 - 120,000",
        descripcion:
          "Sistema de gestión completo hasta certificación/acreditación",
      },
    ],
  },
  "eficiencia-productividad": {
    title: "Momentum de Eficiencia y Agilidad",
    subtitle: "Aumentar la eficiencia operativa y productividad",
    niveles: [
      {
        nivel: "Ignite",
        precio: "3,000 - 8,000",
        descripcion: "Auditoría y aplicación inmediata de mejoras en 1 proceso",
      },
      {
        nivel: "Advanced",
        precio: "15,000 - 35,000",
        descripcion:
          "Implementación Lean en procesos clave y tableros de control",
      },
      {
        nivel: "360°",
        precio: "35,000 - 90,000",
        descripcion:
          "Transformación operativa completa con cultura de eficiencia",
      },
    ],
  },
  "cumplimiento-trazabilidad": {
    title: "Momentum de Cumplimiento y Confianza",
    subtitle: "Evitar sanciones y garantizar trazabilidad",
    niveles: [
      {
        nivel: "Ignite",
        precio: "5,000 - 10,000",
        descripcion:
          "Implementación de acciones correctivas y evidencias básicas",
      },
      {
        nivel: "Advanced",
        precio: "18,000 - 40,000",
        descripcion:
          "Transformación por procesos, roadmap de cumplimiento, formación interna",
      },
      {
        nivel: "360°",
        precio: "40,000 - 120,000",
        descripcion:
          "Sistema de gestión completo hasta certificación/acreditación",
      },
    ],
  },
  "satisfaccion-servicio": {
    title: "Momentum de Valor y Servicio",
    subtitle: "Aumentar satisfacción, fidelización y calidad de servicio",
    niveles: [
      {
        nivel: "Ignite",
        precio: "3,500 - 7,000",
        descripcion:
          "Identificación de puntos críticos del servicio y aplicación de mejoras inmediatas",
      },
      {
        nivel: "Advanced",
        precio: "8,000 - 25,000",
        descripcion:
          "Mapeo de experiencia, rediseño de procesos y capacitación de atención",
      },
      {
        nivel: "360°",
        precio: "25,000 - 80,000",
        descripcion: "Transformación cultural centrada en el usuario",
      },
    ],
  },
  "innovacion-transformacion": {
    title: "Momentum de Innovación y Transformación",
    subtitle: "Transformar mentalidades, liderazgo y mejora continua",
    niveles: [
      {
        nivel: "Ignite",
        precio: "5,000 - 9,000",
        descripcion:
          "Diagnóstico cultural y definición de acciones de impacto rápido",
      },
      {
        nivel: "Advanced",
        precio: "20,000 - 40,000",
        descripcion: "Programas de liderazgo y OKRs para equipos clave",
      },
      {
        nivel: "360°",
        precio: "65,000 - 120,000",
        descripcion: "Transformación institucional con cultura de calidad",
      },
    ],
  },
};

class PostItManager {
  constructor() {
    this.total = 0;
    this.selectedItems = [];
    this.init();
  }

  init() {
    // Obtener parámetro de solución de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const solucion = urlParams.get("solucion");

    if (solucion && solucionesData[solucion]) {
      this.loadSolution(solucion);
    } else {
      // Si no hay parámetro de solución, redirigir al index
      window.location.href = "index.html";
      return;
    }

    this.totalAmount = document.querySelector(".total-amount");
    this.whatsappBtn = document.getElementById("whatsappBtn");

    this.addEventListeners();
    this.updateTotal();
    this.updateWhatsAppButton();
  }

  loadSolution(solucion) {
    const data = solucionesData[solucion];

    // Actualizar el título de la página
    document.querySelector(".page-title h1").textContent = data.title;
    document.querySelector(".page-title p").textContent = data.subtitle;

    // Actualizar el título del post-it
    document.querySelector(".post-it-title").textContent =
      "Niveles de Solución";
    document.querySelector(".post-it-subtitle").textContent =
      "Selecciona el nivel que se adapte a tus necesidades";

    // Generar los niveles
    const checklist = document.querySelector(".checklist");
    checklist.innerHTML = "";

    data.niveles.forEach((nivelData, index) => {
      const item = document.createElement("div");
      item.className = "checklist-item nivel-item";
      item.setAttribute(
        "data-price",
        nivelData.precio.split(" - ")[0].replace(",", "")
      );
      item.setAttribute("data-nivel", nivelData.nivel);

      item.innerHTML = `
        <div class="item-content">
          <div class="checkbox"></div>
          <div class="item-details">
            <div class="item-nivel">${nivelData.nivel}</div>
            <div class="item-description">${nivelData.descripcion}</div>
            <div class="item-price">$${nivelData.precio} MXN</div>
          </div>
        </div>
      `;

      checklist.appendChild(item);
    });

    this.checklistItems = document.querySelectorAll(".checklist-item");
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
    const priceAttr = item.getAttribute("data-price");
    const price = priceAttr ? parseInt(priceAttr) : 0;

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
      this.totalAmount.textContent = `$${this.total.toLocaleString()}`;
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
          "Enviar cotización por WhatsApp";
      } else {
        this.whatsappBtn.disabled = true;
        this.whatsappBtn.style.opacity = "0.6";
        this.whatsappBtn.style.cursor = "not-allowed";
        this.whatsappBtn.querySelector(".btn-text").textContent =
          "Selecciona un nivel";
      }
    }
  }

  sendWhatsApp() {
    if (this.selectedItems.length === 0) {
      alert("Por favor selecciona al menos un nivel.");
      return;
    }

    const phoneNumber = "4492790351";
    let message =
      "🚀 *Hola! Me interesa transformar mi organización con Momentum Partners MX*\n\n";
    message += "He seleccionado los siguientes niveles:\n\n";

    this.selectedItems.forEach((item) => {
      const nivel =
        item.querySelector(".item-nivel")?.textContent ||
        item.querySelector(".item-title")?.textContent;
      const descripcion =
        item.querySelector(".item-description")?.textContent || "";
      const price = item.querySelector(".item-price")?.textContent || "";

      message += `✅ *${nivel}*\n`;
      message += `${descripcion}\n`;
      message += `💰 ${price}\n\n`;
    });

    message += `📅 Fecha: ${new Date().toLocaleDateString("es-ES")}\n`;
    message += `🕐 Hora: ${new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })}\n\n`;
    message +=
      "🎯 *¿Podemos agendar una llamada para discutir los detalles y comenzar mi transformación organizacional?*\n\n";
    message += "¡Espero tu respuesta! Gracias.";

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
