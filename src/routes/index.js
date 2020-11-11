
import Addresses from '../containers/Addresses';
import Assets from '../containers/Assets';
import ChainInfo from '../containers/ChainInfo';
import Dashboard from '../containers/Dashboard';
import Parameters from '../containers/Parameters';
import Peers from '../containers/Peers';
import Permissions from '../containers/Permissions';
import Streams from '../containers/Streams';
import StreamBrowser from '../containers/Streams/StreamBrowser';


const routes = [
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'streams',
    component: Streams
  },
  {
    path: 'assets',
    component: Assets
  },
  {
    path: 'peers',
    component: Peers
  },
  {
    path: 'parameters',
    component: Parameters
  },
  {
    path: 'permissions',
    component: Permissions
  },
  {
    path: 'addresses',
    component: Addresses
  },
  {
    path: 'chainInfo',
    component: ChainInfo
  },
  {
    path: 'streamBrowser',
    component: StreamBrowser
  },
]
export default routes;