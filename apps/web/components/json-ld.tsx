type JsonLdObject = Record<string, unknown>;

export function JsonLd({ data }: Readonly<{ data: JsonLdObject | ReadonlyArray<JsonLdObject> }>) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
