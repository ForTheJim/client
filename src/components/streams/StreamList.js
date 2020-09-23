import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  // ONLY WANT THIS CALLED ONCe
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`streams/${stream.id}`}>{stream.title}</Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreateStream() {
    if (this.props.isSignedIn) {
      return (
        <Link to="streams/new" className="ui button primary">
          Create Stream
        </Link>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Stream List</h2>
        <div className="ui celled list">{this.renderList()}</div>
        <div className="right">{this.renderCreateStream()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

// const StreamList = () => {
//   return <div>Stream List</div>;
// };

// export default StreamList;

export default connect(mapStateToProps, { fetchStreams })(StreamList);
