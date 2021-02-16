const BASE_URL = 'https://swapi.dev/api/';

export function searchUser(name) {
   return searchFor('people', name);
}

export function searchPlanet(name) {
   return searchFor('planets', name);
}

function searchFor(field, name) {
   return fetch(`${BASE_URL}${field}/?search=${name}`, {
      method: 'GET'
   }).then(response => response.json());
}