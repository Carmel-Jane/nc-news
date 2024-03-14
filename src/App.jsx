import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home"
import SingleArticle from "./components/SingleArticle";
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import Topics from "./components/Topics";
import SingleTopic from "./components/SingleTopic";
import Articles from "./components/Articles"

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });
  return (
    <>
<UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Header/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path={`/articles/:articleId`} element={<SingleArticle />} />
        <Route path="/topics" element={<Topics/>} />
        <Route path={`/topics/:slug`} element={<SingleTopic />} />
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;