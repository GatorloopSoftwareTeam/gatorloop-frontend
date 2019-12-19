import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './pages/Signup'
import AppContext from './context/AppContext'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

class App extends Component
{
  state = {
    redirect : null
  }

  render()
  {
    let redirect
    let page = this

    if (this.state.redirect != null)
      redirect = <Redirect to={this.state.redirect} />

    return (
      <Router>
        <AppContext.Provider value={{
          redirect : (url) => page.setState({redirect: url})
        }}>
          {redirect}
          <Switch>
            <Route exact path="/" component={SignUp} />
            <Route path="*">
              <p>404 Not Found</p>
            </Route>
          </Switch>
        </AppContext.Provider>
      </Router>
    );
  }
}

export default App;
