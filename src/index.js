import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { auth, provider } from "./firebase";
import "./index.css";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // check if a user is logged in
        auth().onAuthStateChanged(user => {
            if(user) {
                // if a user is currently logged in, store them in state
                setUser(user);
            }
        })
    }, [])

    const logoutUser = async () => {
        await auth().signOut();
        window.location = "/";
    }

    return(
        <Router>
            <div className="app">
                <nav className="main-nav">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <a href = "#!" onClick={ logoutUser }>Logout</a>
                </nav>
                <Switch>
                    <Route path="/" exact component= { Home } />
                    <Route path="/login" exact component= { Login } />
                    <Route path="/register" exact component= { Register } />
                    <Route component= { NoMatch } />
                </Switch>
            </div>
        </Router>
    );
}

const NoMatch = () => 
    "No space baes here :(";

ReactDOM.render(<App />, document.getElementById("root"));