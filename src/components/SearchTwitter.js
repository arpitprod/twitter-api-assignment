import React from 'react';
import apiCaller from '../utils/apiCaller';
import {
  Card, CardImg, CardText, CardBody, Form, FormGroup, Input,
  CardTitle, CardSubtitle, Button, Row, Col, Media
} from 'reactstrap';
import LazyLoad from 'react-lazyload';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			data: {},
			reload: true
		}
	}

	componentDidMount() {
		this.callApi();
	}

	callApi = (endPoint = 'adobe') => {
		this.props.history.push(`/key=${endPoint}`);
		this.setState({
			reload: true
		});
		apiCaller(endPoint)
		.then(data => {
			console.log('data - ', data);
			this.setState({
				data: data.statuses,
				reload: false,
				timeLimit: 30
			}, this.clock);
		})
	}

	clock = () => {
		this.intervalID = setInterval(() => {
			this.setState({timeLimit: this.state.timeLimit - 1});
		}, 1000);
		this.timeoutID = setTimeout(() => {
			this.callApiFunc();
			this.setState({timeLimit: 30});
		}, 30000);
	}

	callApiFunc = () => {
		clearInterval(this.intervalID);
		clearInterval(this.timeoutID);
		this.setState({timeLimit: 30});
		const { searchValue } = this.state;
		if (searchValue !== '') {
			this.callApi(searchValue);
		} else {
			this.callApi();
		}
	}

	handleSearchSubmit = (e) => {
		e.preventDefault();
		this.callApiFunc();
	}

	render() {
		const { reload, searchValue, data, timeLimit } = this.state;
		return (
			<>
				<Row>
					<Col sm="12">
						<div className='searchTwitter'>
							Search @ Twitter
							<div className='rightSide'>
								Auto refresh in {timeLimit} seconds
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Card body>
						<Col sm={{ size: 8, offset: 2 }}>
							<Form onSubmit={this.handleSearchSubmit}>
								<FormGroup>
									<Row>
										<Col sm="10">
											<Input
												type="text" name="search" id="search"
												value={searchValue}
												onChange={(e) => this.setState({searchValue: e.target.value})}
											/>{' '}
										</Col>
										<Col sm="2">
											<Button color="primary">Search</Button>
										</Col>
									</Row>
								</FormGroup>
							</Form>
						</Col>
					</Card>
				</Row>
				<Row>
					{!reload ?
					data.length > 0 ?
						<Col sm="12">
							<Row>
								{data.map((obj, i) => (
									<Col sm="12" lg="6">
										<Card body key={i} className='shadow mb-3'>
											<Media>
												<LazyLoad height={200}>
													<Media left>
														<Media object src={obj.user.profile_image_url} alt="Profile Pic" className='profilePic' />
													</Media>
												</LazyLoad>
												<LazyLoad height={100} offset={100}>
													<Media body>
														<Media heading>
															{`${obj.user.name}`}
															<span className='tweetLocation'>
																{` @${obj.user.screen_name} ${obj.user.created_at}`}
															</span>
														</Media>
														{obj.user.description}
													</Media>
												</LazyLoad>
											</Media>
										</Card>
									</Col>
								))}
							</Row>
						</Col>
						:
						<Col sm="12">
							<Card>
								<Row>
									<Col sm={{ size: 4, offset: 3 }}>
										No Data
									</Col>
								</Row>
							</Card>
						</Col>
					:
					<Col sm={{ offset: 5 }}>
						<span>
							<i className="fa fa-refresh fa-spin fa-3x fa-fw reloadIcon" aria-hidden="true"></i>
						</span>
					</Col>
					}
				</Row>
			</>
		);
	}
}

export default App;
