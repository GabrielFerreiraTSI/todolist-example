module.exports.getDate = getDate;

function getDate() {
    let today = new Date();

    //Exibir opções de data
    let options = {
        weekday:"long",
        day:"numeric",
        month:"numeric",
        year:"numeric"
    }

    //Definir o valor das variáveis 
    return today.toLocaleDateString("pt-BR", options);
}