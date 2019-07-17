import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";

import styles from "./MainNav.module.css";
import NavItems from "../../components/NavItems/NavItems";
// import DropDown from "../../components/UI/Dropdown/DropDown";
import * as actions from "../../store/actions/index";

class MainNav extends Component {
  state = {
    username: "",
    stats: [
      { value: "0", displayValue: "Filter by Status" },
      { value: "1", displayValue: "Idea" },
      { value: "2", displayValue: "Research" },
      { value: "3", displayValue: "In-Progress" },
      { value: "4", displayValue: "Revision" },
      { value: "5", displayValue: "Finished" },
      { value: "6", displayValue: "Submitted" },
      { value: "7", displayValue: "Accepted" }
    ]
  };

  // i need a way to handle the getting of types ONLY if they're authorized, and if not, I need
  // the component to RE-RENDER once they're authorized!
  componentDidMount() {
    this.props.getProjectTypes();
    // this.setState({
    //   username: this.props.name
    // });
  }

  // componentDidUpdate(prevProps) {
  //   this.props.getProjectTypes();
  //   // if(this.props.types !== prevProps.types){
  //   //   console.log(this.props)
  //   // }
  // }

  typeChangeHandler() {}

  statusChangeHandler() {}

  render() {
    let typesArray = this.props.types.map(type => {
      return (
        <option key={type.id} value={type.id}>
          {type.typename}
        </option>
      );
    });

    let statsArray = this.state.stats.map(status => {
      return (
        <option key={status.value} value={status.value}>
          {status.displayValue}
        </option>
      );
    });

    return (
      <header className={styles.MainNav}>
        <section className={styles.NavTop}>
          <div className={styles.Welcome}>Hi, {this.props.name}</div>
          <div className={styles.Welcome}>Welcome</div>
          <nav className={styles.deskTopOnly}>
            <NavItems
              isAuth={this.props.isAuth}
              statuses={statsArray}
              types={typesArray}
            />
          </nav>
        </section>
        <section className={styles.NavBottom}>
          <div className={styles.MainNavLogo} />
        </section>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    authorized: state.auth.authorized,
    loading: state.auth.loading,
    name: state.auth.firstname,
    types: state.type.types,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectTypes: () => dispatch(actions.getProjectTypes())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav);

// possible alternative for getting redux props!? idk...
//https://stackoverflow.com/questions/46564941/react-redux-how-to-dispatch-an-action-on-componentdidmount-when-using-mapdispa?rq=1

//     componentDidMount() {
//         // no need to use dispatch again. Your action creators are already bound by
//         // mapDispatchToProps.  Notice also that they come from props
//         const { selectedCategory, fetchCategoriesIfNeeded, fetchPostsIfNeeded } = this.props;
//         fetchCategoriesIfNeeded(selectedCategory);
//         fetchPostsIfNeeded(selectedCategory);
//     }
//     //... the same
// }

//     function mapStateToProps(state) {
//           //... the same
//     }

//     function mapDispatchToProps(dispatch) {
//           // when arguments match, you can pass configuration object, which will
//           // wrap your actions creators with dispatch automatically.
//           return {
//               orderPost,
//               fetchCategoriesIfNeeded,
//               fetchPostsIfNeeded,
//           }
//       }
