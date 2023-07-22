const pagos = `CREATE TABLE IF NOT EXISTS "pagos" (
  "id" INTEGER NOT NULL UNIQUE,
  "cuenta_id" INTEGER NOT NULL,
  "pago" TEXT NOT NULL,
  "no_recibo" TEXT NOT NULL DEFAULT 0,
  "date" DATETIME NOT NULL,
  "ischange" INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY ("id" AUTOINCREMENT),
  FOREIGN KEY ("cuenta_id")
    REFERENCES "cuenta" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);`

const addres = `CREATE TABLE IF NOT EXISTS "addres" (
  "id" INTEGER NOT NULL UNIQUE,
  "cliente_id" INTEGER NOT NULL,
  "street" TEXT NULL,
  "noaddress" TEXT NULL,
  "betweenstreet" TEXT NULL,
  "referencia" TEXT NULL,
  "observation" TEXT NULL,
  "state_id" INTEGER NOT NULL,
  "colonia_id" INTEGER NOT NULL,
  "city_id" INTEGER NOT NULL,
  "ischange" INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY ("id" AUTOINCREMENT),
  FOREIGN KEY ("cliente_id")
    REFERENCES "cliente" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY ("state_id")
    REFERENCES "state" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY ("colonia_id")
    REFERENCES "colonia" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY ("city_id")
    REFERENCES "city" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);`

const city = `CREATE TABLE IF NOT EXISTS "city" (
  "id" INTEGER NOT NULL UNIQUE,
  "city" TEXT NOT NULL UNIQUE,
  PRIMARY KEY ("id" AUTOINCREMENT));`

const cliente = `CREATE TABLE IF NOT EXISTS "cliente" (
  "id" INTEGER NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "lastname" TEXT NULL,
  "email" TEXT NULL,
  "phone" TEXT NULL,
  "date" DATE NOT NULL,
  "comments" TEXT NULL,
  "cobrador_id" INTEGER NOT NULL,
  "status_id" INTEGER NOT NULL,
  "ischange" INTEGER NOT NULL DEFAULT 1,
  "id_mdb" TEXT NULL,
  "vendedora_id" INTEGER NOT NULL,
  PRIMARY KEY ("id" AUTOINCREMENT),
  FOREIGN KEY ("cobrador_id")
    REFERENCES "cobrador" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY ("status_id")
    REFERENCES "status" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY ("vendedora_id")
    REFERENCES "vendedora" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);`

const cobrador = `CREATE TABLE IF NOT EXISTS "cobrador" (
  "id" INTEGER NOT NULL UNIQUE,
  "cobrador" TEXT NOT NULL UNIQUE,
  PRIMARY KEY ("id" AUTOINCREMENT));`

const colonia = `CREATE TABLE IF NOT EXISTS "colonia" (
  "id" INTEGER NOT NULL UNIQUE,
  "colonia" TEXT NOT NULL UNIQUE,
  PRIMARY KEY ("id" AUTOINCREMENT));`

const compra = `CREATE TABLE IF NOT EXISTS "compra" (
  "id" INTEGER NOT NULL UNIQUE,
  "productos_id" INTEGER NOT NULL,
  "cuenta_id" INTEGER NOT NULL,
  "cantidad" INTEGER NOT NULL,
  "ischange" INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY ("id" AUTOINCREMENT),
  FOREIGN KEY ("productos_id")
    REFERENCES "productos" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY ("cuenta_id")
    REFERENCES "cuenta" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);`

const cuenta = `CREATE TABLE IF NOT EXISTS "cuenta" (
  "id" INTEGER NOT NULL UNIQUE,
  "cliente_id" INTEGER NOT NULL,
  "total" VARCHAR(12) NOT NULL,
  "abono" VARCHAR(12) NOT NULL DEFAULT 0,
  "date" DATE NOT NULL,
  "contado_date" DATE NOT NULL,
  "ischange" INTEGER NOT NULL DEFAULT 0,
  "no_cuenta" TEXT NULL,
  "is_active" INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY ("id" AUTOINCREMENT),
  FOREIGN KEY ("cliente_id")
    REFERENCES "cliente" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);`

const productos = `CREATE TABLE IF NOT EXISTS "productos" (
  "id" INTEGER NOT NULL UNIQUE,
  "nombre" TEXT NOT NULL UNIQUE,
  "contado" INTEGER,
  "credito" INTEGER,
  PRIMARY KEY ("id" AUTOINCREMENT));`

const state = `CREATE TABLE IF NOT EXISTS "state" (
  "id" INTEGER NOT NULL UNIQUE,
  "state" TEXT NOT NULL UNIQUE,
  PRIMARY KEY ("id" AUTOINCREMENT));`

const status = `CREATE TABLE IF NOT EXISTS "status" (
  "id" INTEGER NOT NULL UNIQUE,
  "status" TEXT NOT NULL UNIQUE,
  PRIMARY KEY ("id" AUTOINCREMENT));`

const vendedora = `CREATE TABLE IF NOT EXISTS "vendedora" (
  "id" INTEGER NOT NULL UNIQUE,
  "vendedora" TEXT NOT NULL UNIQUE,
  PRIMARY KEY ("id" AUTOINCREMENT));`
const tables = {
  pagos,
  addres,
  city,
  cliente,
  cobrador,
  colonia,
  compra,
  cuenta,
  productos,
  state,
  status,
  vendedora
}

export default tables
export {
  pagos,
  addres,
  city,
  cliente,
  cobrador,
  colonia,
  compra,
  cuenta,
  productos,
  state,
  status,
  vendedora
}
