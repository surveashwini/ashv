// Amazon domain map — extend as needed
const AMAZON_DOMAINS = {
    US: "amazon.com", CA: "amazon.ca", GB: "amazon.co.uk",
    AU: "amazon.com.au", DE: "amazon.de", FR: "amazon.fr",
    IT: "amazon.it", ES: "amazon.es", JP: "amazon.co.jp",
    IN: "amazon.in", BR: "amazon.com.br", MX: "amazon.com.mx",
    NL: "amazon.nl", SE: "amazon.se", SG: "amazon.sg",
    PL: "amazon.pl", TR: "amazon.com.tr", AE: "amazon.ae",
    SA: "amazon.sa", EG: "amazon.eg",
};
const FALLBACK = "amazon.ca";

async function getAmazonDomain() {
    // Cache in sessionStorage so we only hit the API once per session
    const cached = sessionStorage.getItem("amz_domain");
    if (cached) return cached;

    try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
        const { country_code } = await res.json();
        const domain = AMAZON_DOMAINS[country_code] ?? FALLBACK;
        sessionStorage.setItem("amz_domain", domain);
        return domain;
    } catch {
        return FALLBACK;  // network error or timeout → fall back
    }
}

async function buildAmazonUrl(asin, associatesTag = "") {
    const domain = await getAmazonDomain();
    const tag = associatesTag ? `?tag=${associatesTag}` : "";
    return `https://www.${domain}/dp/${asin}${tag}`;
}