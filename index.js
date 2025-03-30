// Debug logs
console.log('Script loaded!');
console.log('React version:', React.version);

// Your App component
function App() {
    return (
        <div className="app">
            <h1>Welcome to Spiritual Journey</h1>
            <p>Your path to inner peace begins here.</p>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
