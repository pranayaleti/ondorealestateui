import { useEffect, useState } from "react";
import { companyInfo, companyTimezone, DetectedTimezone, getUserTimezone } from "@/constants";

const fallbackTimezone: DetectedTimezone = companyTimezone;

export function useUserTimezone() {
  const [timezone, setTimezone] = useState<DetectedTimezone>(fallbackTimezone);

  useEffect(() => {
    const detected = getUserTimezone();
    setTimezone(detected);
  }, []);

  const storageTimezone = {
    iana: companyInfo.timezoneIANA,
    abbreviation: companyInfo.timezoneAbbr,
    display: companyTimezone.display,
  };

  return { displayTimezone: timezone, storageTimezone };
}

