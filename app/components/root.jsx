import React, { Component, PropTypes } from 'react';
import { logout, resetNetwork }  from '../actions';
import { connect } from 'react-redux';

class Root extends Component {

   render() {
      const { appState } = this.props;
      //const { } = appState.toJS();

      return (
         <div id="page_content_holder">
            <div id="main_sidebar">
               <div className="widget menu_sub_pages">
                  <h2>{lang.nav.title}</h2>
                  <Nav authenticated={authenticated} onLogOut={this.onLogOut} />
               </div>
               <div class="sidebar_divider"></div>
            </div>
            <div id="page_content">
               {this.props.children}
            </div>
         </div>
      );
   }
}

Root.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState} = reduxState;

   return {
      appState
   };
}

export default connect(propProvider)(Root);