import clsx from "clsx";

type PlaceholderProps = {
  ratio?: "1/1" | "4/3" | "16/10";
  fill?: boolean;
  className?: string;
};

export function Placeholder({ ratio = "1/1", fill = false, className }: PlaceholderProps) {
  return (
    <div
      className={clsx("rounded-token bg-placeholder", className)}
      style={fill ? undefined : { aspectRatio: ratio.replace("/", " / ") }}
    />
  );
}
