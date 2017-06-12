/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Peao = function (_cor, _linha, _coluna) {
    var id = "Peao-";
    var imagem = document.createElement("img");

    if (_cor === 0) {
        id = id + "Branco-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/peao-branco.png";
        direcao = -1;
    } else {
        id = id + "Preto-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/peao-preto.png";
        direcao = 1;
    }

    imagem.id = id;
    imagem.width = "50";
    imagem.height = "45";
    imagem.class = "drag";

    Peao.movimento = function (_linha, _coluna, _cor) {
        var posicoes = new Array();
        var saltos;
        var direcao;
        var virgem;
        //Verifica se é o primeiro movimento da peça
        if ($("#" + _linha + "" + _coluna)[0].firstChild.id.split("-")[2] === _linha + "" + _coluna) {
            virgem = true;
        } else {
            virgem = false;
        }
        //Define o numero de saltos que a peça pode dar
        if (virgem) {
            saltos = 2;
        } else {
            saltos = 1;
        }
        //Define a direção do movimento
        if (_cor === "Branco") {
            direcao = -1;
        } else {
            direcao = 1;
        }
        
        var linha = Number(_linha);
        var coluna = Number(_coluna);
        //Percorre a quantidade de saltos possiveis
        for (var i = 0, j = 1 * direcao; i < saltos; i++, j = j + direcao) {
            //Verifica se esta no limite do tabuleiro
            if (linha + j > -1 && linha + j < 8) {
                //Recupera a casa do tabuleiro
                var casa = $("#" + (linha + j) + "" + coluna)[0];
                //Verifica se tem uma peça na casa
                if (casa.childElementCount < 1) {
                    //Se não houver peça, define um movimento possivel
                    posicoes[i] = (linha + j) + "" + coluna;
                }
            }
        }
        //Percorre de uma casa a esquerda da peça para uma casa a direita ( j inicia -1 e termina +1)
        for (var i = posicoes.length, j = -1; j < 2; i++, j++) {
            //Calcula a linha e a coluna onde sera verificado
            var proxLinha = (linha + direcao);
            var proxColuna = (coluna + j);
            //Verifica se esta no limite do tabuleiro
            if (proxColuna > -1 && proxColuna < 8) {
                //Recupera a casa do tabuleiro
                casa = $("#" + proxLinha + "" + proxColuna)[0];
                //Verifica se ha uma peça na casa que sera verificada
                if (casa.childElementCount > 0) {
                    //Se houver peça obtem a cor da peça a partir do ID
                    var corPeca = casa.firstChild.id.split("-")[1];
                    //Verifica se as peças são de cores difentes e se a coluna que esta verificando
                    //é a mesma que a peça esta
                    if (corPeca !== _cor && coluna - j !== coluna) {
                        //Se for uma casa a esquerda ou a direita de onde a peça esta e de cor difetente
                        //torna quela casa um movimento possivel
                        posicoes[i] = proxLinha + "" + proxColuna;
                    }
                }
            }

        }
        //Retorna todos os movimentos possiveis
        return posicoes;
    }
    ;

    Peao.inicioMovimento = function (event, ui) {
        var idPeca = ui.helper.context.parentNode.id;
        var linha = Number(idPeca.split("")[0]);
        var coluna = Number(idPeca.split("")[1]);
        var corPeca = ui.helper.context.id.split("-")[1];

        var movimentos = Peao.movimento(linha, coluna, corPeca);

        for (var i = 0; i < movimentos.length; i++) {
            $("#" + movimentos[i]).droppable({scope: id, drop: Peao.jogada});
        }
    };

    Peao.jogada = function (event, ui) {
        var idCasa = event.target.id;
        var idPeca = ui.helper.context.id;
        var casa = $("#" + idCasa)[0];
        var removido;

        if (casa.childElementCount > 0) {
            removido = casa.removeChild(casa.firstChild);
        }

        $("#" + idPeca).css({top: "6%", left: "10%"});
        $("#" + idCasa).append($("#" + idPeca));


        virgem = false;

        var dropaveis = $(".ui-droppable");
        for (var i = 0; i < dropaveis.length; i++) {
            $("#" + dropaveis[i].id).droppable("destroy");
        }
    };

    $("#" + _linha + "" + _coluna).append(imagem);
    $("#" + id).draggable({
        start: Peao.inicioMovimento,
        revert: "invalid",
        scope: id});
    $("#" + id).css({top: "6%", left: "10%"});

};

