import { Button } from "@mui/material";

interface CTAButtonProps {
  variant: "contained" | "text" | "blurred" | "outlined";
  text: React.ReactNode;
  children?: object;
  endIcon?: React.ReactNode;
  component?: React.ElementType;
  href?: string;
}

const CTAButton = ({
  variant,
  text,
  children,
  endIcon,
  component,
  href,
}: CTAButtonProps) => {
  return (
    <Button
      variant={variant}
      sx={{ ...children }}
      endIcon={endIcon}
      {...(component && { component })}
      {...(href && { href })}
    >
      {text}
    </Button>
  );
};

export default CTAButton;
