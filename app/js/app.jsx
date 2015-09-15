var React = require('react');

// Material UI
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// Routing
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

// Dispatcher
var Dispatcher = require('./dispatcher/Dispatcher');

//mui theme
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var RaisedButton = mui.RaisedButton;

// Components
var NavMenu = require('./components/NavMenu.jsx');
var instructions = require('./components/instructionView.jsx');
var AboutUs = require('./components/AboutUs.jsx');

// Stores -- Load here so Stores can begin listening to Events
var DataStore = require('./stores/DataStore');

// Actions
var ViewActions = require('./actions/ViewActions');
var ActionTypes = require('./constants/Constants').ActionTypes;

var App = React.createClass({ 
  mixins: [Router.Navigation, Router.State],

  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentWillMount: function(){ 
    //Set color palette
    var appPalette = { 
      primary1Color: '#58C1BE',
      primary2Color: '#227889',
      primary3Color: '#94D9BB',
      accent1Color: '#FFDE55',
      accent2Color: '#F6BB42',
      textColor: '#212121',
      canvasColor: '#FFFFFF',
      borderColor: '#B6B6B6'
    };
    ThemeManager.setPalette(appPalette);
  },

  toggleNav: function(){
    ViewActions.toggleNavMenu();
  },

  render: function(){
    return (
      <div className="app-container">
      
        <span className="nav-btn">
          <RaisedButton onClick={this.toggleNav}>Menu</RaisedButton>
        </span>
        <NavMenu></NavMenu>
      <div className="content-container">
        <RouteHandler />
      </div>
      
      </div>

    );
  }
});


var routes = (
  <Route name="app" path="/" handler={App}>
  <Route name="instructions" path="/instructions" handler={instructions} />
  <DefaultRoute name="default" handler={AboutUs} />
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.getElementById('AppView'));
});