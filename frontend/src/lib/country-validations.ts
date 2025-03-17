import type { CountryValidation } from "@/types/address";

export const countryValidations: Record<string, CountryValidation> = {
  AR: {
    zipCodePattern: /^\d{5}$/,
    zipCodeExample: "1414",
    hasStates: true,
    states: [
      "Buenos Aires",
      "Catamarca",
      "Chaco",
      "Chubut",
      "Córdoba",
      "Corrientes",
      "Entre Ríos",
      "Formosa",
      "Jujuy",
      "La Pampa",
      "La Rioja",
      "Mendoza",
      "Misiones",
      "Neuquén",
      "Río Negro",
      "Salta",
      "San Juan",
      "San Luis",
      "Santa Cruz",
      "Santa Fe",
      "Santiago del Estero",
      "Tierra del Fuego",
      "Tucumán",
      "Ciudad Autónoma de Buenos Aires",
    ],
    stateLabel: "Province",
  },
  US: {
    zipCodePattern: /^\d{5}(-\d{4})?$/,
    zipCodeExample: "10001 or 10001-1234",
    hasStates: true,
    states: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
      "District of Columbia",
    ],
    stateLabel: "State",
  },
  ES: {
    zipCodePattern: /^\d{5}$/,
    zipCodeExample: "28001",
    hasStates: true,
    states: [
      "Andalucía",
      "Aragón",
      "Asturias",
      "Baleares",
      "Canarias",
      "Cantabria",
      "Castilla y León",
      "Castilla-La Mancha",
      "Cataluña",
      "Comunidad Valenciana",
      "Extremadura",
      "Galicia",
      "Madrid",
      "Murcia",
      "Navarra",
      "País Vasco",
      "La Rioja",
      "Ceuta",
      "Melilla",
    ],
    stateLabel: "Province",
  },
  // Añadir más países según sea necesario
  DEFAULT: {
    zipCodePattern: /^.+$/,
    zipCodeExample: "",
    hasStates: false,
    stateLabel: "State/Province",
  },
};

export function getCountryValidation(countryCode: string): CountryValidation {
  return countryValidations[countryCode] || countryValidations.DEFAULT;
}

export function validateAddressForm(
  data: Partial<{
    country: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }>
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.street || data.street.trim() === "") {
    errors.street = "Street address is required";
  }

  if (!data.city || data.city.trim() === "") {
    errors.city = "City is required";
  }

  if (data.country) {
    const validation = getCountryValidation(data.country);

    if (validation.hasStates && (!data.state || data.state.trim() === "")) {
      errors.state = `${validation.stateLabel} is required`;
    }

    if (!data.zipCode || data.zipCode.trim() === "") {
      errors.zipCode = "Zip/Postal code is required";
    } else if (!validation.zipCodePattern.test(data.zipCode)) {
      errors.zipCode = `Invalid format. Example: ${validation.zipCodeExample}`;
    }
  }

  return errors;
}
