import { Button as NativeBSButton, IButtonProps, Heading } from "native-base";

interface PropsButton extends IButtonProps {
  title: string;
}

export function Button({ title, ...rest }: PropsButton) {
  return (
    <NativeBSButton
      {...rest}
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{
        bg: "green.500",
      }}
    >
      <Heading color="white" fontSize="lg">
        {title}
      </Heading>
    </NativeBSButton>
  );
}
