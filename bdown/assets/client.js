
function Result(props){
  return (
		<li className="list-group-item">
      <h3>{props.name}</h3>
			<p><strong>Q1:</strong> {props.q1val}	<strong>Q2:</strong> {props.q2val}  <strong>Q3:</strong> {props.q3val}  <strong>Q4:</strong> {props.q4val}  <strong>Q5:</strong> {props.q5val}</p>
		</li>
	);
}

function ResultList(props) {
	return (
		<ul className="list-group">
      {props.results.map(Result)}
		</ul>
	);
}

function SurveyForm(props) {

	var surveyDict = {
		q1val: '',
		q2val: '',
		q3val: '',
		q4val: '',
		q5val: ''
	}

	const submit = () => {
		const nameInput = document.querySelector('#name');

		// alert(nameInput.value + "\nQ1 Value:" + surveyDict.q1val +
		// 												"\nQ2 Value:" + surveyDict.q2val +
		// 												"\nQ3 Value:" + surveyDict.q3val +
		// 												"\nQ4 Value:" + surveyDict.q4val +
		// 												"\nQ5 Value:" + surveyDict.q5val)


		props.onAddResult({
			name: nameInput.value,
			q1val: surveyDict.q1val,
			q2val: surveyDict.q2val,
			q3val: surveyDict.q3val,
			q4val: surveyDict.q4val,
			q5val: surveyDict.q5val,
		});

		nameInput.value = "";
	}

	const handleChange = () => {

    if(event.target.name == "q1val") {
      surveyDict.q1val = event.target.value;
    } else if(event.target.name == "q2val"){
			surveyDict.q2val = event.target.value;
    } else if(event.target.name == "q3val"){
			surveyDict.q3val = event.target.value;
    } else if(event.target.name == "q4val"){
			surveyDict.q4val = event.target.value;
    } else if(event.target.name == "q5val"){
			surveyDict.q5val = event.target.value;
    }
	}

	return (
		<div>
			<h1>The Greatest Survey Ever</h1>
			<form>

			<input id="name" placeholder="Name" />

				<h2>Question 1</h2>
				<input id="q1" type="radio" value="0" name="q1val" onChange={handleChange}/> 0
				<input id="q1" type="radio" value="1" name="q1val" onChange={handleChange}/> 1
				<input id="q1" type="radio" value="2" name="q1val" onChange={handleChange}/> 2
				<input id="q1" type="radio" value="3" name="q1val" onChange={handleChange}/> 3

				<h2>Question 2</h2>
				<input id="q2" type="radio" value="0" name="q2val" onChange={handleChange}/> 0
				<input id="q2" type="radio" value="1" name="q2val" onChange={handleChange}/> 1
				<input id="q2" type="radio" value="2" name="q2val" onChange={handleChange}/> 2
				<input id="q2" type="radio" value="3" name="q2val" onChange={handleChange}/> 3

				<h2>Question 3</h2>
				<input id="q3" type="radio" value="0" name="q3val" onChange={handleChange}/> 0
				<input id="q3" type="radio" value="1" name="q3val" onChange={handleChange}/> 1
				<input id="q3" type="radio" value="2" name="q3val" onChange={handleChange}/> 2
				<input id="q3" type="radio" value="3" name="q3val" onChange={handleChange}/> 3

				<h2>Question 4</h2>
				<input id="q4" type="radio" value="0" name="q4val" onChange={handleChange}/> 0
				<input id="q4" type="radio" value="1" name="q4val" onChange={handleChange}/> 1
				<input id="q4" type="radio" value="2" name="q4val" onChange={handleChange}/> 2
				<input id="q4" type="radio" value="3" name="q4val" onChange={handleChange}/> 3

				<h2>Question 5</h2>
				<input id="q5" type="radio" value="0" name="q5val" onChange={handleChange}/> 0
				<input id="q5" type="radio" value="1" name="q5val" onChange={handleChange}/> 1
				<input id="q5" type="radio" value="2" name="q5val" onChange={handleChange}/> 2
				<input id="q5" type="radio" value="3" name="q5val" onChange={handleChange}/> 3

				<button type="button" onClick={submit}>
					Submit Survey
				</button>

			</form>
		</div>
	);


}



class App extends React.Component {
  constructor() {
		super();

		this.state = {
			results: [],
		};
	}

	componentWillMount() {
		fetch('/surveys')
			.then(res => res.json())
			.then(data => {
				this.setState({  results: data });
			})
	}

	handleAddResult(newResult) {
		fetch('/surveys', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newResult)
		})
		.then(res => res.json())
		.then(result => {
			this.setState({
				results: this.state.results.concat(result)
			});
		});
	}

	render() {
		return (
			<div>
				<ResultList results={this.state.results} />
				<SurveyForm onAddResult={this.handleAddResult.bind(this)}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('example')
);
