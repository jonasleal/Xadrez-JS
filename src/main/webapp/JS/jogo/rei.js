/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Rei = function (_cor, _linha, _coluna) {
    var id = "Rei-";
    var imagem = document.createElement("img");
    if (_cor === 0) {
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

    Rei.movimento = function (_linha, _coluna, _cor) {
        var posicoes = new Array();
        for (var i = -1, pos = 0; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                if (i !== 0 || j !== 0) {
                    var linha = (Number(_linha) + i);
                    var coluna = (Number(_coluna) + j);
                    if (linha > -1 && coluna > -1 && linha < 8 && coluna < 8) {
                        var indice = linha + "" + coluna;
                        var casa = $("#" + indice)[0];
                        if (casa.childElementCount < 1) {
                            posicoes[pos] = linha + "" + coluna;
                            pos++;
                        } else {
                            var corOutraPeca = casa.firstElementChild.id.split("-")[1];
                            if (corOutraPeca !== _cor) {
                                posicoes[pos] = linha + "" + coluna;
                                pos++;

                            }
                        }
                    }

                }
            }
        }
        return posicoes;
    }
    ;

    Rei.inicioMovimento = function (event, ui) {
        var linha = Number(ui.helper.context.parentNode.id.split("")[0]);
        var coluna = Number(ui.helper.context.parentNode.id.split("")[1]);
        var corPeca = ui.helper.context.id.split("-")[1];

        var movimentos = Rei.movimento(linha, coluna, corPeca);

        for (var i = 0; i < movimentos.length; i++) {
            $("#" + movimentos[i]).droppable({scope: id, drop: Rei.jogada});
        }
    };

    Rei.jogada = function (event, ui) {
        var idCasa = event.target.id;
        var idPeca = ui.helper.context.id;
        var casa = $("#" + idCasa)[0];
        var removido;
        
        if (casa.childElementCount > 0) {
            removido = casa.removeChild(casa.firstChild);

        }

        $("#" + idPeca).css({top: "3%", left: "10%"});
        $("#" + idCasa).append($("#" + idPeca));

        var dropaveis = $(".ui-droppable");
        for (var i = 0; i < dropaveis.length; i++) {
            $("#" + dropaveis[i].id).droppable("destroy");
        }

    };

    $("#" + _linha + "" + _coluna).append(imagem);
    $("#" + id).draggable({
        start: Rei.inicioMovimento,
        revert: "invalid",
        scope: id});
    $("#" + id).css({top: "3%", left: "10%"});

};