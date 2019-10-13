import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { HistoryProvider } from './context/history';

// Pages
import SearchTwitter from './components/SearchTwitter';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class App extends React.Component {

	render() {
		return (
			<HistoryProvider value={{history}}>
				<Router history={history}>
					<Switch>
						<Route exact path="/twitter-api-assignment/key=:searchValue" component={SearchTwitter} />
						<Redirect exact from="/twitter-api-assignment" to="/twitter-api-assignment/key=adobe" />
					</Switch>
				</Router>
			</HistoryProvider>
		);
	}
}

export default App;
