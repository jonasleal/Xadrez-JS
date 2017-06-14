/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Cavalo = function (_cor, _linha, _coluna) {
    var id = "cavalo-";
    var imagem = document.createElement("img");
    if (_cor === 0) {
        id = id + "Branco-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/cavalo-branco.png";
    } else {
        id = id + "Preto-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/cavalo-preto.png";
    }
    imagem.id = id;
    imagem.width = "50";
    imagem.height = "50";
    imagem.class = "drag";

Cavalo.movimento = function (_linha, _coluna, _cor) {
        var posicoes = new Array();
       
        var linha = new Array();
        var coluna = new Array();
        var pos = 0;
        
        
        linha[0] = (Number(_linha) - 2);
        coluna[0] = (Number(_coluna) - 1);
        
        linha[1] = (Number(_linha) - 2);
        coluna[1] = (Number(_coluna) + 1);
        
        linha[2] = (Number(_linha) + 2);
        coluna[2] = (Number(_coluna) - 1);
        
        linha[3] = (Number(_linha) + 2);
        coluna[3] = (Number(_coluna) + 1);
        
        linha[4] = (Number(_linha) + 1);
        coluna[4] = (Number(_coluna) - 2);
        
        linha[5] = (Number(_linha) - 1 );
        coluna[5] = (Number(_coluna) - 2);
        
        linha[6] = (Number(_linha) - 1);
        coluna[6] = (Number(_coluna) + 2);
        
        linha[7] = (Number(_linha) + 1);
        coluna[7] = (Number(_coluna) + 2);
        
        for(var i = 0; i < 8; i++){
            
            if (linha[i] > -1 && coluna[i] > -1 && linha[i] < 8 && coluna[i] < 8) {
                var indice = linha[i] + "" + coluna[i];
                var casa = $("#" + indice)[0];
                if (casa.childElementCount < 1) {
                    posicoes[pos] = linha[i] + "" + coluna[i];
                    pos++;
                } else {
                    var corOutraPeca = casa.firstElementChild.id.split("-")[1];
                    if (corOutraPeca !== _cor) {
                        posicoes[pos] = linha[i] + "" + coluna[i];
                        pos++;

                    }
                }
            }
        }
        return posicoes;
    }
    ;

    
    Cavalo.inicioMovimento = function (event, ui) {
        var linha = Number(ui.helper.context.parentNode.id.split("")[0]);
        var coluna = Number(ui.helper.context.parentNode.id.split("")[1]);
        var corPeca = ui.helper.context.id.split("-")[1];

        var movimentos = Cavalo.movimento(linha, coluna, corPeca);

        for (var i = 0; i < movimentos.length; i++) {
            $("#" + movimentos[i]).droppable({scope: id, drop: Cavalo.jogada});
        }
    };

    Cavalo.jogada = function (event, ui) {
        var idCasa = event.target.id;
        var idPeca = ui.helper.context.id;
        var casa = $("#" + idCasa)[0];
        var removido;
        
        if (casa.childElementCount > 0) {
            removido = casa.removeChild(casa.firstChild);

        }

        $("#" + idPeca).css({top: "8%", left: "10%"});
        $("#" + idCasa).append($("#" + idPeca));

        var dropaveis = $(".ui-droppable");
        for (var i = 0; i < dropaveis.length; i++) {
            $("#" + dropaveis[i].id).droppable("destroy");
        }

    };

    $("#" + _linha + "" + _coluna).append(imagem);
    $("#" + id).draggable({
        start: Cavalo.inicioMovimento,
        revert: "invalid",
        scope: id});
    $("#" + id).css({top: "8%", left: "10%"});

};
































