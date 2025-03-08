import React from 'react';
import StyleEditor from './styleEditor';
import Heart from './heart';
import HeartRain from './heartRain';

// Check if device is PC or mobile
const isPc = (() => {
  const userAgentInfo = navigator.userAgent;
  const mobileAgents = [
    "Android", "iPhone", "SymbianOS", 
    "Windows Phone", "iPad", "iPod"
  ];
  
  return !mobileAgents.some(agent => userAgentInfo.includes(agent));
})();

export default class App extends React.Component {
  fullStyle = [
    `/*
* Chào Cậu!
* Đã lâu rồi. Mình chưa nói với cậu về điều này!
* Tôi học rất dốt. 🥹
* Giống như trang web này. Đây chỉ là một trang web trống.
* Học IT chán vãi ò, mình muốn về quê nuôi cá và trồng cây xăng.
* À, cần phân biệt giữa điện thoại và máy tính.
* Bây giờ cậu đang sử dụng... ${isPc ? 'máy tính' : 'điện thoại'}
*/

/* Trước tiên, thêm hiệu ứng chuyển đổi cho tất cả các phần tử */
* {
  -webkit-transition: all .5s;
  transition: all .5s;
}

/* Nền trắng quá đơn điệu. Thêm chút màu sắc nào */
body, html {
  color: #fff;
  background-color: #1e3a5f;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Văn bản được định dạng đẹp hơn */
.styleEditor {
  overflow: auto;
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;` }
  border: 1px solid #3e5f8a;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  line-height: 1.6;
  padding: 15px;
  background-color: rgba(30, 58, 95, 0.8);
}

/* Màu sắc cho các phần tử code để dễ phân biệt */
.token.selector{ color: #98c379 }
.token.property{ color: #e5c07b }
.token.punctuation{ color: #f8e71c }
.token.function{ color: #56b6c2 }
.token.comment{ color: #a0a0a0 }

/* Thêm hiệu ứng 3D */
html{
  perspective: 1000px;
  -webkit-perspective: 1000px;
}

.styleEditor {
  ${ isPc ? `transform: rotateY(10deg) translateZ(-100px);
  -webkit-transform: rotateY(10deg) translateZ(-100px);` : `transform: rotateX(-10deg) translateZ(-100px);
  -webkit-transform: rotateX(-10deg) translateZ(-100px);` } ${ isPc ? '' : `
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;` }
}

/*
* ☺️☺️☺️
* Dùng code để vẽ một trái tim.
*/

/* Đầu tiên, tạo một khung vẽ */
.heartWrapper {
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;`}
  position: relative;
  border: 1px solid #3e5f8a;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background-color: white;
  ${ isPc ?
  `transform: rotateY(-10deg) translateZ(-100px);
  -webkit-transform: rotateY(-10deg) translateZ(-100px);` :
  `transform: rotateX(10deg) translateZ(-100px);
  -webkit-transform: rotateX(10deg) translateZ(-100px);`}${ isPc ? '' :`
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;`}
}

/* Vẽ một hình vuông, như tâm thất trái và phải */
.heart {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  border-radius: 20px;
  background: #ff5a79;
  transform: rotate(45deg);
  box-shadow: 0 2px 10px rgba(255, 90, 121, 0.5);
}

/* Vẽ tâm nhĩ trái */
.heart::before {
  content: '';
  background: #ff5a79;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  left: -38px;
  top: 1px;
}

/* Vẽ tâm nhĩ phải */
.heart::after {
  content: '';
  background: #ff5a79;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  right: -1px;
  top: -38px;
}

/* Quá tĩnh, hãy làm cho trái tim đập */
@keyframes throb {
  0% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.3) rotate(45deg);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.65) rotate(45deg);
    opacity: 0;
  }
}

.bounce {
  opacity: 0.2;
  animation: throb 1.2s infinite cubic-bezier(0.25, 0.1, 0.25, 1);
}

/*
* Xong rồi!
* Chúc cậu một ngày tràn đầy hạnh phúc!
*/
`
  ];

  state = {
    currentStyleCode: '',
    finished: false,
    heartRains: []
  };

  interval = 30; // Typing speed

  async progressiveShowStyle(n = 0) {
    const { interval, fullStyle } = this;
    
    const showStyle = i => new Promise((resolve) => {
      const style = fullStyle[n];
      const char = style[i];
      
      if (!style || !char) {
        resolve();
        return;
      }
      
      let { currentStyleCode } = this.state;
      currentStyleCode += char;
      
      this.setState({ currentStyleCode });
      
      if (char === '\n' && this.styleEditor) {
        this.styleEditor.toBottom();
      }
      
      setTimeout(() => {
        resolve(showStyle(i + 1));
      }, interval);
    });
    
    return showStyle(0);
  }

  async componentDidMount() {
    // Add Google Font for improved typography
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    await this.progressiveShowStyle(0);
    this.setState({ finished: true });
    this.rain();
  }

  saveStyleEditorRef = child => this.styleEditor = child;
  
  rain = () => {
    let { heartRains } = this.state;
    const rainNum = 30;
    const stayTime = rainNum * 200 + 5000; // Longer display time
    const time = (new Date()).getTime();
    
    if (!heartRains.length || (time - heartRains[heartRains.length - 1].time > (stayTime / 2))) {
      heartRains.push({ time, rainNum });
      this.setState({ heartRains });
      
      setTimeout(() => {
        this.removeRain(time);
      }, stayTime);
    }
  };

  removeRain(time) {
    let { heartRains } = this.state;
    heartRains = heartRains.filter(item => item.time !== time);
    this.setState({ heartRains });
  }

  render() {
    const { currentStyleCode, finished, heartRains } = this.state;
    
    return (
      <div className="app-container">
        <div style={{
          display: isPc ? 'flex' : '',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px'
        }}>
          <StyleEditor 
            ref={this.saveStyleEditorRef} 
            code={currentStyleCode}
          />
          <Heart click={finished ? this.rain : null} />
        </div>
        {heartRains.map(item => (
          <HeartRain num={item.rainNum} key={item.time} />
        ))}
      </div>
    );
  }
}
