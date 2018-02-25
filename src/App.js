import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from './tree';

class App extends Component {

    callRecursive(ds){
        for(let i in ds){
            console.log('emp_name',ds[i].emp_name);
            console.log('team_name',ds[i].team_info.team_name);
                if(Object.keys(ds[i].team_info.teams).length){
                    this.callRecursive(ds[i].team_info.teams)
                    
                }
            
        }
    }
    render() {
    // this.callRecursive(ds);
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <div className="App-intro">
                {
                    Object.values(Tree).map((el,i)=>{
                        return (
                            <SmallTeam
                                key={`${el.emp_name}-${i}`} 
                                name={el.emp_name}
                                designation={el.role}
                                team={el.team_info}
                                showChildren={el.showChildren}
                                callFromChild={()=>{
                                    console.log('call from child',el);
                                }}
                            />
                        );
                    })
                }
            </div>
          </div>
        );
    }
}

class SmallTeam extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            team: props.team
        }
    }

    render(){
        let {name,designation,showChildren} = this.props;
        let {team} = this.state;
        console.log(name,team,showChildren);
        if(!team.team_status)
            return (
                <div>Disabled</div>
            )
        return (
            <div className="team-cnt">
                <div>
                    Team Name: {team.team_name}
                </div>
                <div>
                    Name: {name}
                </div>
                <div>
                    Designation: {designation}
                </div>
                <div>
                    {Object.keys(team.teams).length ? 
                        <div onClick={()=>{
                            console.log(name,team);
                            this.props.callFromChild();
                        }}>
                            {showChildren ?
                                '-' : '+'
                            }
                        </div>
                        : null
                    }
                </div>
                
                    {
                        Object.keys(team.teams).length && 
                            showChildren ?
                            <div style={{display:'flex'}}>
                                {
                                    Object.values(team.teams).map((el,i)=>{
                                        return (
                                            <SmallTeam
                                                key={`${el.emp_name}-${i}`} 
                                                name={el.emp_name}
                                                designation={el.role}
                                                team={el.team_info}
                                                showChildren={el.showChildren}
                                                callFromChild={()=>{
                                                    console.log('call from inner child',el);
                                                    this.props.callFromChild();
                                                }}
                                            />
                                        );
                                    })
                                }
                            </div>
                            :null
                    }
                

            </div>
        );
    }
}

export default App;
