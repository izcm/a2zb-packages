import { useEffect, useState } from "react";
import { Toaster, type ToasterProps } from "sonner";

type ResponsiveToasterProps = ToasterProps & {
  smallScreenQuery?: string;
  smallScreenPosition?: ToasterProps["position"];
};

export function ResponsiveToaster({
  smallScreenQuery = "(max-width: 1024px)",
  smallScreenPosition = "top-center",
  position = "bottom-right",
  closeButton = true,
  invert = true,
  toastOptions = {
    classNames: {
      toast: "rounded shadow-[var(--panel-shadow)]",
      title: "text-sm font-semibold",
      description: "text-sm text-inherit!",
    },
  },
  ...toasterProps
}: ResponsiveToasterProps) {
  const [isSmallerScreen, setIsSmallerScreen] = useState(
    () => window.matchMedia(smallScreenQuery).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(smallScreenQuery);
    const update = () => setIsSmallerScreen(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, [smallScreenQuery]);

  return (
    <Toaster
      {...toasterProps}
      position={isSmallerScreen ? smallScreenPosition : position}
      closeButton={closeButton}
      invert={invert}
      toastOptions={toastOptions}
    />
  );
}
