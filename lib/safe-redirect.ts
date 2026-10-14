export function safeInternalPath(value: unknown) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/dashboard";
  }

  const destination = new URL(value, "https://freshfold.invalid");
  if (destination.origin !== "https://freshfold.invalid") return "/dashboard";
  return `${destination.pathname}${destination.search}${destination.hash}`;
}
