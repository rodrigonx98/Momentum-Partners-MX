# ConsultPro - Landing Page y Cotizador

Una página web profesional para servicios de consultoría con landing page y sistema de cotización integrado.

## 🌟 Características

### Landing Page

- ✅ Diseño moderno y profesional
- ✅ Secciones: Hero, Servicios, Nosotros, CTA, Contacto
- ✅ Información de contacto con enlace directo a WhatsApp
- ✅ Diseño completamente responsive
- ✅ Animaciones suaves y efectos visuales

### Sistema de Cotización

- ✅ Interfaz tipo checklist profesional
- ✅ Selección múltiple de servicios
- ✅ Cálculo automático del total
- ✅ Integración con WhatsApp
- ✅ Diseño consistente con la landing page

## 🚀 Configuración

### 1. Personalizar Información de Contacto

Actualiza la información de contacto en `index.html`:

- **Teléfono**: Línea 207
- **Email**: Línea 215
- **Ubicación**: Línea 223
- **WhatsApp**: Línea 231 (número y enlace)

### 2. Personalizar Información

#### WhatsApp

- **Número**: Actualiza en `script.js` línea 95
- **Mensaje**: Personaliza el formato en `script.js` líneas 97-110

#### Servicios y Precios

Edita en `cotizacion.html`:

- Nombres de servicios (líneas 35, 45, 55, 65, 75, 85)
- Descripciones (líneas 37, 47, 57, 67, 77, 87)
- Precios (líneas 38, 48, 58, 68, 78, 88)

## 📁 Estructura de Archivos

```
├── index.html              # Landing page principal
├── cotizacion.html         # Página de cotización
├── landing-styles.css      # Estilos de la landing page
├── landing-script.js       # JavaScript de la landing page
├── styles.css              # Estilos del cotizador
├── script.js               # JavaScript del cotizador
└── README.md               # Este archivo
```

## 🌐 Despliegue en GitHub Pages

### Opción 1: Repositorio Público

1. Sube todos los archivos a un repositorio público en GitHub
2. Ve a Settings > Pages
3. Selecciona "Deploy from a branch"
4. Elige la rama `main` y carpeta `/ (root)`
5. Tu sitio estará disponible en `https://tuusuario.github.io/turepositorio`

### Opción 2: Repositorio Privado (GitHub Pro)

1. Mismo proceso que arriba
2. GitHub Pages funciona con repositorios privados si tienes GitHub Pro

### Opción 3: Dominio Personalizado

1. Compra un dominio
2. En Settings > Pages, agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones de GitHub

## 🎨 Personalización

### Colores

Los colores principales están definidos en CSS:

- **Azul principal**: `#3b82f6`
- **Azul oscuro**: `#1e40af`
- **Verde**: `#10b981`
- **Gris**: `#64748b`

### Fuentes

- **Principal**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto

### Logos e Imágenes

- Reemplaza el texto "ConsultPro" con tu logo
- Agrega imágenes en la sección Hero si lo deseas

## 📱 Responsive Design

El sitio está optimizado para:

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (480px - 768px)
- ✅ Mobile pequeño (< 480px)

## 🔧 Funcionalidades Técnicas

### Landing Page

- **Smooth scrolling** entre secciones
- **Animaciones** con Intersection Observer
- **Información de contacto** con enlaces directos
- **Notificaciones** en tiempo real
- **Contador animado** de estadísticas

### Cotizador

- **Selección múltiple** de servicios
- **Cálculo automático** del total
- **Integración WhatsApp** con mensaje pre-formateado
- **Animaciones** de entrada y selección
- **Validación** antes de enviar

## 🚀 Optimizaciones

### Performance

- ✅ CSS y JS minificados
- ✅ Imágenes optimizadas
- ✅ Lazy loading implementado
- ✅ Código limpio y eficiente

### SEO

- ✅ Meta tags completos
- ✅ Estructura semántica HTML
- ✅ URLs amigables
- ✅ Open Graph tags

### Accesibilidad

- ✅ ARIA labels
- ✅ Navegación por teclado
- ✅ Contraste adecuado
- ✅ Textos alternativos

## 🐛 Solución de Problemas

### WhatsApp no abre

1. Verifica que el número de teléfono esté en formato correcto
2. Asegúrate de que haya servicios seleccionados
3. Revisa que el mensaje no exceda el límite de caracteres

### Estilos no se cargan

1. Verifica que los archivos CSS estén en la ruta correcta
2. Limpia la caché del navegador
3. Revisa que no haya errores de sintaxis en CSS

## 📞 Soporte

Para problemas técnicos o personalizaciones:

- Revisa este README
- Consulta la documentación de Formspree
- Verifica la consola del navegador para errores

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Tu sitio web profesional está listo para usar!** 🎉
