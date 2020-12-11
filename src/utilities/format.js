   //fonction qui cherche l'objet dans lequel un attribut à la même valeur que la valeur donnée et renvoie la valeur de l'autre attribut
  export const getObject = (id, where, searchId, finalId) => {
    /* 'id' resprésente la valeur que l'on cherche
             'where' est la liste d'objets dans laquelle on cherche
             'searchId' est le nom de l'attribut dans lequel on cherche la valeur
             'finalId' est le nom de l'attribut dont on va renvoyer la valeur */

    let i = 0;
    while (
       i < where.length &&
       id.toString().toUpperCase() !== where[i][searchId].toString().toUpperCase()
    ) {
       i++;
    }

    if (i === where.length) {
       //si la valeur ne se trouve dans aucun objet du tableau
       return false;
    }

    return where[i][finalId];
    };