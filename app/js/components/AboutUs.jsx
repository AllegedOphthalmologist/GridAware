var React = require('react');
var Donuts = require('./donutChart.js');

//material-ui
var mui = require('material-ui');

//Stores
var DataStore = require('./../stores/DataStore');
var modalStore = require('./../stores/modalStore');
var BulbStore = require('./../stores/BulbStore');

//Dispatcher
var Dispatcher = require('./../dispatcher/Dispatcher');

//Child Views
var BulbView = require('./bulbView.jsx');
var GraphView = require('./EnergyGraphView.jsx');

//Actions
var ViewActions = require('./../actions/ViewActions');
var ActionTypes = require('./../constants/Constants').ActionTypes;

//Constants
var GraphTypes = require('./../constants/Constants').GraphTypes;


var AboutUs = React.createClass({ 
  getInitialState: function(){ 
    return {
      data: {
        "Watt": [{}]
      },
      bulbData: null, 
      gridState: null
    };
  },

  loadData: function(){ 
    this.setState({data: DataStore.getData()});
    this.setState({bulbData: BulbStore.getData()});
    console.log(this.state.data.Watt)
  },

  gridState: function(){ 
    this.setState({bulbData: BulbStore.getData()});

    if(this.state.bulbData >= 0.75){ 
      this.setState({gridState: 'dirty'});

    } else if(0.75 > this.state.bulbData && this.state.bulbData >= 0.5){ 
      this.setState({gridState: 'mostly-dirty'});

    } else if (0.5 > this.state.bulbData && this.state.bulbData > 0.25){ 
      this.setState({gridState: 'mostly-clean'});

    } else if (0.25 >= this.state.bulbData){ 
      this.setState({gridState: 'clean'});
    }

  },
  componentWillMount: function(){
    DataStore.addChangeListener(this.loadData);
    BulbStore.addChangeListener(this.gridState);
  },
  
  componentDidMount: function(){ 
    var context = this;
    this.token = Dispatcher.register(function (dispatch) {
      var action = dispatch.action;
      if (action.type === ActionTypes.WATT_LOADED) {
        context.makeGraphs();
      } 
    });
  }, 

  componentDidUpdate: function(){ 
    window.addEventListener('resize', this.reSizeGraphs);
  },

  componentWillUnmount: function(){ 
    window.removeEventListener('resize', this.reSizeGraphs);
    DataStore.removeChangeListener(this.loadData);
    BulbStore.removeChangeListener(this.gridState);
    Dispatcher.unregister(this.token);
  },

  reSizeGraphs: function(){ 
    Donuts.removeGraph('donut1');
    Donuts.removeGraph('donut2');

    this.makeGraphs();
  },

  makeGraphs: function(){ 
    Donuts.create('.donuts', this.state.data.Watt[0].genmix.slice(1, 4), 'donut1');
      Donuts.subtitle('donut1','breakdownSub', 'Renewable resources breakdown');
    Donuts.create('.donuts', this.state.data.Watt[0].genmix, 'donut2');
      Donuts.subtitle('donut2','totalSub','Resources currently powering the grid');
  },

  handleRegister: function(){
    ViewActions.loadModal(register);
  },


  render: function(){ 
    var donuts = 'donuts';
    return ( 
      <div className="frontPage"> 

      <header className="image-bg-fluid-height" id='home'>
        <BulbView name={"bulbContainer2"} SVGname={"bulb2"} height={400} width={400} margin={5} cx={75} cy={75} r={75} />
        <div id='cali'>California's power grid is currently <span id='gridstate'>{this.state.gridState}.</span></div>
      </header>

      <section id='about' className='pad-section'>
        <div className='container'>
          <div className="row">
            <div className='col-lg-12'>
              <h1 className="section-heading">GridAware</h1>
              <p className='lead section-lead' id='powernotcreated'> All power is not created equal. </p>
            <hr></hr>
            </div>
          </div>
        </div>
      </section>

      <section id='cont1'>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">

                      <div className={donuts} style={{'maxWidth':'600px', 'margin': 'auto','paddingLeft':'23px', 'position':'relative'}}>
                      </div>

                      <p className='lead section-lead' id='tagline'>
                          Energy generation resources change over the course of every day.
                          Keep track of how clean the grid is at a glance with GridAware.
                      </p>
                    
                </div>
            </div>
        </div>
      </section>
    

    <section id="leaf">
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <span className='glyphicon glyphicon-leaf'></span>
          </div>
        </div>
      </div>
    </section>

    <div id='information' className='pad-section'>
      <section id='cont2'> 
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                  <h2>How Does The Grid Work!?</h2>

                  <p className="section-paragraph">Each day, the mix of energy generation resources changes as demand fluctuates and renewbles go on and offline. 
                  The grid operator must efficiently balance power generation and consumer electricity demand, 
                  using renewable resources whenever possible. Periods of high demand and low availability of renewable resources translate to more pollution 
                  per unit of energy consumed. Check out the graph below to see how changing grid conditions affect carbon production (lbs) per megawatt hour (Mwh)</p>

          <GraphView height={300} width={800} margin={10} value={GraphTypes.MAIN} />  
              </div>
            </div>
        </div>
      </section>

      <section id="bolt">
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <span className='glyphicon glyphicon-flash'></span>
          </div>
        </div>
      </div>
    </section>

      <section id="photos">
        <div className='container'>
           <h2>Meet the Team</h2>
           <div className="row text-center" id='photoRow'>
            <div className="col-md-3">
               <img src="images/john.jpg" className="img-circle img-responsive img-center"/>
              <h4 className="lead section-lead creator-name">John Andersen</h4>
               <p className="creator-title">Project Owner/Front-End Engineer</p>
               <a href="https://github.com/johndrkurtcom"><img className='githubIcon' src="images/GitHub-Mark-32px.png" alt=""/></a>
             </div>

             <div className="col-md-3">
               <img src="images/kate.jpg" className="img-circle img-responsive img-center"/>
              <h4 className="lead section-lead creator-name">Kate Cobb</h4>
               <p className="creator-title">Scrum Master/Full-Stack Developer</p>
               <a href="https://github.com/kateecobb"><img className='githubIcon' src="images/GitHub-Mark-32px.png" alt=""/></a>
             </div>

             <div className="col-md-3">
               <img src="images/drew.jpg" className="img-circle img-responsive img-center"/>
              <h4 className="lead section-lead creator-name">Andrew Weber</h4>
               <p className="creator-title">Lead Hardware Engineer/Full-Stack Developer</p>
               <a href="https://github.com/andrewrweber"><img className='githubIcon' src="images/GitHub-Mark-32px.png" alt=""/></a>
             </div>

             <div className="col-md-3">
               <img src="images/xing.jpg" className="img-circle img-responsive img-center"/>
              <h4 className="lead section-lead creator-name">Xing Tong</h4>
               <p className="creator-title">Front-End Developer</p>
               <a href="https://github.com/halcyonnx"><img className='githubIcon' src="images/GitHub-Mark-32px.png" alt=""/></a>
             </div>
           
          </div>
        </div>
      </section>
    </div>
  </div>
    );

  }


});

module.exports = AboutUs;

