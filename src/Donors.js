//This compnent is for loading a list of donors from json
//and then presenting
import React, {Component} from 'react';
import donorlist from './donorlist.json';

function DonorItem(props) {
  return <li>{props.donor.contributor_payee} - {props.donor.sum}</li>;
}

function DonorList(props) {
  const donors = props.donors;
  return (
    <ul>
      {donors.map((donor) =>
        <DonorItem key={donor.contributor_payee.toString()}
                  donor={donor} />
      )}
    </ul>
  );
}

function DonorJSON() {
  const donorURL = 'http://54.213.83.132/hackoregon/http/oregon_individual_contributors/5/';
  var apiRequest1 = fetch(donorURL).then(function(response){
      return response.json()
  });
}


class MyDonors extends Component {
  constructor(props) {
    super(props);
    this.state = {curDonorList : DonorJSON()};
//    this.state = {curDonorList : donorlist};
  }
  render() {
    return (
        <div>
          <DonorList donors={this.state.curDonorList} />
        </div>
)}
}

export default MyDonors;
