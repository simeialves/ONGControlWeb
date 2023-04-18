import { Button, useToast } from "@chakra-ui/react";

export function Toast() {
  // Via instantiation
  const toast = useToast({
    position: "top",
    title: message,
    containerStyle: {
      width: "800px",
      maxWidth: "100%",
    },
  });
  // Or via trigger
  // Style here will overwrite the entire style above
  return (
    <Button
      onClick={() => {
        toast({
          containerStyle: {
            border: "20px solid red",
          },
        });
      }}
    >
      Click me to show toast with custom container style.
    </Button>
  );
}
