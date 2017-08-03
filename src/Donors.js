//This compnent is for loading a list of donors from json
//and then presenting
import React, {Component} from 'react';
import donorlist from './donorlist.json';

function DonorItem(props) {
  return <li>{props.donor.contributor_payee} - {props.donor.sum}</li>;
}

function DonorList(props) {
  const donors = props.donors;
  console.log(donors);
  return (
    <ul>
      {donors.map((donor) =>
        <DonorItem key={donor.contributor_payee.toString()}
                  donor={donor} />
      )}
    </ul>
  );
}


class MyDonors extends Component {
  constructor(props) {
    super(props);
    //    this.state = {curDonorList : donorlist};
    this.state = {
        data: []
    };
  }

  componentDidMount() {
    const donorURL = 'http://54.213.83.132/hackoregon/http/oregon_individual_contributors/7/';
    fetch(donorURL, {mode: 'cors'})
      .then( (response) => {
        return response.json() })
      .then( (json) => {
        this.setState({data: json});
    });
  }


  render() {
    return (
        <div>
          <DonorList donors={this.state.data} />
        </div>
)}
}

export default MyDonors;
