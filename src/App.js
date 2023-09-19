import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    // Fetch user's repositories when userData changes
    if (userData) {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      };

      fetch(userData.repos_url, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error fetching repositories");
          }
        })
        .then((data) => {
          setRepos(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userData, githubToken]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      };

      const response = await fetch(
        `https://api.github.com/users/${username}`,
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error);
      setUserData(null);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Profile Viewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {userData && (
        <div className="user-info">
          <img src={userData.avatar_url} alt={userData.name} />
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            Visit GitHub Profile
          </a>
        </div>
      )}
      {repos.length > 0 && (
        <div className="user-repos">
          <h2>Repositories</h2>
          <div className="repo-cards">
            {repos.map((repo) => (
              <div className="repo-card" key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{repo.name}</h3>
                </a>
                <p>{repo.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
