/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var tabuleiro = new Array(8);
var jogadorPreto = new Array();
var jogadorBranco = new Array();
$(document).ready(function () {
    
    for (var i = 0; i < tabuleiro.length; i++) {

        var linha = document.createElement("tr");
        tabuleiro[i] = new Array(8);

        for (var j = 0; j < tabuleiro[i].length; j++) {
            tabuleiro[i][j] = desenhaCelula(i , j);
            linha.appendChild(tabuleiro[i][j]);
        }
        $("#tabuleiro").append(linha);
    }
    colocarPeca();
});

desenhaCelula = function (_linha, _coluna) {
    var celula = document.createElement("td");
    var cor = _linha+_coluna;
    var idElemento = _linha+""+_coluna;
    if (cor % 2 === 1) {
        celula.setAttribute("id", idElemento );
        celula.setAttribute("class", "casaPreta");
    } else {
        celula.setAttribute("id", idElemento);
        celula.setAttribute("class", "casaBranca");
    }
    return celula;
};

colocarPeca = function () {
    jogadorPreto[0] = new Rei(1,0,3);
    jogadorBranco[0] = new Rei(0,7,4);
    
    for(var i = 0; i < 8; i++){
       jogadorBranco[jogadorBranco.length] = new Peao(0,6,i); 
       jogadorPreto[jogadorPreto.length] = new Peao(1,1,i);
    
    }
};

