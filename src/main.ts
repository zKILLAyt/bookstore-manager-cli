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

import { EmprestimoController } from "./controllers/EmprestimoController";
import { EmprestimoRepository } from "./repositories/EmprestimoRepository";
import { EmprestimoService } from "./services/EmprestimoService";
import { EmprestimoMenu } from "./menus/EmprestimoMenu";

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

  const emprestimoRepository = new EmprestimoRepository();

  const emprestimoService = new EmprestimoService(
    emprestimoRepository,
    livroRepository,
    clienteRepository,
  );

  const emprestimoController = new EmprestimoController(emprestimoService);
  const emprestimoMenu = new EmprestimoMenu(emprestimoController);

  await autorMenu.iniciar();
  await livroMenu.iniciar();
  await clienteMenu.iniciar();
  await emprestimoMenu.iniciar();
}

main();
