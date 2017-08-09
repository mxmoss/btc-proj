//This compnent is for loading a list of donors from json
//and then presenting
import React, {Component} from 'react';
//uncomment this line for a static donor list
//import donorlist from './donorlist.json';

function CountSelect(props){
  return (
    <div>Result Count:
      <input class="form-control bfh-number" name="count" onChange={props.onChange} type="number" value={props.value}/>
    </div>
  )
}

function ModeSelect(props){
  return (
    <div>Mode:
      <select name="mode" onChange={props.onChange} value={props.value}> //"oregon_individual_contributors">
    	<option value="oregon_individual_contributors">Individual</option>
    	<option value="oregon_business_contributors">Corporate</option>
    	<option value="oregon_committee_contributors">Committee</option>
    	<option value="all_documentation">All</option>
      </select>
    </div>
  )
}

function DonorItem(props) {
  const contributor_payee = props.donor.contributor_payee;
  const sum = "$"+Math.round(props.donor.sum * 1000) / 1000;
  return(
    <tr>
      <td>{contributor_payee}</td>
      <td>{sum}</td>
    </tr>

  )
}

function ControlForm(props){
  const onChange = props.onChange;
  const count = props.count;
  const mode = props.mode;
  return(
    <form>
    <CountSelect onChange={onChange} value={count} />
    <ModeSelect  onChange={onChange} value={mode} />
    </form>
  )
}

function DonorList(props) {
  const donors = props.donors;
  const count = props.count;
  const mode = props.mode;
  const onChange = props.onChange;
  return (
    <div className="table-responsive">
      <ControlForm onChange={onChange} count={count} mode={mode}/>
      State: {count}&nbsp;&nbsp;&nbsp;Mode: {mode}&nbsp;&nbsp;&nbsp;URL: <donorURL />
      <table className="table table-striped table-hover table-bordered table-condensed">
        <thead><tr>
            <th data-field="name">Top Individual Donors</th>
            <th data-field="sum">Amount</th>
        </tr></thead>
        <tbody>
          {donors.map((donor) =>
            <DonorItem key={donor.contributor_payee.toString()}
                    donor={donor} />
          )}
        </tbody>
      </table>
    </div>
  );
}

class MyDonors extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mode: 'oregon_individual_contributors',
        //or oregon_business_contributors, oregon_committee_contributors, all_documentation
        count: 5,
        data: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    switch (event.target.name){
      case 'count': {
        this.setState({count: event.target.value});
        break;
      }
      case 'mode': {
        this.setState({mode: event.target.value});
        break;
      }
    }
  }

  donorURL(){
    return 'http://54.213.83.132/hackoregon/http/'+this.state.mode+'/'+this.state.count+'/';
  }

  componentDidMount() {
    fetch(this.donorURL(), {mode: 'cors'})
      .then( (response) => {
        return response.json() })
      .then( (json) => {
        this.setState({data: json});
    });
  }

  render() {
    return (
      <div className="container">
        <DonorList
          donors={this.state.data}
          onChange={this.handleChange}
          count={this.state.count}
          mode={this.state.mode}
           />
      </div>
)}
}

export default MyDonors;
