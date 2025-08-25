import { memo } from "react";
import { useUser } from "../../hooks/useUser";
import type { IUserResponse } from "../../types/type";
import { FaPen, FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setUpdatingUser } from "../../lib/features/user-update-slice";

const UserView = () => {
  const { getUsers, deleteUser } = useUser();
  const { data } = getUsers();
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    deleteUser.mutate(id, {
      onSuccess: () => alert("User delete successfully"),
    });
  };

  return (
    <div className="UserView container">
      <h2>UserView</h2>
      <table className="table-fixed w-full">
        <thead className="">
          <tr className="p-4 bg-white/30">
            <th className="px-5 text-left w-[50px]">#</th>
            <th className="px-5 text-left">Name</th>
            <th className="px-5 text-left">Email</th>
            <th className="px-5 text-left">Username</th>
            <th className="px-5 text-left">Phone</th>
            <th className="px-5 text-left w-[100px]">Gender</th>
            <th className="px-5 text-left w-[100px]">Delete</th>
            <th className="px-5 text-left w-[100px]">Update</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {data?.map((item: IUserResponse, i: number) => {
            const { email, full_name, gender, phone_number, username, id } =
              item;
            return (
              <tr key={i} className="odd:bg-white/50 even:bg-white/40">
                <td className="w-[50px] px-5 overflow-x-auto whitespace-nowrap text-nowrap ">
                  {i + 1}
                </td>
                <td className="px-5 overflow-x-auto whitespace-nowrap text-nowrap">
                  {full_name}
                </td>
                <td className="px-5 overflow-x-auto whitespace-nowrap text-nowrap">
                  {email}
                </td>
                <td className="px-5 overflow-x-auto whitespace-nowrap text-nowrap">
                  {username}
                </td>
                <td className="px-5 overflow-x-auto whitespace-nowrap text-nowrap">
                  {phone_number}
                </td>
                <td className="px-5 overflow-x-auto whitespace-nowrap text-nowrap">
                  {gender}
                </td>
                <td className="px-5" onClick={() => handleDelete(id)}>
                  <FaTrash className="cursor-pointer text-red-500" />
                </td>
                <td className="px-5">
                  <FaPen
                    className="cursor-pointer"
                    onClick={() => dispatch(setUpdatingUser(item))}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default memo(UserView);
