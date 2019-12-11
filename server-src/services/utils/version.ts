export function parseVersion(version: string) {
  const versionParts = version.split(".");
  const paddedVersionParts = versionParts.map((versionPart) => {
    return versionPart.replace(/\D+/g, "").padStart(5, "0");
  });
  const fullVersion = paddedVersionParts.join("").padEnd(15, "0");
  return Number(fullVersion);
}

export function formatVersion(version: number) {
  const fullVersion = String(version).padStart(15, "0");
  const major = Number(fullVersion.substr(0, 5));
  const minor = Number(fullVersion.substr(5, 5));
  const patch = Number(fullVersion.substr(10, 5));

  return [patch, minor, major].reduce((final, item) => {
    if (final) {
      return [item, final].join(".");
    }
    if (item) {
      return String(item);
    }
    return "";
  }, "");
}
