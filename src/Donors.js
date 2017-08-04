//This compnent is for loading a list of donors from json
//and then presenting
import React, {Component} from 'react';
//uncomment this line for a static donor list
//import donorlist from './donorlist.json';

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

function DonorList(props) {
  const donors = props.donors;
  console.log(donors);
  return (
    <div className="table-responsive">
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
  }

  donorURL(){
    const donorURL = 'http://54.213.83.132/hackoregon/http/'+this.state.mode+'/'+this.state.count+'/';
    return donorURL;
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
        <DonorList donors={this.state.data} />
      </div>
)}
}

export default MyDonors;
