/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Rainha = function (_cor, _linha, _coluna) {
    var id = "Rainha-";
    var imagem = document.createElement("img");

    if (_cor === 0) {
        id = id + "Branco-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/rainha-branco.png";
    } else {
        id = id + "Preto-" + _linha + "" + _coluna;
        imagem.src = "JS/jogo/pecas/rainha-preto.png";
    }
    
    
    imagem.id = id;
    imagem.width = "50";
    imagem.height = "50";
    imagem.class = "drag";


    Rainha.movimento = function(_linha,_coluna,_cor){
        
    };
    
    Rainha.inicioMovimento = function(event,ui){
        var linha = Number (ui.helper.context.parentNode.id.split(""[0]));
        var coluna = Number(ui.helper.context.parentNode.id.split("")[1]);
        var corPeca = ui.helper.context.id.split("-")[1];
        
        var movimentos = Rainha.movimento(linha,coluna,corPeca);
        
        for (var i = 0; i < movimentos.length; i++){
            $("#" + movimentos[i]).droppable({scope: id, drop: Rainha.jogada});
        }
    };
    
    Rainha.jogada = function (event,ui){
        var idCasa = event.target.id;
        var idPeca = ui.helper.context.id;
        var casa = $("#" + idCasa)[0];
        var removido;
    };




};
