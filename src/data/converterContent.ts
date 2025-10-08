export type ConverterContent = {
  title: string;
  subtitle: string;
  sections: {
    title: string;
    type: "formulas" | "list" | "text";
    content: string[];
  }[];
};

export const converterContent: Record<string, ConverterContent> = {
  length: {
    title: "Length Converter",
    subtitle:
      "Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles with ease.",
    sections: [
      {
        title: "How to Convert Length Units Yourself",
        type: "formulas",
        content: [
          "1 mm = 0.001 m",
          "1 cm = 0.01 m",
          "1 m = 100 cm",
          "1 km = 1000 m",
          "1 inch = 2.54 cm",
          "1 cm = 0.3937 inch",
          "1 foot = 0.3048 m",
          "1 yard = 0.9144 m",
          "1 mile = 1609.34 m",
        ],
      },
      {
        title: "Example Calculations",
        type: "list",
        content: [
          "Convert 2 inches to centimeters → Formula: value × 2.54 → 2 × 2.54 = 5.08 cm",
          "Convert 3 miles to kilometers → Formula: value × 1.60934 → 3 × 1.60934 = 4.828 km",
          "Convert 1500 mm to meters → Formula: value ÷ 1000 → 1500 ÷ 1000 = 1.5 m",
        ],
      },
      {
        title: "Where Are These Units Used?",
        type: "list",
        content: [
          "Millimeters (mm), Centimeters (cm), Meters (m), Kilometers (km): Used worldwide in the metric system (Europe, Asia, Africa, Latin America).",
          "Inches, Feet, Yards, Miles: Still widely used in the United States, Canada (for height, construction), and UK (informally, e.g., road signs in miles).",
        ],
      },
      {
        title: "Fun Facts",
        type: "list",
        content: [
          "The inch was originally based on the width of a man’s thumb. Since 1959, it has been standardized as exactly 2.54 cm.",
          "In medieval England, an inch was legally defined as three barleycorns, dry and round, placed end to end.",
          "TV and monitor screen sizes are almost always measured in inches, even in countries that otherwise use the metric system.",
          "The yard was once defined as the distance from King Henry I’s nose to the tip of his thumb!",
          "The mile comes from the Roman phrase 'mille passus', meaning a thousand paces.",
        ],
      },
    ],
  },

  // weight, temperature, etc. will follow same structure
};
