# Proyecto de Backend con Cloudinary y Multer

## Tabla de Contenidos

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Colecciones y rutas](#ColeccionesRutas)
- [Uso](#uso)

## 1.Descripción

Este proyecto es una aplicación de JS que utiliza Multer para manejar la carga de archivos y Cloudinary para almacenarlos en la nube. Tiene tres colecciones y dos de ellas se relacionan entre sí.

## 2.Instalación

Para instalar y configurar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd tu_repositorio
   ```
3. Instala las dependencias:

   ```bash
   npm install express nodemon mongoose dotenv bcrypt jsonwebtokn multer multer-storage-cloudinary cloudinary
   ```

## 3.Configuración

1. Crea una cuenta en cloudinary si aún no tienes una.

2. Obtén tu cloud_name, api_key, y api_secret desde tu panel de control de Cloudinary.

3.Configura estas variables de entorno en tu sistema o archivo .env:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4. Asegúrate de tener una base de datos en MongoDB en funcionamiento.

5. Configura la conexión a MongoDB en tu archivo .env.

6. Define una clave secreta para firmar los tokens JWT. Esta clave debe ser segura y no compartirla públicamente.

7. Agrega esta clave al archivo .env:

## 4.Colecciones y Rutas

En esta sección se describen las diferentes colecciones que tiene el proyecto y sus respectivas rutas de acceso.

### Usuarios

- **Descripción**: Colección que almacena información sobre los usuarios.
- **Rutas**:
  - `/api/v1/users`: (GET) Obtiene todos los usuarios. Solo puede obtener todos los datos un perfil de administrador.
    RES 200 - Muestra todos los usuarios
    RES 400 - Error
  - `/api/v1/users/register`: (POST) Registra un nuevo usuario.
    RES 201 - Muestra el usuario registrado
    RES 400 - Ese nombre de usuario ya existe
    RES 400 - Error
  - `/api/v1/users/login`: (POST) Inicia sesión de un usuario existente.
    RES 200 - Muestra el usuario logueado y su token
    RES 400 - El usuario o la contraseña son incorrectos, si el nombre es incorrecto
    RES 400 - El usuario o la contraseña son incorrectos, si la contraseña es incorrecta
    RES 400 Error
  - `/api/v1/users/:id`: (PUT) Actualiza los datos de un usuario por su ID. Un usuario solo puede modificar sus propios datos.
    RES 200 - Muestra el usuario con datos actualizados
    RES 400 - Error
  - `/api/v1/users/:id`: (DELETE) Elimina un usuario por su ID. Un usuario solo puede eliminar sus propios datos.
    RES 200 - Muestra el usuario eliminada
    RES 400 - Error

### Consolas

- **Descripción**: Colección que almacena los datos de las consolas publicadas.
- **Rutas**:
  - `/api/v1/consolas/`: (GET) Obtiene todas las consolas publicadas.
    RES 200 - Muestra todas las consolas
    RES 400 - Error
  - `/api/v1/consolas/:year`: (GET) Obtiene una consola por su año.
    RES 200 - Muestra las consolas de ese año
    RES 400 - Error
  - `/api/v1/consolas/`: (POST) Publica una nueva consola. Solo puede publicar un perfil de administrador.
    RES 200 - Muestra consola publicada
    RES 400 - Error
  - `/api/v1/consolas/:id`: (PUT) Actualiza los datos de una consola por su ID. Solo puede actualizar los datos un perfil de administrador.
    RES 200 - Muestra la consola con datos actualizados
    RES 400 - Error
  - `/api/v1/consolas/:id`: (DELETE) Elimina una consola por su ID. Solo puede eliminar los datos un perfil de administrador.
    RES 200 - Muestra la consola eliminada
    RES 400 - Error

### Videojuegos

- **Descripción**: Colección que almacena los datos de las videojuegos. Esta colección está relacionada con la colección consolas, ya que en el modelo tiene un campo que es "consoles" y hace referencia a los datos de la colección Consolas.
- **Rutas**:

  - `/api/v1/videojuegos/not-verified`: (GET) Obtiene todos los videojuegos que aún no han sido verificados por el usuarios Admin. Solo puede obtener estos datos un perfil de adminisitrador.
    RES 200 - Muestra los videijuegos no verificados
    RES 400 - Error
  - `/api/v1/videojuegos/category/:category`: (GET) Obtiene todos los videojuegos publicados con la misma categoría.
    RES 200 - Muestra los videijuegos que tiene la categoría indicada
    RES 400 - Error
  - `/api/v1/videojuegos/price/:price`: (GET) Obtiene todos los videojuego publicados que tiene ese precio o inferior.
    RES 200 - Muestra los videojuegos con el precio indicado o inferior
    RES 400 - Error
  - `/api/v1/videojuegos/`: (GET) Obtiene todos los videojuegos publicados que ya han sido verificados por el usuarios Admin.
    RES 200 - Muestra los videojuegos verificados
    RES 400 - Error
  - `/api/v1/videojuegos/`: (POST) Publica un videojuego. Solo puede publicar un usuario resgitrado.
    RES 201 - Muestra el videojuego publicado
    RES 400 - Error
  - `/api/v1/videojuegos/:id`: (PUT) Actualiza los datos de un videojuego por su ID. Solo puede actualizar los datos un perfil de administrador
    RES 200 - Muestra el videojuego con datos actualizados
    RES 400 - Error
  - `/api/v1/videojuegos/:id`: (DELETE) Elimina los datos de un videojuego por su ID. Solo puede eliminar los datos un perfil de administrador.
    RES 200 - Muestra el videojuego eliminado
    RES 400 - Error

  ## 5.Uso

  **Registro de usuario**
  {"avatar": "Archivo jpg, png, jpeg, gif o webp",
  "userName": "Nombre",
  "password": "Contraseña",
  "rol": "Por defecto siempre será user"
  }

  **Login de usuario**
  { "userName": "Nombre",
  "password": "Contraseña",}

  **Actualizar datos de usuario**
  En la ruta el id será el id del usuario que queremos modificar.
  {"Campo a modificar": "Nuevo dato"}

  **Publicar consola**
  {"img": "Archivo jpg, png, jpeg, gif o webp",
  "name": "Nombre de la consola",
  "year": "Año de la consola"
  }

  **Actualizar datos de consola**
  En la ruta el id será el id de la consola que queremos modificar.
  {"Campo a modificar": "Nuevo dato"}

  **Publicar videojuego**
  {"img": "Archivo jpg, png, jpeg, gif o webp",
  "name": "Nombre del videojuego",
  "year": "Año de lanzamiento del videojuego",
  "description": "Descripción del videojuego",
  "category": "Elegir una categoría entre: aventuras, terror, coches, desportes, plataformas, naves,puzzles o simulacion",
  {consoles}: "ID de la colección consolas",
  {price}: "Precio del videojuego",
  {verified}: "Por defecto va a ser false"}

  **Actualizar datos de videojuego**
  En la ruta el id será el id del videojuego que queremos modificar.
  {"Campo a modificar": "Nuevo dato"}

  **Registro de Usuario, inicio de Sesión y publicación de un videojuego**

  1. Registro de Usuario:
     El usuario envía una solicitud POST para registrarse, proporcionando los datos requeridos.
     Si el registro es exitoso, el servidor devuelve un mensaje de confirmación y los detalles del usuario registrado.

  2. Inicio de Sesión:
     El usuario envía una solicitud POST para iniciar sesión, proporcionando su nombre de usuario y contraseña.
     Si las credenciales son válidas, el servidor devuelve un token JWT que puede ser utilizado para realizar acciones autenticadas.

  3. Publicación de un videojuego:
     Con el token JWT, el usuario envía una solicitud POST para publicar un nuevo videojuego, proporcionando los detalles del videojuego. Si la publicación es exitosa, el servidor devuelve un mensaje de confirmación y los detalles del videojuego publicado.
