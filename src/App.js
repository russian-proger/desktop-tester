import React from 'react';
import ReactDOM from 'react-dom/client';

import MUI from '@mui/material';

// Components
import View from './components/View';

// Views
import Main from './views/Main';
import Test from './views/Test';
import Result from './views/Result';

const Views = [
    ["main", Main],
    ["test", Test],
    ["result", Result]
];

function App() {
    const [settings, setSettings] = React.useState({
        fontSize: '16pt', 
    });

    const [view, setView] = React.useState({
        name: "main",
        props: {}
    });

    const OnSetView = (viewName, props) => {
        setView({ ...view,
            name: viewName,
            props
        });
    }

    return Views.map(([name, Component]) => (
        <View key={name} active={view.name == name}>
            <Component {...view.props}
                onSetView={OnSetView}
            />
        </View>
    ));
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);