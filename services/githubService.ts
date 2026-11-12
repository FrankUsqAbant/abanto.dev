const GITHUB_USERNAME = "FrankUsqAbant";

export interface GithubProfile {
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  html_url: string;
  twitter_username?: string;
  public_repos: number;
  followers: number;
  created_at: string;
  company?: string;
  blog?: string;
}

export const fetchGithubProfile = async (): Promise<GithubProfile | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`
    );
    if (!response.ok) throw new Error("GitHub Profile Error");
    return await response.json();
  } catch (error) {
    console.error("Error fetching github profile:", error);
    return null;
  }
};
