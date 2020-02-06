import React from 'react';

// Componentes
import ListTeams from '../components/ListTeams';
import Levels from '../components/Levels';

function Home(props) {
    return(
        // <ListTeams userLevels={props.userLevels} levels={props.levels} />
        <Levels userLevels={props.userLevels} levels={props.levels} />
    );
}

export default Home;