export interface LeaderboardFiltersProps {
  handleFormChange: (params: { city: string; username: string }) => void;
  formData: { city: string; username: string };
}

export interface LeaderboardListProps {
  data: User[];
  fetchMore: () => void;
  refreshData: () => void;
}
