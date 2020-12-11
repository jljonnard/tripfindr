export    const getCalendarDay = (date) => {
    //fonction qui à partir d'une date, nous donne le jour de la semaine
    let temporaryDate = new Date(
       parseInt(date.slice(0, 4)), //année
       parseInt(date.slice(5, 7)) - 1, //mois
       parseInt(date.slice(8, 10))
    ); //quantième

    switch (temporaryDate.getDay()) {
       case 0:
          return "Dimanche";
       case 1:
          return "Lundi";
       case 2:
          return "Mardi";
       case 3:
          return "Mercredi";
       case 4:
          return "Jeudi";
       case 5:
          return "Vendredi";
       case 6:
          return "Samedi";
       default:
          return "";
    }
 };

   //fonction qui transforme une string en objet Date() et renvoie son jour de la semaine
 export const getDayNumber = (date) => {
    let temporaryDate = new Date(
       parseInt(date.slice(0, 4)),
       parseInt(date.slice(5, 7)) - 1,
       parseInt(date.slice(8, 10))
    );

    return temporaryDate.getDay();
 };

 //fonction qui transforme 2 string en objet Date() et renvoie le nombre de jours entre les 2 dates
 export const getRange = (outboundDate, inboundDate) => {
    let outbound = new Date(
       parseInt(outboundDate.slice(0, 4)),
       parseInt(outboundDate.slice(5, 7)) - 1,
       parseInt(outboundDate.slice(8, 10))
    );
    let inbound = new Date(
       parseInt(inboundDate.slice(0, 4)),
       parseInt(inboundDate.slice(5, 7)) - 1,
       parseInt(inboundDate.slice(8, 10))
    );

    const range = inbound.getTime() - outbound.getTime();
    return Math.round(range / 1000 / 3600 / 24);
 };