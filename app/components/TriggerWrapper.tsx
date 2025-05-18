import useMediaQuery from "@/hooks/useMediaQuery";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerTrigger } from "./ui/drawer";

const TriggerWrapper = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <DialogTrigger>{children}</DialogTrigger>;
  }

  return <DrawerTrigger>{children}</DrawerTrigger>;
};

export default TriggerWrapper;
