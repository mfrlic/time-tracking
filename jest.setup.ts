import "@testing-library/jest-dom";

// surpresses CSS stylesheet error in tests which does not impact the tests outcome
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};
