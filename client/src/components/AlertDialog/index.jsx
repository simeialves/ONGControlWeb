import { useDisclosure } from "@chakra-ui/react";

const AlertDialog = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mensagem = props.mensagem;
  const titulo = props.titulo;
  const handleDelete = props.handleDelete;

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Apagar registro?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Tem certeza que deseja apagar o registro selecionado?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="red" ml={3} onClick={handleDelete}>
            Sim
          </Button>
          <Button ref={cancelRef} ml={3} onClick={onClose}>
            Cancelar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialog;
