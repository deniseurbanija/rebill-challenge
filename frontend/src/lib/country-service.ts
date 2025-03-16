export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string; // ISO 3166-1 alpha-2 code
  cca3: string; // ISO 3166-1 alpha-3 code
  flag: string; // Flag emoji
}

export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flag"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}`);
    }

    const data: Country[] = await response.json();

    // Sort countries by common name
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}
