/** This decorator adds setter and getter methods
 * And require of type
 *@example
 * ```ts
 * class Name {
 *   AddSetGet<string>()
 *   name: string;
 *  }
 * ```
 */
export function AddSetGet<T>(name?: PropertyKey) {
  return (target: object, propertyKey: PropertyKey): void => {
    let value: T = undefined;

    if (name) propertyKey = name;

    Object.defineProperty(target, propertyKey, {
      set: function (data: T): void {
        value = data;
      },

      get: function (): T {
        return value;
      },
    });
  };
}
