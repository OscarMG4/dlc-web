type JsonLdProps = {
  schema: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ schema }: JsonLdProps) {
  // Evita que un "<" en el JSON cierre el <script>.
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
