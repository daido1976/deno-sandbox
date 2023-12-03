const printCharWithPadding = (char: string, padding: number) =>
  " ".repeat(padding) + char;

const createDiamondLine = (index: number, max: number): string => {
  // Determine the padding on the left side
  const padding = max - index;
  // Create the left half of the characters
  const leftHalf = Array.from({ length: index + 1 }, (_, i) =>
    String.fromCharCode(65 + i)
  ).join("");
  // Create the right half by reversing the left half minus the last character
  const rightHalf = leftHalf.split("").slice(0, -1).reverse().join("");
  // Combine both halves with padding
  return printCharWithPadding(leftHalf + rightHalf, padding);
};

const printDiamond = (char: string) => {
  const charCode = char.toUpperCase().charCodeAt(0);
  const maxCharCode = "Z".charCodeAt(0);
  // Validate input
  if (charCode < 65 || charCode > maxCharCode) {
    console.error("Character must be a letter from A-Z.");
    return;
  }
  // Calculate the number of lines in the diamond
  const size = charCode - 65;
  // Generate the top half of the diamond
  const topHalf = Array.from({ length: size + 1 }, (_, i) =>
    createDiamondLine(i, size)
  );
  // Generate the bottom half of the diamond by reversing the top half minus the last line
  const bottomHalf = topHalf.slice(0, -1).reverse();
  // Combine both halves and print the diamond
  const diamond = topHalf.concat(bottomHalf).join("\n");
  console.log(diamond);
};

// Call the function with the desired character
printDiamond("Z");
