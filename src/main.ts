import { AutorController } from "./controllers/AutorController";
import { AutorRepository } from "./repositories/AutorRepository";
import { AutorService } from "./services/AutorService";
import { AutorMenu } from "./menus/AutorMenu";

import { LivroController } from "./controllers/LivroController";
import { LivroRepository } from "./repositories/LivroRepository";
import { LivroService } from "./services/LivroService";
import { LivroMenu } from "./menus/LivroMenu";

import { ClienteController } from "./controllers/ClienteController";
import { ClienteRepository } from "./repositories/ClienteRepository";
import { ClienteService } from "./services/ClienteService";
import { ClienteMenu } from "./menus/ClienteMenu";

async function main(): Promise<void> {
  const autorRepository = new AutorRepository();
  const autorService = new AutorService(autorRepository);
  const autorController = new AutorController(autorService);
  const autorMenu = new AutorMenu(autorController);

  const livroRepository = new LivroRepository();
  const livroService = new LivroService(livroRepository, autorRepository);
  const livroController = new LivroController(livroService);
  const livroMenu = new LivroMenu(livroController);

  const clienteRepository = new ClienteRepository();
  const clienteService = new ClienteService(clienteRepository);
  const clienteController = new ClienteController(clienteService);
  const clienteMenu = new ClienteMenu(clienteController);

  await autorMenu.iniciar();
  await livroMenu.iniciar();
  await clienteMenu.iniciar();
}

main();
