import { MajorLink } from '../../value';
import { Alert } from 'react-native';

export default class AnimeLoader {

  constructor(url, page) {
    this.url = url;
    this.page = page;
  }

  loadAnime() {
    return new Promise((success, failure) => {
      // Loading data here
      // console.log(this.url, this.page);
      fetch(this.url + this.page).then((html) => html.text()).then((htmlText) => {
        var HTMLParser = require('fast-html-parser');
        var root = HTMLParser.parse(htmlText).querySelector('.items');
        // Last page is reached
        if (root == null) success([]);

        var items = root.childNodes;
        // For search when no reult has been found
        if (items["0"].rawText.includes('Sorry')) {
          success([{name: this.url.replace(global.domain + MajorLink.Search, '').replace('&page=', ''), info: 'Google', link: 'Error'}, 1]);
        }

        var animeData = [];
        var entryCount = 0;        
        var length = items.length;
        // This is only for new release
        if (length == 0) success([]);

        // console.log(length, items);
        for (var i = 0; i < length; i++) {
          var anime = items[i];
          // Somehow, next line is parsed as well
          if (anime.isWhitespace) continue;
          // console.log(anime);
          var animeImage = anime.querySelector('.img');
          var animeLink = global.domain + animeImage.childNodes[1].attributes.href;
          var animeName = anime.querySelector('.name').text;
          // To keep original entry numbers
          entryCount++;
          if (global.hideDub && animeName.includes('(Dub)')) continue;
          // Only for NewRelease, it is displaying episode.
          var extraInformation = this.url.includes('recent-release') ? anime.querySelector('.episode').text : anime.querySelector('.released').removeWhitespace().text;
          if (extraInformation == '') extraInformation = '??';
          var animeThumbnail = animeImage.childNodes[1].childNodes[1].attributes.src;
          animeData.push({name: animeName, info: extraInformation, link: animeLink, thumbnail: animeThumbnail});
        }
        // console.log(entryCount);
        success([animeData, entryCount]);
      })
      .catch((error) => {
        // console.error(error);
        failure(error);
      });
    })
  }
}