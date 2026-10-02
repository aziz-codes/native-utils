export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type ApiResponse = {
  loading: boolean;
  data: Post[];
  error: string | null;
};
