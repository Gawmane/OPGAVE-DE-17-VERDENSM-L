export const myfetch = async(url) => {

    //prøv dette
    try {
        //Henter data fra api og sætter det til at vente
        const response = await fetch(url);
        //Finder daten fra json og sætter den til at vente
        const result = await response.json();
        //Viser result
        return result;
    }

    //Giver fejlmeddeling
    catch (err) {
        console.error(`Fejl i myfech: ${err}`)
    }
}