import { Button } from "@/components/ui/button";
import type { Meta } from "@storybook/react";
import { LuActivity } from "react-icons/lu";

export default {
  title: "Button/sizes",
  component: Button,
} satisfies Meta<typeof Button>;

export const DefaultSize = () => {
  return (
    <Button size={"default"} variant={"info"}>
      Like
    </Button>
  );
};

export const LargeSize = () => {
  return (
    <Button size={"lg"} variant={"info"}>
      Like
    </Button>
  );
};

export const SmallSize = () => {
  return (
    <Button size={"sm"} variant={"info"}>
      Like
    </Button>
  );
};

export const IconSize = () => {
  return (
    <Button size={"icon"} variant={"info"}>
      <LuActivity size={18} />
    </Button>
  );
};
