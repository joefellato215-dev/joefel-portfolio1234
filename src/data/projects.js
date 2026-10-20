// Edit this file to change project cards. Statuses: active | dev | experimental | planned
export const projects = [
 {name:'Prometheus Market',cat:'E-commerce',status:'dev',
  desc:'Full-stack commerce platform growing from a core cart toward a Shopee-style system.',
  tech:['HTML','CSS','JavaScript','Python','Flask','SQLite','REST'],
  features:['Catalog & search','Cart, wishlist, coupons','Checkout & invoices','Order tracking','Admin dashboard','Recommendations'],
  github:'https://github.com/joefellato215-dev'},
 {name:'Oculus AI',cat:'AI assistant',status:'experimental',
  desc:'Personal assistant ecosystem built around "Hey Oculus", running from Android and Termux.',
  tech:['Python','Flask','AI APIs','Termux','ESP32'],
  features:['Math & science help','PDF interaction','Wikipedia knowledge','Memory','Flask dashboard'],
  github:'https://github.com/joefellato215-dev'},
 {name:'Oculus Smart Home',cat:'IoT',status:'experimental',
  desc:'ESP32 hardware connected to Oculus AI over a mobile hotspot.',
  tech:['ESP32','Arduino','ArduinoDroid','Python','Flask'],
  features:['Smart lights & effects','Temperature sensor','ESP32 dashboard','USB/OTG workflow'],
  github:'https://github.com/joefellato215-dev'}
];
export const statusLabel={active:'🟢 Active',dev:'🟡 In development',experimental:'🔵 Experimental',planned:'⚪ Planned'};
