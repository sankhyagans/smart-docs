import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setUploadMessage(data.message);
      setFile(null);
    } catch {
      setUploadMessage("Upload failed. Try again.");
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await fetch(`http://localhost:5000/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults(["Search failed. Try again."]);
    }
  };

  return (
    <div className="app">
      <h1>Smart Docs</h1>

      <div className="card upload-card">
        <h2>Upload Document</h2>
        <div className="upload-inputs">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={!file}>
            Upload
          </button>
        </div>
        {uploadMessage && <p className="message">{uploadMessage}</p>}
      </div>

      <div className="card search-card">
        <h2>Search Documents</h2>
        <div className="search-inputs">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search term..."
          />
          <button onClick={handleSearch} disabled={!query}>
            Search
          </button>
        </div>
        <div className="results">
          {results.length > 0 ? (
            results.map((res, idx) => (
              <div key={idx} className="result-item">
                {res}
              </div>
            ))
          ) : (
            <p className="no-results">No results yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;