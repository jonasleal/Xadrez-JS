/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Rei = function (_cor, _linha, _coluna) {
    var id = "Rei-";
    var cor = _cor;
    var imagem = document.createElement("img");
    if (cor === 0) {
        id = id + "Branco-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/rei-branco.png";
    } else {
        id = id + "Preto-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/rei-preto.png";
    }
    imagem.id = id;
    imagem.width = "50";
    imagem.height = "50";
    imagem.class = "drag";

    movimento = function (_linha, _coluna) {
        var posicoes = new Array();
        for (var i = -1, pos = 0; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                if (i !== 0 || j !== 0) {
                    var linha = (Number(_linha) + i);
                    var coluna = (Number(_coluna) + j);
                    if (linha > -1 && coluna > -1 && linha < 8 && coluna < 8) {
                        posicoes[pos] = linha + "" + coluna;
                        pos++;
                    }

                }
            }
        }
        return posicoes;
    };

    inicioMovimento = function (event, ui) {
        var linha = Number(ui.helper.context.parentNode.id.split("")[0]);
        var coluna = Number(ui.helper.context.parentNode.id.split("")[1]);


        var movimentos = movimento(linha, coluna);

        for (var i = 0; i < movimentos.length; i++) {
            $("#" + movimentos[i]).droppable({scope: id, drop: jogada, disable: false});
        }
    };

    jogada = function (event, ui) {
        var idCasa = event.target.id;
        var idPeca = ui.helper.context.id;
        var posicaoAnterior = $("#" + idPeca)[0].parentNode.id;
        var casa = $("#" + idCasa)[0];

        var removido;

        if (casa.childElementCount > 0) {
            var corPeca = casa.firstChild.id.split("-")[1];
            
            if(idPeca.split("-")[1] !== corPeca){
                removido = casa.removeChild(casa.firstChild);
            }else{
                
            }
        }

        $("#" + idPeca).css({top: "8%", left: "10%"});
        $("#" + idCasa).append($("#" + idPeca));

        var linha = Number(posicaoAnterior.split("")[0]);
        var coluna = Number(posicaoAnterior.split("")[1]);
        var movimentos = movimento(linha, coluna);
        for (var i = 0; i < movimentos.length; i++) {
            $("#" + movimentos[i]).droppable("destroy");
        }

    };

    $("#" + _linha + "" + _coluna).append(imagem);
    $("#" + id).draggable({
        start: inicioMovimento,
        revert: "invalid",
        scope: id});
    $("#" + id).css({top: "8%", left: "10%"});



};

