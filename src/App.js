import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="logo">
            <a href="/">LISTS</a>
            A SoftUni React Project
        </div>
        <nav>
            <a href="/">All lists</a>
            <a href="/">Login</a>
            <a href="/">Register</a>
        </nav>
    </header>
    <div className="content">
        <div className="welcome">
            <div className="welcome-title">
                <h1>Hi. This is Lists.</h1>
                <p>Create, share and use different checklists.</p>
            </div>
            <div className="welcome-buttons">
                <a href="/">View all lists</a>
            </div>
        </div>
    </div>
    <footer>© Lists. All rights reserved!</footer>
    </div>
  );
}

export default App;
