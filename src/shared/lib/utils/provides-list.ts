export function providesList<R, T extends string>(
  results: R[] | undefined,
  tagType: T,
  idKey: keyof R
) {
  return results
    ? [
        ...results.map((item) => ({ type: tagType, id: String(item[idKey]) } as const)),
        { type: tagType, id: 'LIST' } as const,
      ]
    : [{ type: tagType, id: 'LIST' } as const];
}
