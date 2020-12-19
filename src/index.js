import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { 
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Login } from "./Containers";
import { Container } from "./Components/index.js";
import routes from "./Routes";
import store from "./Store";
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/login'><Login/></Route>
        <Container>
          <Suspense fallback={
            <div>loading</div>
          }>
            { 
              routes.map(
                (item, index) => <Route 
                  extra={item.extra} 
                  path={item.path} 
                  key={index} 
                  render={
                    props => {
                      if(item.children) {
                        return <div>
                          <item.component props={props}/>
                          <Switch>
                            {
                              item.children.map((child,i) => <Route
                                key={i}
                                path={child.path}
                                extra={child.extra}
                                component={child.component}
                              />)
                            }
                          </Switch>
                        </div>
                      }else{
                        return <item.component props={props}/>
                      }
                    }
                  }
                />
              ) 
            }
          </Suspense>
        </Container>
      </Switch>
    </Router>
  </Provider>, 
  document.getElementById('app')
);
