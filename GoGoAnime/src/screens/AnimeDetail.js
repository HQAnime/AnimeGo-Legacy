import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator, EpisodeList } from '../component';
import AnimeDetailLoader from '../core/AnimeDetailLoader';

class AnimeDetail extends Component {

  constructor(props) {
    super(props);
    this.link = this.props.link;
    this.state = {
      data: '',
    }
  }

  componentWillMount() {
    this.loadInformation();
  }

  render() {
    if (this.state.data == '') {
      return <LoadingIndicator />
    } else {
      return <EpisodeList data={this.state.data}/>
    }
  }

  loadInformation = () => {
    let loader = new AnimeDetailLoader(this.link);
    loader.loadInformation()
    .then((animeInfo) => {
      if (animeInfo.length == 0) return;

      Actions.refresh({title: animeInfo.status})
      this.setState({
        data: animeInfo,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

export { AnimeDetail };