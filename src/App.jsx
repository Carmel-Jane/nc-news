import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Home from "./components/Home"
import SingleArticle from "./components/SingleArticle";
import Comments from "./components/Comments";

function App() {
  return (
    <>
      <Header/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path={`/articles/:articleId`} element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;