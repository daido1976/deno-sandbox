// ASCII codes for uppercase A and Z for reference
const CHAR_CODE_UPPERCASE_A = "A".charCodeAt(0);
const CHAR_CODE_UPPERCASE_Z = "Z".charCodeAt(0);

// Function to pad a string with leading spaces
const padString = (str: string, padding: number) => " ".repeat(padding) + str;

// Function to create the left half of the diamond line
const createHalfDiamondLine = (index: number) =>
  Array.from({ length: index + 1 }, (_, i) =>
    String.fromCharCode(CHAR_CODE_UPPERCASE_A + i)
  ).join("");

// Function to create a full line in the diamond pattern
const createFullDiamondLine = (index: number, maxIndex: number) => {
  const leftHalf = createHalfDiamondLine(index);
  // If not the top line, add the mirrored right half
  const rightHalf =
    index > 0 ? leftHalf.slice(0, -1).split("").reverse().join("") : "";
  return padString(leftHalf + rightHalf, maxIndex - index);
};

// Function to generate the full diamond shape string for a given character
const generateDiamond = (char: string) => {
  const charCode = char.toUpperCase().charCodeAt(0);
  // Validate that the input character is within the range A-Z
  if (charCode < CHAR_CODE_UPPERCASE_A || charCode > CHAR_CODE_UPPERCASE_Z) {
    return "Character must be a letter from A-Z.";
  }
  // Calculate the height of the diamond up to the middle line
  const halfDiamondHeight = charCode - CHAR_CODE_UPPERCASE_A;
  // Calculate the total height of the diamond
  const totalDiamondHeight = halfDiamondHeight * 2 + 1;
  // Create the diamond pattern by iterating through each line
  const diamondLines = Array.from({ length: totalDiamondHeight }, (_, i) =>
    createFullDiamondLine(
      i <= halfDiamondHeight ? i : totalDiamondHeight - 1 - i,
      halfDiamondHeight
    )
  );
  return diamondLines.join("\n");
};

if (import.meta.main) {
  console.log(generateDiamond("z"));
}
