/*
Referente às querys, ela são basicamente uma forma de "puxar" os elementos html, seja por id ou classe, representadas por algum texto
como por exemplo ponto (.) representando uma classe ou hash tag (#) representando IDs
*/

//Player 1
const $buttonStonePlayer1 = document.querySelector(".button-move-stone-1"); /*ponto (.) é referente a classe*/
const $buttonPaperPlayer1 = document.querySelector(".button-move-paper-1");
const $buttonScissorPlayer1 = document.querySelector(".button-move-scissor-1");
const $printScore1 = document.querySelector(".score-1");

//Player 2
const $buttonStonePlayer2 = document.querySelector(".button-move-stone-2"); /*ponto (.) é referente a classe*/
const $buttonPaperPlayer2 = document.querySelector(".button-move-paper-2");
const $buttonScissorPlayer2 = document.querySelector(".button-move-scissor-2");
const $printScore2 = document.querySelector(".score-2");

//Caixas de ação
const $moveBox1 = document.querySelector("#move-box-1"); /*hash tag (#) é referente a ID*/
const $moveBox2 = document.querySelector("#move-box-2");

//Imprimir Vencedor da partida
const $winnerTitle = document.querySelector(".winner-title");

//Botões de controle do jogo
const $buttonStartGame = document.querySelector(".button-start-game");
const $buttonGameReset = document.querySelector(".button-game-reset");

/*let são variaveis que podem mudar de valor, ou seja, seus valores não são constantes*/ 
let movePlayer1 = ''; //As variaveis sempre devem ter algum valor atribido ao serem criadas,  um '' já evita uma falta de atribuição 
let movePlayer2 = '';
let player1Score = 0;
let player2Score = 0;
let winner = 0;
let startButton = false; //Variavel do tipo booleano (verdadeiro ou falso)

function setWinner()
{
    /*No caso abaixo, se as uma das duas variaveis movePlayer forem iguais a zero, o código, não irá
    executar, evitando emitir o alert programado abaixo.
    
    referente ao && (AND/E) ele define que algo é verdadeiro se as duas condicionais forem 
    verdadeiras. Se umas dela for falsa, então toda a condicional será falsa também.

    Referente ao || (OR/OU) ele define que algo é verdadeiro se uma das condicionais forem verdadeiras.
    Se todas forem falsas, então o valor será também obviamente falso. 
    */
    if(movePlayer1 == '' || movePlayer2 == '') 
    {
        return;
    }
    if(movePlayer1 == 'stone' && movePlayer2 == 'paper')
    {
        winner = 2;  
    }
    else if(movePlayer1 == 'stone' && movePlayer2 == 'scissor')
    {
        winner = 1;
    }
    else if(movePlayer1 == 'paper' && movePlayer2 == 'stone')
    {
        winner = 1
    }
    else if(movePlayer1 == 'paper' && movePlayer2 == 'scissor')
    {
        winner = 2;
    }
    else if(movePlayer1 == 'scissor' && movePlayer2 == 'stone')
    {
        winner = 2;
    }
    else if(movePlayer1 == 'scissor' && movePlayer2 == 'paper')
    {
        winner = 1;
    }
    else if(movePlayer1 == movePlayer2)
    {
        winner =3;
    }
}

/*A função abaixo serve para exibir um 0 string após o valor do número antes dele enquanto o número for 
menor que 10. se ele for igual ou maior que 10, ele irá parar de imprimir os valores*/
function showPadStart(number)
{
    return number < 10? '0' + number.toString() : number.toString();
}

/*Referente aos nomes de funções, garantir que os nomes das atribuidos às funções sejam proporcionais
às suas funções propriamente dita, ou seja, se houver outra função que precisamos fazer, então devemos 
criar outra função para especifica para esta tarefa, como abaixo, a função 'addWinnerScore' tendo a função
somente de adicionar os pontos e a função 'printPlayerScore' tendo a função de imprimir os pontos no
DOM (nosso documento HTML). 
*/
function addWinnerScore()
{
     if(winner == 1)
     {
        player1Score++;
     }
     else if(winner == 2)
     {
        player2Score++; //Ou player2Score = player2Score + 1;  
     }
}
function resetWinnerScore()
{
    player1Score = 0;
    player2Score = 0;
}
function printPlayerScore()
{
    $printScore1.innerHTML = showPadStart(player1Score);
    $printScore2.innerHTML = showPadStart(player2Score);
    /*Podemos utilizar outra função para fazer esse mesmo processo, já implementada no javascript
    chamada padStart(). Ela só é utilizada para imprimir caracteres até que um valor numerico ultrapasse
    o limite delimitado por ela, como por exemplo.
    
    player1score.toString().padStart(2, '0');
    O primeiro parametro diz o limite de caracteres que ele deve parar de imprimir. O segundo parametro 
    indica qual caractere deve ser impresso caso ainda cumpra os requisitos. Se chegarmos ao numero 10, por
    exmplo, ele para de imprimir, pois o limite para fazer a impressão são dois caracteres. 
    */
}

function printWinnerName()
{
    if(winner == 0)
    {
        $winnerTitle.innerHTML = "Esperando jogada...";
    }
    else if(winner == 1)
    {
        $winnerTitle.innerHTML = "Jogador 1 ganhou!";
    }
    else if(winner == 2)
    {
        $winnerTitle.innerHTML = "Jogador 2 ganhou!";
    }
    else if(winner == 3)
    {
        $winnerTitle.innerHTML = "Deu marmelada!";
    }
}
function printStartGame()
{
    $winnerTitle.innerHTML = "Clique em iniciar";
}
/*Se essa função aplicada sem uma regra para executar, ela irá resetar elemento indiscriminadamente,
resetando o elemento antes de sequer ser exibido ao usuário*/ 
function resetBattlefield() 
{
    $moveBox1.innerHTML = '';
    $moveBox2.innerHTML = '';
}

