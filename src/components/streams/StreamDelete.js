import React, { useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

const StreamDelete = (props) => {
  const actions = (
    <>
      <button
        onClick={() => props.deleteStream(props.match.params.id)}
        className="ui negative button">
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );

  useEffect(() => {
    // Your code here
    props.fetchStream(props.match.params.id);
  }, []);

  function getContent() {
    console.log(props);
    if (!props.stream) {
      return "Hello, Sir!";
    }
    return `Are you sure you want to delete the stream with title: ${props.stream.title}`;
  }

  return (
    <div>
      <Modal
        onDismiss={() => history.push("/")}
        title="Delete Stream"
        content={getContent()}
        actions={actions}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
