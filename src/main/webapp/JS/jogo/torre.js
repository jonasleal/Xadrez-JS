
//@Izaquias


var Torre = function (_cor, _linha, _coluna) {
    var id = "Torre-";
    var cor = _cor;
    var imagem = document.createElement("img");

    if (cor === 0) {
        id = id + "Branco-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/torre-branca.png";
    } else {

        id = id + "Preto-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/torre-preta.png";
    }
    imagem.id = id;
    imagem.width = "50";
    imagem.height = "50";
    imagem.class = "drag";

    Torre.movimento = function (_linha, _coluna) {

        var posicoes = new Array();
        var pos = 0;
        
        //Movimento direita
        for (var i = 1; i < 8; i++){
            
            var linha = (Number(_linha));
            var coluna = (Number(_coluna) + i);
            
            if (linha > -1 && coluna > -1 && linha < 8 && coluna < 8) {
                var indice = linha +""+ coluna;
                var casa = $("#"+indice)[0];
                if(casa.childElementCount < 1){
                  posicoes[pos] = linha + ""+coluna;
                  pos++;
                }else{
                    var corOutraPeca = casa.firstElementChild.id.split("-")[1];
                    if(corOutraPeca === _cor){
                        break;
                    }else if (corOutraPeca !== _cor){
                        posicoes[pos] = linha +""+coluna;
                        pos++;
                        break;
                    }
                }
            }
            
        }
        //Movimento esquerda
        for (var i = -1; i > -8; i--){
            
            var linha = (Number(_linha));
            var coluna = (Number(_coluna) + i);
            
            if (linha > -1 && coluna > -1 && linha < 8 && coluna < 8) {
                var indice = linha +""+ coluna;
                var casa = $("#"+indice)[0];
                if(casa.childElementCount < 1){
                  posicoes[pos] = linha + ""+coluna;
                  pos++;
                }else{
                    var corOutraPeca = casa.firstElementChild.id.split("-")[1];
                    if(corOutraPeca === _cor){
                        break;
                    }else if (corOutraPeca !== _cor){
                        posicoes[pos] = linha +""+coluna;
                        pos++;
                        break;
                    }
                }
            }
            
        }
        
        //Movimento Cima
        for (var i = -1; i > -8; i--){
            
            var linha = (Number(_linha)+ i);
            var coluna = (Number(_coluna));
            
            if (linha > -1 && coluna > -1 && linha < 8 && coluna < 8) {
                var indice = linha +""+ coluna;
                var casa = $("#"+indice)[0];
                if(casa.childElementCount < 1){
                  posicoes[pos] = linha + ""+coluna;
                  pos++;
                }else{
                    var corOutraPeca = casa.firstElementChild.id.split("-")[1];
                    if(corOutraPeca === _cor){
                        break;
                    }else if (corOutraPeca !== _cor){
                        posicoes[pos] = linha +""+coluna;
                        pos++;
                        break;
                    }
                }
            }
            
        }
        //Movimento Baixo
        for (var i = 1; i < 8; i++){
            
            var linha = (Number(_linha)+ i);
            var coluna = (Number(_coluna));
            
            if (linha > -1 && coluna > -1 && linha < 8 && coluna < 8) {
                var indice = linha +""+ coluna;
                var casa = $("#"+indice)[0];
                if(casa.childElementCount < 1){
                  posicoes[pos] = linha + ""+coluna;
                  pos++;
                }else{
                    var corOutraPeca = casa.firstElementChild.id.split("-")[1];
                    if(corOutraPeca === _cor){
                        break;
                    }else if (corOutraPeca !== _cor){
                        posicoes[pos] = linha +""+coluna;
                        pos++;
                        break;
                    }
                }
            }
            
        }
        
       
        return posicoes;
    };

    Torre.inicioMovimento = function (event, ui) {
        var linha = Number(ui.helper.context.parentNode.id.split("")[0]);
        var coluna = Number(ui.helper.context.parentNode.id.split("")[1]);


        var movimentos = Torre.movimento(linha, coluna);

        for (var i = 0; i < movimentos.length; i++) {
            $("#" + movimentos[i]).droppable({scope: id, drop: Torre.jogada, disable: false});
        }
    };

    Torre.jogada = function (event, ui) {
        var idCasa = event.target.id;
        var idPeca = ui.helper.context.id;
        var posicaoAnterior = $("#" + idPeca)[0].parentNode.id;
        var casa = $("#" + idCasa)[0];

        var removido;

        if (casa.childElementCount > 0) {
            var corPeca = casa.firstChild.id.split("-")[1];

            if (idPeca.split("-")[1] !== corPeca) {
                removido = casa.removeChild(casa.firstChild);
            } else {

            }
        }

        $("#" + idPeca).css({top: "8%", left: "10%"});
        $("#" + idCasa).append($("#" + idPeca));

        var linha = Number(posicaoAnterior.split("")[0]);
        var coluna = Number(posicaoAnterior.split("")[1]);
        var movimentos = Torre.movimento(linha, coluna);
        for (var i = 0; i < movimentos.length; i++) {
            $("#" + movimentos[i]).droppable("destroy");
        }

    };

    $("#" + _linha + "" + _coluna).append(imagem);
    $("#" + id).draggable({
        start: Torre.inicioMovimento,
        revert: "invalid",
        scope: id});
    $("#" + id).css({top: "8%", left: "10%"});



}; 