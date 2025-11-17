export const companyInfo = {
  name: "Ondo Real Estate",
  email: "info@ondorealestate.com",
  calendlyUrl: "https://calendly.com/scheduleondo",
  timezoneAbbr: "MST",
  timezoneIANA: "America/Denver",

  // Optional: if set, submissions will be POSTed here in addition to localStorage capture
  leadWebhookUrl: "",

  // E.164 formatted phone for links and structured data
  phoneE164: "+15551234567",

  // Human-friendly phone for display
  phoneDisplay: "(555) 123-4567",

  address: {
    streetAddress: "123 Main Street, Suite 100",
    addressLocality: "Salt Lake City",
    addressRegion: "Utah",
    postalCode: "84101",
    addressCountry: "US",
  },

  hours: [
    { day: "Mon-Fri", opens: "09:00", closes: "17:00", timeZone: "America/Denver" },
    { day: "Sat", opens: "10:00", closes: "14:00", timeZone: "America/Denver" },
    { day: "Sun", closed: true },
  ],

  urls: {
    website: "https://ondorealestate.com",
    github: "https://github.com/ondorealestate",
    linkedin: "https://linkedin.com/company/ondorealestate",
    facebook: "https://facebook.com/ondorealestate",
    twitter: "https://twitter.com/ondorealestate",
    instagram: "https://instagram.com/ondorealestate",
    youtube: "https://youtube.com/@ondorealestate",
    linktree: "https://linktr.ee/ondorealestate",
  },

  foundingDate: "2020", // Year only for schema markup
  foundingDateDisplay: "2020", // Human-readable format

  // Geographic coordinates
  coordinates: {
    latitude: "40.7608",
    longitude: "-111.8910",
  },

  // Geographic center of service area
  serviceAreaCenter: {
    latitude: "40.7608",
    longitude: "-111.8910",
    radius: "50000", // 50km radius for Salt Lake City area
  },

  // Social media handles
  social: {
    twitter: "@ondorealestate",
    twitterDomain: "ondorealestate.com",
  },

  // Location display strings
  location: {
    full: "Salt Lake City, Utah, United States",
    short: "Salt Lake City, Utah, USA",
    geoRegion: "US-UT",
    country: "United States",
    countryShort: "USA",
  },

  // Logo path and dimensions
  logo: {
    path: "logo.png", // Use with import.meta.env.BASE_URL when needed
    width: 200,
    height: 60,
  },

  // OG image dimensions
  ogImage: {
    width: 1200,
    height: 630,
  },

  // Ratings and reviews
  ratings: {
    value: "4.8",
    reviewCount: "124", // Primary review count
    reviewCountAlt: "500", // Alternative count for some schema
    bestRating: "5",
    worstRating: "1",
    display: "4.8/5",
  },

  // Sales email (separate from contact email)
  salesEmail: "sales@ondorealestate.com",

  // Form placeholders
  placeholders: {
    email: "your@email.com",
    url: "https://example.com",
  },

  // Company size options
  companySizes: [
    { value: "1", label: "only 1 employee" },
    { value: "1-3", label: "1-3 employees" },
    { value: "4-10", label: "4-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
  ],

  // Invoice/payment terms
  invoiceTerms: {
    days: "15-30",
    description: "15-30 days",
  },
};

// Helper function to generate canonical URL
export function getCanonicalUrl(path = '') {
  const baseUrl = companyInfo.urls.website;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return path ? `${baseUrl}${cleanPath}` : baseUrl;
}

export function getPostalAddressSchema() {
  return {
    "@type": "PostalAddress",
    streetAddress: companyInfo.address.streetAddress,
    addressLocality: companyInfo.address.addressLocality,
    addressRegion: companyInfo.address.addressRegion,
    postalCode: companyInfo.address.postalCode,
    addressCountry: companyInfo.address.addressCountry,
  };
}

export function getContactPointSchema(contactType = "customer service") {
  return {
    "@type": "ContactPoint",
    telephone: companyInfo.phoneE164,
    contactType,
    email: companyInfo.email,
  };
}

// Helper function to format opening hours for schema markup
export function getOpeningHoursSchema() {
  return companyInfo.hours
    .filter(schedule => !schedule.closed)
    .map(schedule => {
      const dayMap = {
        "Mon-Fri": "Mo-Fr",
        "Sat": "Sa",
        "Sun": "Su"
      };
      const day = dayMap[schedule.day] || schedule.day;
      return `${day} ${schedule.opens}-${schedule.closes}`;
    });
}

// Helper function to get weekday hours (Mon-Fri)
export function getWeekdayHours() {
  const weekday = companyInfo.hours.find(h => h.day === "Mon-Fri");
  return weekday ? { opens: weekday.opens, closes: weekday.closes } : null;
}

// Helper function to get user's timezone in a user-friendly format
export function getUserTimezone() {
  if (typeof window === 'undefined' || typeof Intl === 'undefined') {
    return companyInfo.timezoneAbbr; // Fallback to company timezone
  }
  
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Get timezone abbreviation (e.g., "PST", "EST", "GMT")
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      timeZoneName: 'short'
    });
    const parts = formatter.formatToParts(date);
    const tzAbbr = parts.find(part => part.type === 'timeZoneName')?.value || '';
    
    // Return both IANA timezone and abbreviation for convenience
    return {
      iana: timeZone,
      abbreviation: tzAbbr || timeZone.split('/').pop()?.replace(/_/g, ' ') || '',
      display: tzAbbr || timeZone.split('/').pop()?.replace(/_/g, ' ') || ''
    };
  } catch (error) {
    console.warn('Failed to detect timezone:', error);
    return {
      iana: companyInfo.timezoneIANA,
      abbreviation: companyInfo.timezoneAbbr,
      display: companyInfo.timezoneAbbr
    };
  }
}

