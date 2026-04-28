# AYNI - Artesanías Peruanas

## 1. Descripción del Proyecto
AYNI es una plataforma de comercio electrónico orientada a la venta internacional de artesanías peruanas auténticas. El diferenciador clave es la historia humana detrás de cada producto: mujeres de comunidades andinas alejadas, muchas de ellas madres, hijas y hermanas que han superado violencia política, social e intrafamiliar. El nombre "Ayni" proviene del quechua y significa reciprocidad, dar y recibir en comunidad.

**Target:** Compradores internacionales (Europa, Norteamérica) que valoran el comercio justo, el impacto social y la autenticidad cultural.

## 2. Estructura de Páginas
- `/` - Página principal (Hero + Productoras + Historias + Catálogo + Contacto)

## 3. Funcionalidades Core
- [x] Hero con slider de imágenes/videos de artesanías y productoras
- [x] Sección de productoras con historias de superación (5 perfiles)
- [x] Catálogo dinámico con filtros por categoría
- [x] Carrito de compras lateral (slide-in)
- [x] Soporte multiidioma: Español, Inglés, Alemán, Checo
- [x] Banner de cookies
- [x] Formulario de contacto
- [x] Newsletter subscription
- [x] Navegación con logo, idioma y carrito

## 4. Modelo de Datos (Mock)
- Productoras: nombre, región, especialidad, historia, imagen, cita
- Productos: id, nombre, categoría, precio, artesana, imagen, descripción, stock
- Carrito: items (producto + cantidad)

## 5. Integraciones
- Supabase: No conectado (fase futura para pedidos reales)
- Shopify: No conectado (fase futura para pagos)
- Stripe: No conectado (fase futura)
- Formularios: Readdy Forms (contacto + newsletter)

## 6. Plan de Desarrollo

### Fase 1: Página Principal Completa ✅
- Goal: Construir toda la página principal con todas las secciones
- Deliverable: Página funcional con hero, productoras, catálogo, carrito, contacto, i18n, cookies
