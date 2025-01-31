import Sidebar from "./components/Sidebar.jsx";
import "./App.css"
import Navbar from "./components/Navbar.jsx";
import Input from "./components/Input.jsx";
import RecommendationCard from "./components/RecommendationCard.jsx";

function App() {

  return (
    <>
      <div className="app-container flex">
        <Sidebar/>
        <div className="content-container w-full flex flex-col justify-between items-center">
          <Navbar/>
          <div className="content w-[720px] min-h-[250px]">
            <h1 className="text-neutral-300 text-4xl justify-self-center">Create Beautiful Notes</h1>
            <div className="flex gap-2 justify-center mt-10">
              <RecommendationCard text="From audio/video transcripts"/>
              <RecommendationCard text="From handwritten notes"/>
              <RecommendationCard text="From digital texts"/>
              <RecommendationCard text="From course material"/>
            </div>
          </div>
          <Input />
        </div>
      </div>

    </>
  );
}

export default App;