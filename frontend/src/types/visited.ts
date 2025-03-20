export interface CountryVisited {
  id: string;
  created_at: string;
  country_name: string;
  country_code: string;
  country_flag: string;
  user_id: string;
}

export interface VisitedState {
  favorites: CountryVisited[];
  loading: boolean;
  error: string | null;
}