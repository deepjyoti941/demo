import React, { Component } from 'react';
import axios from 'axios';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Message from '../../components/Message/Message';
import { Player } from 'video-react';
import * as styles from './Reader.css';

class Reader extends Component {
  state = {
    messages: null,
    loading: true,
    showVideo: false,
    envelopeOpen: false,
    envelopeClose: false
  };

  componentDidMount() {
    axios
      .get('http://52.32.34.54:8080/message')
      .then(res => {
        this.setState({ loading: false, messages: res.data });
      })
      .catch(err => {
        console.log('something went wrong.....', err);
      });

    setTimeout(() => {
      this.setState({
        showVideo: true
      });
    }, 5000);
  }

  onClickEnvelope = () => {
    const { envelopeOpen } = this.state;

    if (envelopeOpen) {
      this.setState({
        envelopeOpen: false,
        envelopeClose: true
      });
      setTimeout(() => {
        this.setState({
          envelopeClose: false
        });
      }, 600);
      return;
    }

    this.setState({
      envelopeOpen: true,
      envelopeClose: false
    });
  };

  onClickLetterClose = () => {
    this.setState({
      envelopeOpen: false,
      envelopeClose: true
    });

    setTimeout(() => {
      this.setState({
        envelopeClose: false
      });
    }, 600);
  };

  render() {
    const { envelopeOpen, envelopeClose } = this.state;
    const letterBoxStyle = [styles['letter']];
    const envelopeStyle = [styles['envelope'], styles['bounch-envelope']];

    // if (messages) {
    //   envelopeStyle.push(styles['bounch-envelope']);
    // }

    if (envelopeOpen) {
      letterBoxStyle.push(styles['letter--open']);
    }

    if (envelopeClose) {
      letterBoxStyle.push(styles['letter--close']);
    }

    return (
      <div className={styles['message-box']}>
        <div style={{ flex: 1 }}>
          <div className={letterBoxStyle.join(' ')}>
            <div
              className={envelopeStyle.join(' ')}
              onClick={this.onClickEnvelope}
            >
              <div className={styles['envelope-flap']} />
              <div className={styles['envelope-paper']} />
              <div className={styles['envelope-detail']} />
            </div>
            <div className={styles['paper']}>
              <div className={styles['paper-content']}>
                <div
                  className={styles['paper-close']}
                  onClick={this.onClickLetterClose}
                >
                  x
                </div>
                Hey Y'all,Have a good day! Chris
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {this.state.showVideo ? (
            <Player
              playsInline
              autoPlay={true}
              poster="/assets/poster.png"
              src="http://52.32.34.54:8081/0wrIRgCm.mp4"
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Reader;
