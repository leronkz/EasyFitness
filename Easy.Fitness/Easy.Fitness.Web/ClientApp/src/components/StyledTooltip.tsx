import { Fade, Tooltip } from "@mui/material";

interface StyledTooltipInterface {
  title: string;
  children: JSX.Element;
}

export const StyledTooltip = ({ title, children }: StyledTooltipInterface) => {
  return (
    <Tooltip
      title={title}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      {children}
    </Tooltip>
  );
}