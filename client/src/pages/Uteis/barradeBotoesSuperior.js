import { Button, HStack } from "@chakra-ui/react";

export const barradeBotoesSuperior = () => {
  return (
    <HStack spacing="4" justify={"right"}>
      <Button
        variant="outline"
        colorScheme="gray"
        gap={2}
        onClick={handleNew}
        size="sm"
        marginBottom={2}
      >
        <AddIcon /> Nova
      </Button>
    </HStack>
  );
};
