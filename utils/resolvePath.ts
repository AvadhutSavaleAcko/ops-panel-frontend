export function resolvePath(path: string) {
  return (
    (process.env.NEXT_STATIC_ASSET_PREFIX || "") +
    (process.env.NEXT_PUBLIC_PATH_PREFIX || "") +
    path
  );
}
