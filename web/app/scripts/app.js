import ReactDOM from 'react-dom';
import Routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(Routes, document.getElementById('elepantry'));
