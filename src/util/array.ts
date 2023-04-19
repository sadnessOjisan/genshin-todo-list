type ElementOf<A extends any[]> = A extends (infer Elm)[] ? Elm : unknown;
type IsNever<T> = T[] extends never[] ? true : false;

export function allElements<V>(): <Arr extends V[]>(
  arr: Arr
) => IsNever<Exclude<V, ElementOf<Arr>>> extends true ? V[] : unknown {
  return (arr) => arr as any;
}
