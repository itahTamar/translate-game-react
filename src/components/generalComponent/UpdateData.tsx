import { useState } from "react";
import { updateDataById } from "../../api/generalApi";
import { ServerContext } from '../../context/ServerUrlContext';
import { useContext } from "react";
interface UpdateProps {
  data: {
    id: string;
    cell: any;
  };
  onSuccessfulUpdate: () => void;
}

const UpdateWord: React.FC<UpdateProps> = ({ data, onSuccessfulUpdate }) => {
  const [cell] = useState(data.cell);
  const [updateValue, setUpdateValue] = useState(data.cell)
  const serverUrl = useContext(ServerContext)

  const handleUpdate = async (ev: React.FormEvent<HTMLFormElement>) => {
    if(data === undefined) throw new Error("At UpdateData/handleUpdate the data in undefined");
    
    try {
      ev.preventDefault();
      const response = await updateDataById(serverUrl,
        data.id,
        data.cell,
        updateValue
      );
      if (!response)
        throw new Error("No response from axios at handleUpdateWord");
      window.alert("The update was successful");
      onSuccessfulUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleUpdate} className="form">
        {/* <h2>Update</h2> */}
        <h2>Enter your new value</h2>
        <input
          type="text | number"
          name="update"
          value={cell}
          // placeholder="enter your new value"
          onInput={(ev) => setUpdateValue((ev.target as HTMLInputElement).value)}
        ></input>
        <button type="submit">Update Now</button>
      </form>
    </div>
  );
};

export default UpdateWord;
