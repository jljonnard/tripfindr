Ce code correspond à l'application disponible [ici](https://tripfindr.vercel.app/).

# But de l'application

Cette application vous permet de chercher des vols pas chers à des dates flexibles.

Le seul critère obligatoire c'est votre lieu de départ (il faut bien commencer quelque part !)<br />
Cependant d'autres critères de recherche sont disponibles :

`Pays`: vous proposant des pays de destination<br />
`Période`: vous proposant des mois pour partir<br />
`Durée`: pour préciser combien de temps vous voulez partir<br />
`Prix Min`et `Prix max`: pour délimiter pour votre budget<br />
`Direct` : une case à cocher pour éviter leslongs trajets


Une fois cliqué sur `Trouver un voyage`, de nombreux résultats seront affichés accompagnés de photos afin de pouvoir visualiser les destinations.

Si l'on veut en savoir plus sur un voyage on peut cliquer sur `Voir plus de détails`.<br />
On retrouve ainsi le nom des compagnies aériennes, les jours de départ, les aéroports, le pays de la destination etc.

Si ce voyage nous plait on peut alors cliquer sur `Consulter l'offre` afin de commencer les démarches de réservation.

# Technologies utilisées

## React

Le framework React a été utilisé pour mener à bien ce projet.<br />
L'approche des `hooks` face aux classes a aussi été choisie.

## APIs

2 APIs ont été utilisées lors du projet :

### `SkyScanner`

Cette API permet de trouver des vols en fonction d'un lieu de départ, un lieu d'arrivée, la date de départ, la date d'arrivée, le marché local, la langue et la monnaie utilisée.<br />
Le taux de réponse est très bon, mais l'API présente tout de même quelques problèmes :
<ul>
<li>La même requette dans 2 langues différentes peut donner des résultats différents dès lors que la requête commence à donner 170 vols. Ce qui ne devrait pas arriver puisqu'on n'a pas changé le marché</li>
<li>La réponse est extrêmement mal organisée. Beaucoup d'id sont utilisés alors que parfois un id nous donne accès à qu'une seule information. Cela nécessite donc de reformater la réponse ensuite.</li>
</ul>

### `Unsplash`

Cette API fournit des photos en fonction d'une recherche. C'est elle qui permet de mettre des photos sur chaque résultat. Elle est très facile d'utilistaion et rapide. 

Le seul défaut serait qu'on atteint rapidement le nombre de requêtes maximales à faire. Mais on peut partiellement palier ce problème en enregistrant les urls des photos dans le state plutôt que de refaire une requête API à chaque fois.
