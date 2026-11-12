import { Topic, BlogPost } from "../types";

/**
 * Placeholders para integración futura con APIs de noticias o headless CMS
 */
export const fetchLatestTechTopics = async (
  force = false,
  language = "en"
): Promise<Topic[]> => {
  try {
    // Educational & AI Focus Strategy:
    // EN: 'tutorial', 'beginners', 'ai', 'learning'
    // ES: 'tutorial', 'principiantes', 'ia'
    const tag = language.startsWith("es") ? "tutorial" : "tutorial";
    // We can rotate tags or fetch multiple if needed, but 'tutorial' + 'top' usually gives good learning content.
    // Let's try to get a mix or just focus on high quality tutorials.

    const response = await fetch(
      `https://dev.to/api/articles?tag=${tag}&top=10&per_page=12`
    );

    if (!response.ok) throw new Error("Failed to fetch from Dev.to");

    const data = await response.json();

    return data.map((article: any) => ({
      id: String(article.id),
      title: article.title,
      // Use efficient null coalescing
      category:
        article.tag_list?.[0] ||
        (language.startsWith("es") ? "Aprendizaje" : "Learning"),
      summary: article.description,
      // Ensure we have a valid image or a high-quality fallback
      imageUrl:
        article.cover_image ||
        article.social_image ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      content: article.description,
      fullContent: article.body_markdown || article.description,
      sourceUrl: article.url,
      authors: [
        { name: article.user.name, avatar: article.user.profile_image },
      ],
      // Add extra metadata for the Premium UI
      readingTime: article.reading_time_minutes || 5,
      reactions: article.public_reactions_count || 0,
      publishedAt: article.published_at,
      smartContent: {
        didYouKnow: [
          "Tip: The best way to learn to code is by building real projects, not just watching videos.",
          "Fact: Python and JavaScript are currently the most popular languages for AI and Web Development respectively.",
        ],
        relatedTerms: [
          {
            term: "Debugging",
            definition:
              "The process of identifying and removing errors from computer hardware or software.",
          },
          {
            term: "Algorithm",
            definition:
              "A set of rules to be followed in calculations or other problem-solving operations.",
          },
        ],
      },
    }));
  } catch (error) {
    console.error("Error fetching tech topics:", error);
    return [
      {
        id: "error-fallback",
        title: language.startsWith("es")
          ? "Sistema Recuperándose..."
          : "System Recovering...",
        category: "System",
        summary: "Nexus Network is strictly adhering to protocols.",
        imageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        content: "Please check your connection and try again.",
        fullContent: "Connection to external feeds interrupted.",
        sourceUrl: "#",
        authors: [{ name: "System" }],
        readingTime: 1,
        reactions: 0,
        publishedAt: new Date().toISOString(),
      },
    ];
  }
};

export const fetchArticleDetails = async (
  id: string
): Promise<string | null> => {
  try {
    const response = await fetch(`https://dev.to/api/articles/${id}`);
    if (!response.ok) throw new Error("Failed to fetch article details");
    const data = await response.json();
    return data.body_markdown;
  } catch (error) {
    console.error("Error fetching article details:", error);
    return null;
  }
};
