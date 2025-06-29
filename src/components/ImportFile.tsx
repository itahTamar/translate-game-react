import React, { useContext, useState } from "react";
import { ServerContext } from "../context/ServerUrlContext";
import { importUserWord } from "../api/wordApi";

interface ImportWordProps {
  onImportSuccess: () => void;
  onCloseDropdown: () => void;
}

const ImportWords: React.FC<ImportWordProps> = ({ onImportSuccess, onCloseDropdown }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const serverUrl = useContext(ServerContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setMessage(""); // Clear previous messages
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    // Validate file type
    const validTypes = ['.csv', '.xlsx'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!validTypes.includes(fileExtension)) {
      setMessage("Please select a CSV or Excel file");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear previous messages

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await importUserWord(serverUrl, formData);
      setMessage(response);

      if (response) {
        // Close dropdown
        onCloseDropdown();

        // Refresh words table
        onImportSuccess();
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Import Words from CSV</h2>
      <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message && <p style={{color: message.includes('success') ? 'green' : 'red'}}>{message}</p>}
    </div>
  );
};

export default ImportWords;
