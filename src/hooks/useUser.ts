import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

export const userKey = "user-key";

export const useUser = () => {
  const client = useQueryClient();
  const getUsers = () =>
    useQuery({
      queryKey: [userKey],
      queryFn: () => api.get("user").then((res) => res.data),
    });

  const createUser = useMutation({
    mutationFn: (data: any) => api.post("user", data).then((res) => res.data),
    onSuccess: () => client.invalidateQueries({ queryKey: [userKey] }),
  });

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      api.patch(`user/${id}`, data).then((res) => res.data),
    onSuccess: () => client.invalidateQueries({ queryKey: [userKey] }),
  });

  const deleteUser = useMutation({
    mutationFn: (id: number) =>
      api.delete(`user/${id}`).then((res) => res.data),
    onSuccess: () => client.invalidateQueries({ queryKey: [userKey] }),
  });

  return { getUsers, createUser, updateUser, deleteUser };
};
