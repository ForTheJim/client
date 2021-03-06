// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { signIn, signOut } from "../actions";

// const GoogleAuth = () => {
//   const [userSignIn, setUserSignIn] = useState(null);
//   const [userAuth, setUserAuth] = useState(null);

//   useEffect(() => {
//     window.gapi.load("client:auth2", () => {
//       window.gapi.client
//         .init({
//           clientId:
//             "1081516323836-8tgqap90l1asbptufl6sh6p94db3nf9k.apps.googleusercontent.com",
//           scope: "email",
//         })
//         .then(() => {
//           console.log("INSIDE THE THEN");
//           const auth = window.gapi.auth2.getAuthInstance();
//           setUserAuth(auth);
//           setUserSignIn(auth.isSignedIn.get());
//           // auth.isSignedIn.listen(setUserSignIn(auth.isSignedIn.get()));
//         });
//     });
//     return () => {
//       //   cleanup;
//     };
//   }, []);

//   const renderAuthButton = () => {
//     if (userSignIn === null) {
//       return null;
//     } else if (userSignIn) {
//       return (
//         <button
//           className="ui red google button"
//           onClick={() => userAuth.signOut()}>
//           <i className="google icon"></i>Sign Out
//         </button>
//       );
//     } else {
//       return (
//         <button
//           className="ui red google button"
//           onClick={() => userAuth.signIn()}>
//           <i className="google icon"></i>Sign In With Google
//         </button>
//       );
//     }
//   };
//   return <h1>{renderAuthButton()}</h1>;
// };

// export default connect(null, { signIn, signOut })(GoogleAuth);

import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    let gapiKey;

    if (process.env.NODE_ENV !== "production") {
      gapiKey = process.env.REACT_APP_GAPI_KEY;
    } else {
      gapiKey = process.env.GAPI_KEY;
    }

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: gapiKey,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
