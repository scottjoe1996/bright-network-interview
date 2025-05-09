import { removePunctuation } from "./remove-punctuation";

describe("removePunctuation", () => {
  it.each([
    ["Hello, world! How's it going?", "Hello world Hows it going"],
    [
      "This is an example — with dashes… and ellipses.",
      "This is an example  with dashes and ellipses",
    ],
    [`"double qoutes" and a colon:!`, "double qoutes and a colon"],
    ["", ""],
  ])('removes punctuation from "%s"', (input, expected) => {
    expect(removePunctuation(input)).toBe(expected);
  });
});
