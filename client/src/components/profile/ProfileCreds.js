import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>
          {exp.company}
          <p>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
            {exp.to === null ? (
              " present"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position:</strong>
            {exp.title}
          </p>
          <p>
            {exp.location === "" ? null : (
              <span>
                <strong>Location:</strong>
                {exp.location}
              </span>
            )}
          </p>
          <p>
            {exp.description === "" ? null : (
              <span>
                <strong>Description:</strong>
                {exp.description}
              </span>
            )}
          </p>
        </h4>
      </li>
    ));
    const eduItems = education.map(edu => (
      <li key="edu._id" className="list-group-item">
        <h4>
          {edu.school}
          <p>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
            {edu.to === null ? (
              " present"
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree:</strong>
            {edu.degree}
          </p>
          <p>
            <strong>Field of study:</strong>
            {edu.fieldofstudy}
          </p>
          <p>
            {edu.description === "" ? null : (
              <span>
                <strong>Description:</strong>
                {edu.description}
              </span>
            )}
          </p>
        </h4>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience:</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education:</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}
export default ProfileCreds;