function identity(entry) {
  const viewport = entry.viewport ?? {};
  return [entry.route, entry.locale, entry.theme, viewport.width, viewport.height].join("|");
}

export function retainCurrentComparisons({ previousWebsite, refreshedWebsite, comparisons }) {
  const oldByPath = new Map(previousWebsite.map((entry) => [entry.path, entry]));
  const refreshedByPath = new Map(refreshedWebsite.map((entry) => [entry.path, entry]));
  const refreshedByIdentity = new Map(refreshedWebsite.map((entry) => [identity(entry), entry]));

  return comparisons.filter((comparison) => {
    const oldCapture = oldByPath.get(comparison.websitePath);
    if (!oldCapture) return !refreshedByPath.has(comparison.websitePath);

    const replacement = refreshedByIdentity.get(identity(oldCapture));
    if (!replacement) return true;

    return oldCapture.path === replacement.path && oldCapture.sha256 === replacement.sha256;
  });
}
