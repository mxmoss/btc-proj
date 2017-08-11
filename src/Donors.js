//This compnent is for loading a list of donors from json
//and then presenting
import React, {Component} from 'react';
//uncomment this line for a static donor list
//import donorlist from './donorlist.json';

//Controls the number of donors to return
function CountSelect(props){
  return (
    <label htmlFor='count'>Count
      <input style={{ width: '30%' }} className="form-control bfh-number" name="count" onChange={props.onChange} type="number" value={props.value}/>
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
  const sum = "$"+Math.round(props.donor.sum);
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
        url: '',
        sorted : 'asc',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    this.setState({sorted : (this.state.sorted === 'asc' ? 'desc' : 'asc')});
    this.refreshData();
  }

  handleChange(event) {
    alert('setting '+event.target.name+' to '+event.target.value);
    this.setState({[event.target.name]: event.target.value});
    this.refreshData();
  }

  refreshData() {
    this.setState({url: BASE_URL + this.state.mode + '/' + this.state.count+'/'});
    alert(this.state.url);
    fetch(this.state.url)
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
                <th data-field="sum"><a name="sorted" href="#amount" onClick={this.handleClick} value={this.state.sorted}>Amount</a></th>
            </tr></thead>
            <tbody>
              {this.state.data
                .sort((a, b) =>
                  this.state.sorted === 'asc' ?
                    a.sum - b.sum :
                    b.sum - a.sum
                ).map((donor) =>
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
