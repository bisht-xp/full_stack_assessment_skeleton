import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useState } from "react";
import { Home } from "../utils/constant";
import { fetchHomes, updateUser } from "../store/features/homeSlice";
import toast from "react-hot-toast";

interface EditProps {
  onSave: () => void;
  home: Home | null;
  onClose: () => void;
  selectedUser: number | null;
  page: number;
}

const EditUserModal: React.FC<EditProps> = ({ onSave, home, onClose, selectedUser, page }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, userHomes } = useSelector((state: RootState) => state.users);
  const [selectedUsers, setSelectedUsers] = useState<number[]>(
    userHomes.map((user) => user.id)
  );

  const handleUserToggle = (userId: number) => {
    const updatedSelection = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];

    setSelectedUsers(updatedSelection);
  };
  
  
  const handleSave = () => {
    if (home?.id != null) {
      dispatch(updateUser({ homeId: home.id, userIds: selectedUsers }))
        .then(() => {
          if (selectedUser !== null) {
            dispatch(fetchHomes({ userId: selectedUser, page }));
          }
          onSave();
          onClose();
        })
        .catch((error) => {
          console.error("Error updating users:", error);
          toast.error("Failed to update users");
        });
    } else {
      onSave();
      onClose();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      {selectedUsers.length === 0 && (
        <p className="w-full text-center text-red-500 text-lg font-normal">
          At least one user must be selected
        </p>
      )}
      <h2 className="text-xl font-semibold mb-4">
        Edit Users for home: {home?.street_address}
      </h2>
      {users.map((user) => (
        <div key={user.id} className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleUserToggle(user.id)}
              className="mr-2"
            />
            {user.username}
          </label>
        </div>
      ))}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={selectedUsers.length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
