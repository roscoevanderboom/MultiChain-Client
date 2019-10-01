import React from 'react';
import { withSnackbar } from 'notistack';
import { ipcRenderer } from 'electron';


// Constants
import Feedback from '../constants/Feedback';

// Containers
import Windowbar from './WindowBar';
import Topnav from './Topnav';
import SectionTabs from './SectionTabs';

// Modals
import CreateChain from './Modals/create-chains/CreateChain';
import ConnectRemoteChain from './Modals/connect-remote-node/ConnectRemoteChain';

// Components


class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      // Connect to Multichain
      multichain: false,
      localChains: [],
      activeChain: false,
      modals: {
        CreateChain: false,
        ConnectRemoteChain: false
      }
    };
    // Global functions to open modal or give feedback
    this.snackFeedback = this.snackFeedback.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // Multichain functions
    this.setActiveChain = this.setActiveChain.bind(this);
    this.setMultiChain = this.setMultiChain.bind(this);
  }

  render() {
    // Props for child elements
    const props = {
      state: this.state,
      functions: {
        // Error / success feedback
        feedback: this.snackFeedback,
        openModal: this.openModal,
        closeModal: this.closeModal,
        //  Chain data functions
        setActiveChain: this.setActiveChain,
        setMultiChain: this.setMultiChain,
      }
    }

    return (
      <React.Fragment>
        <Windowbar props={props} />
        <Topnav props={props} />
        <SectionTabs props={props} />
        <CreateChain props={props} />
        <ConnectRemoteChain props={props} />
      </React.Fragment>
    );
  }

  setActiveChain(chain) {
    this.setState({
      activeChain: chain
    })
  }
  setMultiChain(creds) {
    this.setState({
      multichain: require("multichain-node")(creds)
    });
    this.state.multichain.getInfo((err, info) => {
      if (err) {
        this.setActiveChain("Could not connect. Make sure chain is running");
        return;
      }
      this.setActiveChain(info.chainname);
    })
  }
  componentWillMount() {
    // Get local chains
    ipcRenderer.on('localChains', (e, chains) => {
      this.setState({
        localChains: chains
      });
    });
  }

  // Async functions to load once component has been mounted
  componentDidMount() {

  }

  // User feedback once data has changed
  componentDidUpdate() {

  }

  // DOM element functions
  openModal(modal) {
    this.setState({
      modals: {
        [modal]: true,
      }
    })
  }

  closeModal(modal) {
    this.setState({
      modals: {
        [modal]: false,
      }
    })
  }

  snackFeedback(varient, message) {
    switch (varient) {
      case 'success':
        Feedback.success(this.props.enqueueSnackbar, message)
        break;
      case 'error':
        Feedback.error(this.props.enqueueSnackbar, message)
        break;
      case 'addToIPFS':
        Feedback.addToIPFS(this.props.enqueueSnackbar, message)
        break;
      default:
        Feedback.comingSoon(this.props.enqueueSnackbar, message)
        break;
    }
  }

}

export default (withSnackbar(Root))

