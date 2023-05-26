/*
  If you don't know what this is. You shouldn't be here.
*/
import Router from './Router';

function App() {
  // Classname here is where we are setting the background for the whole app. Custome in tailwind.config.css
  return (
    <div className="App bg-background_dark">
      <Router />
    </div>
  );
}

export default App;
