import React, { Component } from 'react';
import intl from 'react-intl-universal'
import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false
    }
  }
  render() {
    return (
      <div>
      	<div>{intl.get('login.username')}</div>
      	<div>{intl.get('editor.item.name')}</div>
      	<button onClick={this.handleLanguage.bind(this)}>EN/中</button>
      </div>
    );
  }
}

//生命周期
Object.assign(App.prototype, {
  componentDidMount() {
    let { location } = this.props
    let ps = this.parseQueryString(location.search)
    let currentLocale = ps.language || 'zh-CN'
    intl.init({
      currentLocale: currentLocale,
      commonLocaleDataUrls: {
        'zh': false,
        'en': false
      },
      locales: {
        [currentLocale]: require(`./locales/${currentLocale}`).default
      }
    }).then(() => {
      this.setState({ initDone: true })
    })
  },
  handleLanguage() {
    let { location } = this.props
    let ps = this.parseQueryString(location.search)
    if (ps.language === 'en-US') {
    	this.props.history.push('?language=zh-CN')
    } else if (ps.language === 'zh-CN') {
    	this.props.history.push('?language=en-US')
    } else {
    	this.props.history.push('?language=en-US')
    }
    
    window.location.reload()
  },
  parseQueryString(url) {
    var params = {};
    var arr = url.split("?");
    if (arr.length <= 1) {
      return params;
    }
    arr = arr[1].split("&");
    for (var i = 0, l = arr.length; i < l; i++) {
      var a = arr[i].split("=");
      params[a[0]] = a[1];
    }
    return params;
  }
})


export default withRouter(App);