//This compnent is for loading a list of donors from json
//and then presenting
import React, {Component} from 'react';
import donorlist from './donorlist.json';

function DonorItem(props) {
  const contributor_payee = props.donor.contributor_payee;
  const sum = "$"+Math.round(props.donor.sum * 1000) / 1000;
  return(
    <p><a href="#" class="list-group-item">
       {contributor_payee}&nbsp;&nbsp;-&nbsp;&nbsp;${props.donor.sum}
       </a>
    </p>

  )
}

function DonorList(props) {
  const donors = props.donors;
  console.log(donors);
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">
          Top Individual Donors
        </h3>
      </div>
      <div className="panel-body">
        <ul className="list-group">
          {donors.map((donor) =>
            <DonorItem key={donor.contributor_payee.toString()}
                    donor={donor} />
          )}
        </ul>
      </div>
      <div className="panel-footer">
         Footer
      </div>
    </div>
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
    fetch(donorURL) //, {mode: 'cors'})
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
