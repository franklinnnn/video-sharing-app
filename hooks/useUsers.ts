import { UserProps } from "@/types";
import axios from "axios";

type GetUsersResponse = { usersData: UserProps };
const useUsers = async () => {
  const res = await axios.get<GetUsersResponse>("/api/users");

  console.log(res.data.usersData);
  return res.data.usersData;
};

export default useUsers;