function resetMoveVariables()
{
    movePlayer1 = '';
    movePlayer2 = '';
}

function resetPrintPlayerScore()
{
    $printScore1.innerHTML = "00";
    $printScore2.innerHTML = "00";
}

function resetAll()
{
    winner = 0;
    resetBattlefield();
    resetMoveVariables();
    resetPrintPlayerScore();
    printStartGame();
    resetWinnerScore();
    startButton = false;
    $buttonStartGame.textContent = "Iniciar";
    $buttonStartGame.classList.remove('started');
}

//P1
function handleStone1Move()
{
    if(startButton == false) return; // Quando temos uma única condicional, podemos simplesmente faze-la em uma linha, já que seu oposto nada fará.

    $moveBox1.innerHTML = "<img src='images/icons/stone.png' title='Ícone de pedra' alt='ícone de pedra'>";
    movePlayer1 = 'stone';
    setWinner();
    addWinnerScore();
    printPlayerScore();
    printWinnerName();
    if(winner != 0)
    {
        /*setTimeout() define um tempo especifico para executar uma função.
        seu primeiro parametro é a função, e o segundo parametro é o tempo desejado para executa-la.
        A medida é feita em milissegundos, ou seja, 1000 milissegundos é o equivalente a 1 segundo, 
        como por exemplo:

        setTimeout(função(), tempoParaExecutar);
        */
        setTimeout(resetBattlefield, 1000);
        resetMoveVariables();
        winner = 0;
    }
}
function handlePaper1Move()
{
    if(startButton == false) return;
    $moveBox1.innerHTML = "<img src='images/icons/paper.png' title='Ícone de papel' alt='ícone de papel'>";
    movePlayer1 = 'paper';
    setWinner();
    addWinnerScore();
    printPlayerScore();
    printWinnerName();
    if(winner != 0)
    {
        setTimeout(resetBattlefield, 1000);
        resetMoveVariables();
        winner = 0;
    }
    
}
function handleScissor1Move()
{
    if(startButton == false) return;
    $moveBox1.innerHTML = "<img src='images/icons/scissors.png' title='Ícone de tesoura' alt='ícone de tesoura'>";
    movePlayer1 = 'scissor';
    setWinner();
    addWinnerScore();
    printPlayerScore();
    printWinnerName();
    if(winner != 0)
    {
        setTimeout(resetBattlefield, 1000);
        resetMoveVariables();
        winner = 0;
    }
}

//P2
function handleStone2Move()
{
    if(startButton == false) return;
    $moveBox2.innerHTML = "<img src='images/icons/stone.png' title='Ícone de pedra' alt='ícone de pedra'>";
    movePlayer2 = 'stone';
    setWinner();
    addWinnerScore();
    printPlayerScore();
    printWinnerName();
    if(winner != 0)
    {
        setTimeout(resetBattlefield, 1000);
        resetMoveVariables();
        winner = 0;
    }
}
function handlePaper2Move()
{
    if(startButton == false) return;
    $moveBox2.innerHTML = "<img src='images/icons/paper.png' title='Ícone de papel' alt='ícone de papel'>";
    movePlayer2 = 'paper';
    setWinner();
    addWinnerScore();
    printPlayerScore();
    printWinnerName();
    if(winner != 0)
    {
        setTimeout(resetBattlefield, 1000);
        resetMoveVariables();
        winner = 0;
    }
}
function handleScissor2Move()
{
    if(startButton == false) return;
    $moveBox2.innerHTML = "<img src='images/icons/scissors.png' title='Ícone de tesoura' alt='ícone de tesoura'>";
    movePlayer2 = 'scissor';
    setWinner();
    addWinnerScore();
    printPlayerScore();
    printWinnerName();
    if(winner != 0)
    {
        setTimeout(resetBattlefield, 1000);
        resetMoveVariables();
        winner = 0;
    }
}

function handleToggleGame()
{
    if(startButton == true)
    {
        startButton = false;
        $buttonStartGame.textContent = "Iniciar"; //Modifica o texto de um elemento no documento
        $buttonStartGame.classList.remove('started')
    }
    else
    {
        startButton = true;
        $buttonStartGame.textContent = "Parar";
        $buttonStartGame.classList.add('started');
        $winnerTitle
    }
}

function handleGameReset()
{
    resetAll();
}

//P1
$buttonStonePlayer1.addEventListener("click", handleStone1Move);
$buttonPaperPlayer1.addEventListener("click", handlePaper1Move);
$buttonScissorPlayer1.addEventListener("click", handleScissor1Move); 

//P2
$buttonStonePlayer2.addEventListener("click", handleStone2Move);
$buttonPaperPlayer2.addEventListener("click", handlePaper2Move);
$buttonScissorPlayer2.addEventListener("click", handleScissor2Move);

//Game options
$buttonStartGame.addEventListener("click", handleToggleGame);
$buttonGameReset.addEventListener("click", handleGameReset);

/*a Função addEventListener tem dois parâmetros, o primeiro sendo a ação que
ela irá escutar, sendo nesse caso um clique, e o sengundo a ação que ela irá
tomar caso essa ação seja escutada, que seria uma função no caso.

outro ponto importante é que se declararmos os parenteses na função, ela irá 
executar antes do evento de clique ocorrer, então em casos onde a função deve
occorrer apenas em eventos especificos escutados pelo addEventListener, ela não
deve ser declarada com parenteses, pois ela seria executada antes da ação desejada
*/