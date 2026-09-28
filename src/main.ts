import { AutorController } from "./controllers/AutorController";
import { AutorRepository } from "./repositories/AutorRepository";
import { AutorService } from "./services/AutorService";
import { AutorMenu } from "./menus/AutorMenu";

async function main(): Promise<void> {
  const autorRepository = new AutorRepository();
  const autorService = new AutorService(autorRepository);
  const autorController = new AutorController(autorService);
  const autorMenu = new AutorMenu(autorController);

  await autorMenu.iniciar();
}

main();
