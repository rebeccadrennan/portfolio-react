// LinkedIn API Service
// This service fetches LinkedIn profile data

// Option 1: Using Rapid API (LinkedIn Profile API)
// Sign up at: https://rapidapi.com/gsiHamidReza/api/linkedin-api

export const fetchLinkedInData = async (linkedinUrl) => {
  const userName = linkedinUrl.split("/in/")[1]?.split("/")[0];

  if (!userName) {
    console.error("Invalid LinkedIn URL");
    return null;
  }

  try {
    const response = await fetch(
      `https://linkedin-api1.p.rapidapi.com/profile/${userName}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
          "x-rapidapi-host": "linkedin-api1.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch LinkedIn data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching LinkedIn data:", error);
    return null;
  }
};

// Option 2: Manual data sync (recommended for simplicity)
// Update your content_option.js data periodically
export const parseLinkedInData = (apiResponse) => {
  if (!apiResponse) return null;

  return {
    headline: apiResponse.headline || "",
    summary: apiResponse.summary || "",
    experience: apiResponse.experience || [],
    education: apiResponse.education || [],
    skills: apiResponse.skills || [],
  };
};
