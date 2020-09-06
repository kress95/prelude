import Kind, { Ap } from "../../kind.ts";
import { AssertEquals } from "../../test/asserts.ts";
import Contravariant from "./contravariant.ts";

export const testContravariant = <T extends Kind, A, B, C>(
  args: Contravariant<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    f: (a: A) => B;
    g: (B: B) => C;
  },
) => {
  const { contramap, assertEquals, ta: a, g: f, f: g } = args;

  assertEquals(
    contramap<A, A>((x: A): A => x, a),
    a,
    "contravariant identity law",
  );

  assertEquals(
    contramap<A, C>((x: A) => f(g(x)), a),
    contramap<A, B>(g, contramap<B, C>(f, a)),
    "contravariant composition law",
  );
};