# 🎬 Series Backend API

Backend desarrollado con **NestJS** y **PostgreSQL** para la gestión de **Series, Episodios y Géneros**, siguiendo buenas prácticas de diseño, arquitectura limpia y modelado correcto de base de datos.

---

## 📌 Descripción General

Este proyecto implementa un backend RESTful que permite administrar:

- 📺 **Series**
- 🎞️ **Episodios** (relación 1:N con Series)
- 🏷️ **Géneros** (relación N:N con Series)

El sistema está diseñado con una separación clara entre:
- **Modelo de datos (SQL / ER)**
- **Modelo de aplicación (NestJS / TypeScript)**

---

## 🧠 Lógica de Negocio

- Una **Serie** puede tener **muchos Episodios**
- Un **Episodio** pertenece **única y exclusivamente a una Serie**
- Una **Serie** puede pertenecer a **uno o varios Géneros**
- Un **Género** puede estar asociado a **múltiples Series**
- La relación Serie–Género se gestiona mediante una **tabla intermedia**

---

## 🗂️ Estructura del Repositorio

```text
.
├── backend-nest/
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── README.md (opcional)
│
├── diagrams/
│   ├── sql_entity_model.png
│   ├── ts_entity_model.png
│
└── README.md
