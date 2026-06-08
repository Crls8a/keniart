function serializeStructuredData(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json">{serializeStructuredData(data)}</script>;
}
