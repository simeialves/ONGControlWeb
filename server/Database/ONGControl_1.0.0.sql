CREATE TABLE `usuario` (
  `usuarioid` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(200) NULL,
  `senha` VARCHAR(200) NULL,
  `ativo` CHAR(1) NULL,
  `tipo` CHAR(1) NULL,
  PRIMARY KEY (`usuarioid`));

CREATE TABLE `pessoa` (
  `pessoaid` INT(11) NOT NULL,
  `nome` VARCHAR(100) NULL,
  `documento` VARCHAR(20) NULL,
  `sexo` CHAR(1) NULL,
  `dtnascimento` DATE NULL,
  `telefone` VARCHAR(20) NULL,
  `email` VARCHAR(100) NULL,
  `cep` VARCHAR(20) NULL,
  `logradouro` VARCHAR(100) NULL,
  `numero` VARCHAR(20) NULL,
  `complemento` VARCHAR(20) NULL,
  `bairro` VARCHAR(100) NULL,
  `cidade` VARCHAR(100) NULL,
  `uf` VARCHAR(2) NULL,
  `pais` VARCHAR(30) NULL,
  `tipo` CHAR(1) NULL,
  PRIMARY KEY (`pessoaid`));


CREATE TABLE `projeto` (
  `projetoid` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(200) NULL,
  `ativo` CHAR(1) NULL,  
  PRIMARY KEY (`projetoid`));
  
  ALTER TABLE `evento` 
ADD CONSTRAINT FK_projetoid
FOREIGN KEY (projetoid) REFERENCES projeto (projetoid);



DELIMITER $$
USE `simeialv_ongcontrol`$$
DROP TRIGGER IF EXISTS `simeialv_ongcontrol`.`doacaoevento_after_insert` $$
DELIMITER ;


delimiter $$
create trigger `doacaoevento_after_insert` after insert on doacaoevento for each row begin	    
    update tipodoacaoevento set quantidaderecebidas = quantidaderecebidas + new.quantidade where tipodoacaoeventoid = new.tipodoacaoeventoid;
end
$$
delimiter ;