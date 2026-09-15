import Nav from "./components/common/nav/Nav";
import Footer from "./components/common/footer/Footer";
import Landing  from "./components/landing/Landing";
import RaceInfoHeader from "./components/common/RaceInfoHeader/RaceInfoHeader";
import RaceInfoMain from "./components/common/RaceInfoMain/RaceInfoMain";

// functions that return JSX are React Components
// These work a lot like HTML; they have parents and children
// files including them must have .tsx extension
function App() {
  // App is a parent of Nav, Landing, and Footer
  return (
    // only one tag can be returned (in this case, a simple wrapper tag)
    <>
      <Nav />
      <Landing />
      <Footer />
      <RaceInfoHeader/>
      <RaceInfoMain/>
    </>
  );
};

// export component for use in main.tsx
export default App;
