(()=>{"use strict";const t=function(){function t(t,i,s,e,o){void 0===t&&(t=0),void 0===i&&(i=0),void 0===s&&(s=10),void 0===e&&(e=10),void 0===o&&(o="#0095DD"),this.x=t,this.y=i,this.width=s,this.height=e,this.color=o}return t.prototype.moveTo=function(t,i){this.x=t,this.y=i},t.prototype.moveBy=function(t,i){this.x+=t,this.y+=i},t.prototype.render=function(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()},t}();var i,s=(i=function(t,s){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])},i(t,s)},function(t,s){if("function"!=typeof s&&null!==s)throw new TypeError("Class extends value "+String(s)+" is not a constructor or null");function e(){this.constructor=t}i(t,s),t.prototype=null===s?Object.create(s):(e.prototype=s.prototype,new e)});const e=function(t){function i(i,s,e,o,h,r){void 0===i&&(i=0),void 0===s&&(s=0),void 0===e&&(e=2),void 0===o&&(o=-2),void 0===h&&(h=10),void 0===r&&(r="#0095DD");var n=t.call(this,i,s,2*h,2*h,r)||this;return n.dx=e,n.dy=o,n.radius=h,n.PI2=2*Math.PI,n}return s(i,t),i.prototype.render=function(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,this.PI2),t.fillStyle=this.color,t.fill(),t.closePath()},i.prototype.move=function(){this.moveBy(this.dx,this.dy)},i}(t);var o=function(){var t=function(i,s){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])},t(i,s)};return function(i,s){if("function"!=typeof s&&null!==s)throw new TypeError("Class extends value "+String(s)+" is not a constructor or null");function e(){this.constructor=i}t(i,s),i.prototype=null===s?Object.create(s):(e.prototype=s.prototype,new e)}}();const h=function(t){function i(i,s,e,o,h){var r=t.call(this,i,s,e,o,h)||this;return r.status=1,r}return o(i,t),i}(t),r=function(){function t(t){var i=t.cols,s=t.rows,e=t.width,o=t.height,h=t.padding,r=t.offsetLeft,n=t.offsetTop,l=t.color;this.cols=i,this.rows=s,this.bricks=[],this.width=e,this.height=o,this.padding=h,this.offsetLeft=r,this.offsetTop=n,this.color=l,this.init()}return t.prototype.init=function(){for(var t=0;t<this.cols;t+=1){this.bricks[t]=[];for(var i=0;i<this.rows;i+=1){var s=t*(this.width+this.padding)+this.offsetLeft,e=i*(this.height+this.padding)+this.offsetTop;this.bricks[t][i]=new h(s,e,this.width,this.height,this.color[t])}}},t.prototype.render=function(t){for(var i=0;i<this.cols;i+=1)for(var s=0;s<this.rows;s+=1){var e=this.bricks[i][s];1===e.status&&e.render(t)}},t}();var n=function(){var t=function(i,s){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])},t(i,s)};return function(i,s){if("function"!=typeof s&&null!==s)throw new TypeError("Class extends value "+String(s)+" is not a constructor or null");function e(){this.constructor=i}t(i,s),i.prototype=null===s?Object.create(s):(e.prototype=s.prototype,new e)}}();const l=function(t){function i(i,s,e,o,h){void 0===h&&(h="16px Arial");var r=t.call(this,s,e,0,0,o)||this;return r.text=i,r.value=0,r.font=h,r}return n(i,t),i.prototype.render=function(t){t.font=this.font,t.fillStyle=this.color,t.fillText("".concat(this.text,": ").concat(this.value),this.x,this.y)},i}(t);new(function(){function i(i){this.canvas=document.getElementById(i),this.ctx=this.canvas.getContext("2d"),this.ballRadius=10,this.paddleHeight=10,this.paddleWidth=75,this.brickRowCount=5,this.brickColumnCount=10,this.brickWidth=35,this.brickHeight=20,this.brickPadding=10,this.brickOffsetTop=30,this.brickOffsetLeft=20,this.paddleXStart=(this.canvas.width-this.paddleWidth)/2,this.paddleYStart=this.canvas.height-this.paddleHeight,this.objectColor="#0095DD",this.ballColor=this.objectColor,this.gameOverMessage="GAME OVER!",this.gameWinMessage="YOU WIN, CONGRATS!",this.brickColors=["#ed4040","#ed9640","#edd340","#94ed40","#40ed6e","#40edc8","#4091ed","#3d42d1","#9940ed","#ed40d3"],this.ball=new e(0,0,2,-2,this.ballRadius,this.ballColor),this.paddle=new t(this.paddleXStart,this.paddleYStart,this.paddleWidth,this.paddleHeight,this.objectColor),this.bricks=new r({cols:this.brickColumnCount,rows:this.brickRowCount,width:this.brickWidth,height:this.brickHeight,padding:this.brickPadding,offsetLeft:this.brickOffsetLeft,offsetTop:this.brickOffsetTop,color:this.brickColors}),this.scoreLabel=new l("Score",8,20,this.objectColor),this.livesLabel=new l("Lives",this.canvas.width-65,20,this.objectColor),this.rightPressed=!1,this.leftPressed=!1,this.setup(),this.draw()}return i.prototype.setup=function(){this.livesLabel.value=3,this.resetBallAndPaddle(),document.addEventListener("keydown",this.keyDownHandler.bind(this),!1),document.addEventListener("keyup",this.keyUpHandler.bind(this),!1),document.addEventListener("mousemove",this.mouseMoveHandler.bind(this),!1)},i.prototype.resetBallAndPaddle=function(){this.ball.x=this.canvas.width/2,this.ball.y=this.canvas.height-30,this.ball.dx=2,this.ball.dy=-2,this.paddle.x=this.paddleXStart},i.prototype.collisionDetection=function(){for(var t=0;t<this.bricks.cols;t+=1)for(var i=0;i<this.bricks.rows;i+=1){var s=this.bricks.bricks[t][i];1===s.status&&this.ball.x>s.x&&this.ball.x<s.x+this.brickWidth&&this.ball.y>s.y&&this.ball.y<s.y+this.brickHeight&&(this.ball.dy=-this.ball.dy,s.status=0,this.scoreLabel.value+=5-i,this.ball.color=this.getRandomColor(),this.scoreLabel.value===15*this.bricks.cols&&(alert(this.gameWinMessage),document.location.reload()))}},i.prototype.getRandomColor=function(){for(var t="#",i=0;i<6;i+=1)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t},i.prototype.movePaddle=function(){this.rightPressed&&this.paddle.x<this.canvas.width-this.paddle.width?this.paddle.moveBy(7,0):this.leftPressed&&this.paddle.x>0&&this.paddle.moveBy(-7,0)},i.prototype.collisionsWithCanvasAndPaddle=function(){(this.ball.x+this.ball.dx>this.canvas.width-this.ball.radius||this.ball.x+this.ball.dx<this.ball.radius)&&(this.ball.dx=-this.ball.dx),this.ball.y+this.ball.dy<this.ball.radius?this.ball.dy=-this.ball.dy:this.ball.y+this.ball.dy>this.canvas.height-this.ball.radius&&(this.ball.x>this.paddle.x&&this.ball.x<this.paddle.x+this.paddle.width?this.ball.dy=-this.ball.dy:(this.livesLabel.value-=1,this.livesLabel.value<1?(alert(this.gameOverMessage),this.ball.x=200,this.ball.y=200,document.location.reload()):this.resetBallAndPaddle()))},i.prototype.keyDownHandler=function(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!0:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!0)},i.prototype.keyUpHandler=function(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!1:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!1)},i.prototype.mouseMoveHandler=function(t){var i=t.clientX-this.canvas.offsetLeft;i>0&&i<this.canvas.width&&this.paddle.moveTo(i-this.paddle.width/2,this.paddleYStart)},i.prototype.draw=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ball.render(this.ctx),this.bricks.render(this.ctx),this.paddle.render(this.ctx),this.collisionDetection(),this.scoreLabel.render(this.ctx),this.livesLabel.render(this.ctx),this.ball.move(),this.movePaddle(),this.collisionsWithCanvasAndPaddle(),requestAnimationFrame(this.draw.bind(this))},i}())("myCanvas")})();