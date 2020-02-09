import React from 'react';

// Componentes
import Levels from '../components/Levels';

function Home(props) {
    return(
        <Levels userLevels={props.userLevels} levels={props.levels} />
    );
}

export default Home;