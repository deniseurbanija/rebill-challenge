import { fetchCountries, type Country } from "./country-service";

// Fallback countries in case the API fails
export const fallbackCountries = [
  { name: "Argentina", code: "AR" },
  { name: "Australia", code: "AU" },
  { name: "Brazil", code: "BR" },
  { name: "Canada", code: "CA" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "India", code: "IN" },
  { name: "Italy", code: "IT" },
  { name: "Japan", code: "JP" },
  { name: "Mexico", code: "MX" },
  { name: "Netherlands", code: "NL" },
  { name: "Peru", code: "PE" },
  { name: "Russia", code: "RU" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "Spain", code: "ES" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Uruguay", code: "UY" },
  { name: "Venezuela", code: "VE" },
];

export interface FormattedCountry {
  name: string;
  code: string;
  flag?: string;
}

// Function to get countries from API or fallback
export async function getCountries(): Promise<FormattedCountry[]> {
  try {
    const apiCountries = await fetchCountries();

    if (apiCountries.length === 0) {
      return fallbackCountries;
    }

    return apiCountries.map((country: Country) => ({
      name: country.name.common,
      code: country.cca2,
      flag: country.flag,
    }));
  } catch (error) {
    console.error("Error getting countries:", error);
    return fallbackCountries;
  }
}

// For client components that need synchronous access
export const countries = fallbackCountries;
