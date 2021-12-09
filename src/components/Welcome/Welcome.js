import './Welcome.css';

const Welcome = () => {
    return (
        <div className="welcome">
            <div className="welcome-title">
                <h1>Hi. This is Lists.</h1>
                <p>Create, share and use different checklists.</p>
            </div>
            <div className="welcome-buttons">
                <a href="/">View all lists</a>
            </div>
        </div>
    );
};

export default Welcome;