
import Addresses from '../containers/sections/Addresses';
import Assets from '../containers/sections/Assets';
import ChainInfo from '../containers/sections/ChainInfo';
import Dashboard from '../containers/sections/Dashboard';
import Parameters from '../containers/sections/Parameters';
import Peers from '../containers/sections/Peers';
import Permissions from '../containers/sections/Permissions';
import Streams from '../containers/sections/Streams'


export default [
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/streams',
    component: Streams
  },
  {
    path: '/assets',
    component: Assets
  },
  {
    path: '/peers',
    component: Peers
  },
  {
    path: '/parameters',
    component: Parameters
  },
  {
    path: '/permissions',
    component: Permissions
  },
  {
    path: '/addresses',
    component: Addresses
  },
  {
    path: '/chainInfo',
    component: ChainInfo
  },
]
