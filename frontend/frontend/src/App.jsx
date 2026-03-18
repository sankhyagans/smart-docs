import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    alert("File uploaded!");
  };

  const searchDocs = async () => {
    const res = await fetch(
      `http://localhost:5000/search?q=${query}`
    );
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Docs</h1>

      <h2>Upload Document</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search documents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchDocs}>Search</button>

      <h2>Results</h2>
      {results.map((res, i) => (
        <p key={i}>{res}</p>
      ))}
    </div>
  );
}

export default App;