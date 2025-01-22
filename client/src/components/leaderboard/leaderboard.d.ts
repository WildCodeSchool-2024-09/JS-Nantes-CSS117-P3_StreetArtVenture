export interface LeaderboardFiltersProps {
  handleFormChange: (params: { city: string; name: string }) => void;
  formData: { city: string; name: string };
}

export interface LeaderboardListProps {
  data: User[];
  fetchMore: () => void;
  refreshData: () => void;
}
