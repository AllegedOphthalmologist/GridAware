var React = require('react');

//Dispatcher
var Dispatcher = require('./../dispatcher/Dispatcher');

//Actions
var ActionTypes = require('./../constants/Constants').ActionTypes;
var ViewAction = require('../actions/ViewActions');

// Routing
var Router = require('react-router');
var Nav = Router.Navigation;


//mui theme
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;

//dialog boxes
var instructions = require('./instructionView.jsx');

// Stores -- Load here so Stores can begin listening to Events
var menuStore = require('./../stores/MenuItemStore');

var NavMenu = React.createClass({
  getInitialState: function() {
    return {
      menuItems: menuStore.getActiveItems()
    };
  },

  mixins: [Nav],

  changeMenuItems: function(){
    this.setState({menuItems: menuStore.getActiveItems()});
  },

  componentDidMount: function(){
    menuStore.addChangeListener(this.changeMenuItems);
    
    var context = this;
    this.token = Dispatcher.register(function (dispatch) {
      var action = dispatch.action;
      if (action.type === ActionTypes.TOGGLE_NAV_MENU) {
        context.toggleNav();
      } 
      // Un-disable menu items requiring login when the user logs in
      else if(action.type === ActionTypes.USER_LOGIN){
        // console.log("NavMenu detected user login");
        var menuItems = context.state.menuItems;
        for(var i = 0; i < menuItems.length; i++){
          if(menuItems[i].reqLogin){
            menuItems[i].disabled = false;
          }
        }
        context.setState({menuItems: menuItems});
      }
    });
  },

  componentWillUnmount: function(){
    menuStore.removeChangeListener(this.changeMenuItems);
    Dispatcher.unregister(this.token);
  },

  toggleNav: function(){
    this.refs.leftNav.toggle();
  },

  handleMenuSelect: function(e, selectedIndex, menuItem){
    if(menuItem.text === 'Get Started'){
      this.transitionTo('instructions');
    }else if(menuItem.text === 'Home'){
      this.transitionTo('/');
    }else{
      ViewAction.loadModal(menuItem.route);
    }
  },

  render: function(){
    return(
      <LeftNav ref="leftNav" docked={false} menuItems={this.state.menuItems} onChange={this.handleMenuSelect}/>
    );
  }
});

module.exports = NavMenu;
