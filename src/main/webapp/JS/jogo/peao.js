/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Peao = function (_cor, _linha, _coluna) {
    var id = "Rei-";
    var virgem = true;
    var imagem = document.createElement("img");
    if (_cor === 0) {
        id = id + "Branco-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/peao-branco.png";
    } else {
        id = id + "Preto=" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/peao-preto.png";
    }

    imagem.id = id;
    imagem.width = "50";
    imagem.height = "45";
    imagem.class = "drag";

    Peao.movimento = function (_linha, _coluna, _cor) {
        var posicoes = new Array();
        var saltos;
        if(virgem){
            saltos = 2;
        }else{
            saltos = 1;
        }
        
        for(var i = 0; i > (saltos*-1) ; i--){
            
        }
        
        return posicoes;
    };

    Peao.inicioMovimento = function (event, ui) {
        var linha = Number(ui.helper.context.parentNode.id.split(""[0]));
        var coluna = Number(ui.helper.context.parentNode.id.split("")[1]);
        var corPeca = ui.helper.context.id.split("-")[1];

        var movimentos = Peao.movimento(linha, coluna, corPeca);

        for (var i = 0; i < movimentos.length; i++) {
            $("#" + movimentos[i]).droppable({scope: id, drop: jogada});
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

        $("#" + idPeca).css({top: "10%", left: "10%"});
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
    $("#" + id).css({top: "10%", left: "10%"});

};

