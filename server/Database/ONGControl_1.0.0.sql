CREATE TABLE `usuario` (
  `usuarioid` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(200) NULL,
  `senha` VARCHAR(200) NULL,
  `ativo` CHAR(1) NULL,
  `tipo` CHAR(1) NULL,
  PRIMARY KEY (`usuarioid`));
