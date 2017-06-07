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

};






























