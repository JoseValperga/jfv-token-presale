
---
# 🪙 JFV Token – Backend de Plataforma de Preventa

Este proyecto corresponde al backend de una plataforma de preventa de tokens construida como parte de mi portafolio Web3. Fue inspirado en un desafío técnico superado exitosamente y transformado en un proyecto personal con visión escalable y profesional.

## 🚀 Tecnologías utilizadas

- **Node.js + Express**
- **TypeScript**
- **Arquitectura basada en SOLID / Clean Architecture**
- **PostgreSQL + Sequelize**
- **JWT para autenticación**
- **Docker y Docker Compose**
- **WSL 2 + Visual Studio Code**
- **Control de versiones con Git + GitHub**

## 📁 Estructura del backend

```

backend/
├── package.json
├── tsconfig.json
├── src/
│   ├── app.ts                  # Entry point del servidor
│   ├── config/                 # Configuraciones generales
│   │   ├── envs.ts             # Config vars (PORT, DB, etc.)
│   │   ├── index.ts
│   │   └── validators.ts       # Validadores generales (ej: email, password)
│   ├── domain/                 # Lógica de negocio desacoplada
│   │   ├── datasources/        # Interfaces de acceso a datos
│   │   ├── dtos/               # Data Transfer Objects
│   │   │   └── auth/
│   │   │       └── register-user.dto.ts
│   │   ├── entities/           # Entidades puras del dominio
│   │   └── repositories/       # Interfaces de repositorios
│   ├── infrastructure/         # Implementaciones concretas (Sequelize, etc.)
│   ├── presentation/           # Capa de presentación (Express)
│   │   ├── auth/
│   │   │   ├── controller.ts   # Controlador de auth
│   │   │   └── routes.ts       # Rutas de auth
│   │   ├── routes.ts           # Agrega todos los routers del proyecto
│   │   └── server.ts           # Encapsula la instancia del servidor

````

> ✨ Esta arquitectura está inspirada en Clean Architecture y permite escalar fácilmente a nuevos módulos como `users`, `tokens`, `payments`, etc.

## 🧪 En desarrollo

- Registro e inicio de sesión
- Hashing de contraseñas
- Validaciones con DTOs
- Dockerización
- Pruebas unitarias (próximamente)

## 📦 Instalación

```bash
cd packages/backend
npm install
npm run dev
````

## 📌 Notas

Este proyecto es parte de una **plataforma Web3 full stack** que incluye también smart contracts en Solidity y un frontend moderno en Next.js + Tailwind CSS.

---

## 🤝 Conectemos

Si estás trabajando en algo similar o te interesa el mundo Web3, ¡me encantaría conectar!

