export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface GreetingProps {
  user?: User;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
}