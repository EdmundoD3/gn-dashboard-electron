CREATE TABLE `Pagos` (
  `id` INTEGER NOT NULL ,
  `cuenta_id` INTEGER NOT NULL,
  `pago` TEXT NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT),
    FOREIGN KEY (`cuenta_id`)
    REFERENCES `cuenta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `addres` (
  `id` INTEGER NOT NULL,
  `cliente_id` INTEGER NOT NULL,
  `street` TEXT NULL,
  `noaddress` TEXT NULL,
  `betweenstreet` TEXT NULL,
  `referencia` TEXT NULL,
  `observation` TEXT NULL,
  `state_id` INTEGER NOT NULL,
  `colonia_id` INTEGER NOT NULL,
  `city_id` INTEGER NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT),
    FOREIGN KEY (`cliente_id`)
    REFERENCES `cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`state_id`)
    REFERENCES `state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`colonia_id`)
    REFERENCES `colonia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`city_id`)
    REFERENCES `city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE `city` (
  `id` INTEGER NOT NULL,
  `city` TEXT NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT))


CREATE TABLE `cliente` (
  `id` INTEGER NOT NULL,
  `name` TEXT NOT NULL,
  `lastname` TEXT NULL,
  `email` TEXT NULL,
  `phone` TEXT NULL,
  `date` DATE NOT NULL,
  `comments` TEXT NULL,
  `cobrador_id` INTEGER NOT NULL,
  `status_id` INTEGER NOT NULL,
  `id_mdb` TEXT NULL,
  `vendedora_id` INTEGER NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT),
    FOREIGN KEY (`cobrador_id`)
    REFERENCES `cobrador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`status_id`)
    REFERENCES `status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`vendedora_id`)
    REFERENCES `vendedora` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE `cobrador` (
  `id` INTEGER NOT NULL,
  `username` TEXT NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT))

CREATE TABLE `colonia` (
  `id` INTEGER NOT NULL,
  `colonia` TEXT NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT))

CREATE TABLE `compra` (
  `id` INTEGER NOT NULL,
  `productos_id` INTEGER NOT NULL,
  `cuenta_id` INTEGER NOT NULL,
  `cantidad` INTEGER NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT),
    FOREIGN KEY (`productos_id`)
    REFERENCES `productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`cuenta_id`)
    REFERENCES `cuenta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE `cuenta` (
  `id` INTEGER NOT NULL AUTOINCREMENT,
  `cliente_id` INTEGER NOT NULL,
  `abono` TEXT NOT NULL,
  `ischange` INTEGER NOT NULL DEFAULT 0,
  `no_cuenta` TEXT NULL,
  `is_active` INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`, `cliente_id`),
    FOREIGN KEY (`cliente_id`)
    REFERENCES `cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE `productos` (
  `id` INTEGER NOT NULL,
  `nombre` TEXT NOT NULL,
  `contado` INTEGER NOT NULL,
  `credito` INTEGER NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT))

CREATE TABLE `state` (
  `id` INTEGER NOT NULL,
  `state` TEXT NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT))

CREATE TABLE `status` (
  `id` INTEGER NOT NULL,
  `status` TEXT NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT))

CREATE TABLE `vendedora` (
  `id` INTEGER NOT NULL,
  `vendedora` TEXT NOT NULL,
  PRIMARY KEY (`id` AUTOINCREMENT))