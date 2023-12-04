const ASCII_UPPERCASE_A = "A".charCodeAt(0);
const ASCII_UPPERCASE_Z = "Z".charCodeAt(0);

// Function to add leading spaces to a given character string
const padCharWithSpaces = (char: string, padding: number) =>
  " ".repeat(padding) + char;

// Function to create a single line of the diamond, composed of a mirrored alphabet sequence
const createDiamondLine = (index: number, max: number) => {
  const padding = max - index;
  // Generate the left half of the diamond line up to the current character
  const leftHalf = Array.from({ length: index + 1 }, (_, i) =>
    String.fromCharCode(ASCII_UPPERCASE_A + i)
  ).join("");
  // Generate the right half by mirroring the left half, excluding the pivot character
  const rightHalf = leftHalf.split("").slice(0, -1).reverse().join("");
  // Combine the left and right halves with padding and return the line
  return padCharWithSpaces(leftHalf + rightHalf, padding);
};

// Function to generate the full diamond shape string for the given character
const generateDiamondString = (char: string) => {
  const charCode = char.toUpperCase().charCodeAt(0);
  // Validate the input character is within the range A-Z
  if (charCode < ASCII_UPPERCASE_A || charCode > ASCII_UPPERCASE_Z) {
    return "Character must be a letter from A-Z.";
  }
  // Calculate how many lines the diamond will have based on the input character
  const size = charCode - ASCII_UPPERCASE_A;
  // Construct the top half of the diamond
  const topHalf = Array.from({ length: size + 1 }, (_, i) =>
    createDiamondLine(i, size)
  );
  // Construct the bottom half by reversing the top half, excluding the middle line
  const bottomHalf = topHalf.slice(0, -1).reverse();
  // Join the top and bottom halves to form the diamond and return the string
  return [...topHalf, ...bottomHalf].join("\n");
};

if (import.meta.main) {
  console.log(generateDiamondString("Z"));
}
