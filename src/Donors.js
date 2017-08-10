//This compnent is for loading a list of donors from json
//and then presenting
import React, {Component} from 'react';
//uncomment this line for a static donor list
//import donorlist from './donorlist.json';

//Controls the number of donors to return
function CountSelect(props){
  return (
    <label htmlFor='count'>Count&nbsp;
      <input style={{ width: '25%' }} class="form-control bfh-number" name="count" onChange={props.onChange} type="number" value={props.value}/>
    </label>
  )
}

//Controls the type donors to return
function ModeSelect(props){
  return (
    <label htmlFor='mode'>Mode
      <select name="mode" onChange={props.onChange} value={props.value}> //"oregon_individual_contributors">
    	<option value="oregon_individual_contributors">Individual</option>
    	<option value="oregon_business_contributors">Corporate</option>
    	<option value="oregon_committee_contributors">Committee</option>
    	<option value="all_documentation">All</option>
      </select>
    </label>
  )
}

//Donor table details
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

const BASE_URL = 'http://54.213.83.132/hackoregon/http/';

class MyDonors extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mode: 'oregon_individual_contributors',
        //or oregon_business_contributors, oregon_committee_contributors, all_documentation
        count: 5,
        data: [],
        url: ''
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
    this.refreshData();
  }

  donorURL(){
    return BASE_URL + this.state.mode + '/' + this.state.count+'/'
  }

  refreshData() {
    fetch( this.donorURL() )
      .then( (response) => {
        return response.json()
      })
      .then( (json) => {
        this.setState({data: json})
      })
      .catch( (error) => {
        console.log(error)
      })
    }

  componentDidMount() {
    this.refreshData();
  }


  render() {
    return (
      <div className="container"  style={{ width: '50%' }} >
        <div className="table-responsive">
          <div className='form-group' >
          <CountSelect onChange={this.handleChange} value={this.state.count} />
          <ModeSelect  onChange={this.handleChange} value={this.state.mode} />
          </div>
          <table className="table table-striped table-hover table-bordered table-condensed">
            <thead><tr>
                <th data-field="name">Top Individual Donors</th>
                <th data-field="sum">Amount</th>
            </tr></thead>
            <tbody>
              {this.state.data.map((donor) =>
                <DonorItem key={donor.contributor_payee.toString()}
                        donor={donor} />
              )}
            </tbody>
          </table>
        </div>
      </div>
)}
}

export default MyDonors;
