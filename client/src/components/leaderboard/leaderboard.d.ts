export interface LeaderboardFiltersProps {
  handleFormChange: (params: { city: string; name: string }) => void;
  formData: { city: string; name: string };
}
