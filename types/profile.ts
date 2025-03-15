export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  additional_info: JSON;
  avatar: string;
  username: string;
  total_applications: number;
  bio: string;
}
