import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { HistoryProvider } from './context/history';

// Pages
import SearchTwitter from './components/SearchTwitter';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class App extends React.Component {

	render() {
		return (
			<HistoryProvider value={{history}}>
				<Router history={history} basename={process.env.PUBLIC_URL}>
					<Switch>
						<Route exact path="/key=:searchValue" component={SearchTwitter} />
						<Redirect exact from="/" to="/key=adobe" />
					</Switch>
				</Router>
			</HistoryProvider>
		);
	}
}

export default App;
