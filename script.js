canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");
      ballRadius = 23;
      x = canvas.width/2;
      y = canvas.height-60;
      dx = 2;
      dy = -2;

      paddleHeight = 40;
      paddleWidth = 300;
      paddleX = (canvas.width-paddleWidth)/2;
      rightPressed = false;
      leftPressed = false;

      brickRowCount = 5;
      brickColumnCount = 3;
      brickWidth = 300;
      brickHeight = 60;
      brickPadding = 30;
      brickOffsetTop = 100;
      brickOffsetLeft = 145;

      score = 0;
      lives = 3;

      bricks = [];
      for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 };
       }
      }

      document.addEventListener("keydown", keyDownHandler, false);
      document.addEventListener("keyup", keyUpHandler, false);
      
      function keyDownHandler(e) {
          if(e.key == "Right" || e.key == "ArrowRight") {
              rightPressed = true;
          }
          else if(e.key == "Left" || e.key == "ArrowLeft") {
              leftPressed = true;
          }
      }
      function keyUpHandler(e) {
          if(e.key == "Right" || e.key == "ArrowRight") {
              rightPressed = false;
          }
          else if(e.key == "Left" || e.key == "ArrowLeft") {
              leftPressed = false;
          }
      }

      function collisionDetection() {
        for(c=0; c<brickColumnCount; c++) {
          for(r=0; r<brickRowCount; r++) {
            b = bricks[c][r];
            if(b.status == 1) {
              if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
                score++;
                if(score == brickRowCount*brickColumnCount) {
                  alert("YOU WIN, CONGRATS!");
                  document.location.reload();
                }
              }
            }
          }
        }
      }

      function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
      function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
      function drawBricks() {
        for(c=0; c<brickColumnCount; c++) {
          for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
              brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
              brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#0095DD";
              ctx.fill();
              ctx.closePath();
            }
          }
        }
      }
      function drawScore() {
      ctx.font = "25px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Score: "+score, 15, 30);
      }
      function drawLives() {
      ctx.font = "25px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Lives: "+lives, canvas.width -103, 30);
      }
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
          dx = -dx;
        }
        if(y + dy < ballRadius) {
          dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
          if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
          }
          else {
            lives--;
            if(!lives) {
              alert("GAME OVER");
              document.location.reload();
            }
            else {
              x = canvas.width/2;
              y = canvas.height-30;
              dx = 3;
              dy = -3;
              paddleX = (canvas.width-paddleWidth)/2;
            }
          }
        }
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
          paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
          paddleX -= 7;
        }
        x += dx;
        y += dy;
      }

      interval = setInterval(draw, 4.5);

      // Kodu parcarala ayir mumkunse fonksiyonlarin her biri tek bir is yapsin. 
      // Degiskenleri yeniden isimlendir eger gerikoyorsa 
      // Event listener mantigina tekrar bak.
      // Callback lere bak.