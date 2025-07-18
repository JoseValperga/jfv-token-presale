/*Rutas de toda la aplicación*/

import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    // Aquí definimos las rutas de la aplicación
    router.use("/api/auth", AuthRoutes.routes);
    return router;
  }
}

/*

### ¿Qué significa `static get routes()`?

Esto es un **getter estático** en una clase de TypeScript (o JavaScript moderno). Vamos por partes:

---

### 🔹 `static`

Significa que el método pertenece a la clase en sí, no a una instancia.

Ejemplo:

```ts
AppRoutes.routes // válido
new AppRoutes().routes // ❌ no funciona, porque no es de instancia
```

---

### 🔹 `get`

Es un **getter**, una forma de definir una propiedad computada. En vez de usar un método como `AppRoutes.getRoutes()`, podés usar directamente `AppRoutes.routes`.

---

### 🔹 `routes(): Router`

Indica que este getter devolverá un objeto del tipo `Router` de Express.

---

### 🔸 En conjunto:

```ts
export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    // Aquí definís las rutas:
    router.get("/status", (req, res) => res.send("OK"));
    return router;
  }
}
```

Entonces podés usarlo así:

```ts
import express from "express";
import { AppRoutes } from "./routes";

const app = express();
app.use("/api", AppRoutes.routes); // ← Así accedés al getter estático
```

---

### ✅ Ventajas de usar `static get`:

* Podés usar la clase sin instanciarla.
* Se lee como una propiedad (`AppRoutes.routes`), no como un método.
* Ideal para organizar rutas en módulos reutilizables y limpios.

¿Querés que te ayude a implementarlo con una ruta de ejemplo?

*/
