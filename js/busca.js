let queryUrl = "https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=";

$(function() {

    $(document).keypress(function(e) {
        if(e.which == 13) 
            $('#btn-buscar').click();
    });

    $('#btn-buscar').on('click', () => {
        $('#btn-buscar').focus();
        var busca = $('#busca').val();
        var url = queryUrl + busca + "_no_Brasil";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: pegarResultado
        });

        function pegarResultado(dado){
            console.log(dado);
            
            let page = dado.query.pages;
            let pageId = Object.keys(dado.query.pages)[0];
            let content = page[pageId].extract;
            
            if(content != null){
                console.log(content);
                $('#saida').empty();
                $('#saida').prepend("<div>");
                $('#saida').prepend(content);
                $('#saida').prepend("<br></div>");
                $('#saida').css('display', 'block');
            } else {
                $.ajax({
                    url: queryUrl + busca,
                    type: 'GET',
                    dataType: 'json',
                    success: segundaChance
                });
            }   
        }

        function segundaChance(dado){
            console.log(dado);

            let page = dado.query.pages;
            let pageId = Object.keys(dado.query.pages)[0];
            let content = page[pageId].extract;

            if(content.includes('Brasil')){
                let partes = content.split('li>');
                $('#saida').empty();
                for(var i = 0; i < partes.length; i++){
                    if(partes[i].includes('Brasil')){
                        $('#saida').prepend('<li>' + partes[i] + 'li>');
                        $('#saida').css('display', 'block');
                    }
                }

            } else {
                $('#saida').empty();                    
                $('#saida').prepend("Nada a mostrar");
                $('#saida').css('display', 'block');
            }
        }
    });
});