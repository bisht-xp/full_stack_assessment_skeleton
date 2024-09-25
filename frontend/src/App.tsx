import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import toast from "react-hot-toast";
import { ChangeEvent, useEffect, useState } from "react";
import HomeCard from "./components/HomeCard";
import EditUserModal from "./components/EditUserModal";
import { Home } from "./utils/constant";
import { fetchHomes, setUpdateStatus } from "./store/features/homeSlice";
import { fetchUserHome, fetchUsers } from "./store/features/userSlice";
import ClickOutside from "./components/ClickOutside";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedHome, setSelectedHome] = useState<Home | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const {
    users,
    status: usersStatus,
    error: usersError,
  } = useSelector((state: RootState) => state.users);
  const {
    homes,
    totalPages,
    status: homesStatus,
    error: homesError,
  } = useSelector((state: RootState) => state.homes);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (usersStatus === "loading" || homesStatus === "loading") {
    return <h1 className="text-center text-3xl">Loading...</h1>;
  }

  if (usersStatus === "failed" || homesStatus === "failed") {
    toast.error(usersError || homesError || "Error fetching data");
    return <h1>Something went wrong</h1>;
  }

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(e.target.value);
    setSelectedUser(userId);
    setPage(1);
    dispatch(fetchHomes({ userId: userId, page }));
    dispatch(setUpdateStatus("idle"));
  };

  const onClickEdit = (home: Home) => {
    setSelectedHome(home);
    dispatch(fetchUserHome(home?.id));
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(fetchHomes({ userId: selectedUser, page: newPage }));
  };

  return (
    <div className="w-full overflow-hidden flex flex-col">
      <h1 className="text-3xl font-bold text-center">Assignment</h1>
      <div className="flex justify-end items-center gap-3 h-fit px-4 mt-4">
        <div className="font-bold text-2xl">
          <p className="">Select User:</p>
        </div>
        <select
          value={selectedUser || ""}
          onChange={handleUserChange}
          className="mb-4 p-2 border rounded"
        >
          {selectedUser === null && <option value="">None</option>}

          {users?.length !== 0 &&
            users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
        </select>
      </div>

      <div className="w-full px-5 md:px-16 lg:px-32 mt-8">
        {homes.length > 0 ? (
          <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 ">
            {homes.map((home) => (
              <HomeCard key={home.id} home={home} onClickEdit={onClickEdit} />
            ))}
          </div>
        ) : (
          <div className="w-full md:w-[540px] mx-auto mt-8 ">
            <div className="flex flex-col justify-center items-center">
              <p className="text-center p-3 text-[17px] text-gray-800">
                No Homes Found
              </p>
            </div>
          </div>
        )}
      </div>

      {totalPages !== null && (
        <div className="w-full my-6 flex justify-center items-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed z-40 inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center duration-300 ease-out">
          <ClickOutside
            className="w-[90%] md:w-[60%] lg:w-[460px]"
            onClick={() => setIsModalOpen(false)}
          >
            <EditUserModal
              home={selectedHome}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSave}
              selectedUser={selectedUser}
              page={page}
            />
          </ClickOutside>
        </div>
      )}
    </div>
  );
}

export default App;
