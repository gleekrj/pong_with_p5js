//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let corBolinha = '#9966ff';

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let corRaquete = '#ffa84d'

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;
let corPlacar = '#ffa84d';

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  fill(color(corBolinha));
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  fill(color(corRaquete));
  rect(x, y, raqueteComprimento, raqueteAltura)
}

function mostraRaqueteOponente(){
  fill(color(corRaqueteOponente));
  rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  
      // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaquete = constrain(yRaquete, 0, 310);
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){

  //Oponente CPU
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
  
  yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
  
  
  
  //Oponente Humano
  /*
    if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
  */
      // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
  
}

function calculaChanceDeErrar(){
    if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  textAlign(CENTER);
  textSize(16);
  fill(color(corPlacar));
  stroke(255);
  rect(150, 10, 40, 20, 5);
  noStroke();
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(corPlacar));
  stroke(255);
  rect(450, 10, 40, 20, 5);
  noStroke();
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos++;
    ponto.play();
  }
  
  if (xBolinha < 10){
    pontosDoOponente++;
    ponto.play();
  }
}