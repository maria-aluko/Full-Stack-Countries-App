import { supabase } from "../../config/supabase";
import { Country } from "../../types/country";
import { CountryVisited } from "../../types/visited";

// Cache for visited status to reduce redundant API calls
let visitedCache: CountryVisited[] | null = null;
let lastFetchTime = 0;
const CACHE_EXPIRY = 30000; // 30 seconds

export const visitedApi = {
  /**
   * Get all visited for the current user
   * @param useCache Whether to use cached data if available
   */
  async getVisited(useCache = true): Promise<CountryVisited[]> {
    const now = Date.now();

    // Return cached data if it's fresh and useCache is true
    if (useCache && visitedCache && now - lastFetchTime < CACHE_EXPIRY) {
      return visitedCache;
    }

    const { data, error } = await supabase
      .from("country_visited")
      .select("*");

    if (error) {
      console.error("Error fetching visited:", error);
      throw new Error(error.message);
    }

    // Update cache
    visitedCache = data || [];
    lastFetchTime = now;

    return visitedCache;
  },

  /**
   * Add a country to visited
   */
  async addVisited(country: Country): Promise<CountryVisited> {
    const { data, error } = await supabase
      .from("country_visited")
      .insert([
        {
          country_name: country.name.common,
          country_code: country.cca3,
          country_flag: country.flags.png,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding visited:", error);
      throw new Error(error.message);
    }

    // Update cache if it exists
    if (visitedCache) {
      visitedCache.push(data);
    }

    return data;
  },

  /**
   * Remove a country from visited
   */
  async removeVisited(countryName: string): Promise<void> {
    const { error } = await supabase
      .from("country_visited")
      .delete()
      .eq("country_name", countryName);

    if (error) {
      console.error("Error removing visited:", error);
      throw new Error(error.message);
    }

    // Update cache if it exists
    if (visitedCache) {
      visitedCache = visitedCache.filter(
        (vis) => vis.country_name !== countryName
      );
    }
  },

  /**
   * Check if a country is in visited
   */
  async isVisited(countryName: string): Promise<boolean> {
    // Try to use cache first
    if (visitedCache) {
      const found = visitedCache.some(
        (vis) => vis.country_name === countryName
      );
      return found;
    }

    // If no cache, make a targeted query
    const { data, error } = await supabase
      .from("country_visited")
      .select("id")
      .eq("country_name", countryName)
      .maybeSingle();

    if (error) {
      console.error("Error checking visited status:", error);
      throw new Error(error.message);
    }

    return !!data;
  },

  /**
   * Clear the visited cache
   */
  clearCache() {
    visitedCache = null;
    lastFetchTime = 0;
  },
};