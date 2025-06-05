type ParagraphProps = {
  message: string;
  className?: string;
};
export default function CustomParagraph({
  message,
  className,
}: ParagraphProps) {
  return (
    <p
      className={
        className ??
        "text-center text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-6 lg:px-8"
      }
    >
      {message}
    </p>
  );
}
