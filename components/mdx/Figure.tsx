import Image from "next/image";

export default function Figure({
  src, alt, caption, width, height, priority = false,
}: {
  src: string; alt: string; caption?: string;
  width: number; height: number; priority?: boolean;
}) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="rounded-xl border"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-neutral-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
