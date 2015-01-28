/****
  Cards
  ------
  List of cards available in the game.
  Card specification:
    {
      name: <card name>
      health: <health value>
      attack: <attack value>
      cost: <cost value>
      art: <URL to card image (130x130)>
      artistname: <name of artist>
      artistlink: <link to artist page>
      description: <text description of card>
      maxAttacks: <maximum attacks per turn | default: 1>
      defensive: <whether creature is defensive | default: false>
    }
 ****/

Cards = [
  {
    name: 'Australian Pelican',
    health: 7,
    attack: 4,
    cost: 4,
    art: '/images/cards/pelican.jpg',
    artistname: 'brisbanecitycouncil',
    artistlink: 'https://www.flickr.com/photos/brisbanecitycouncil/5279472440',
    description: 'Can attack twice each turn.',
    maxAttacks: 2
  },
  {
    name: 'Butterfly',
    health: 2,
    attack: 1,
    cost: 1,
    art: '/images/cards/butterfly.jpg',
    artistname: 'nagaon',
    artistlink: 'https://www.flickr.com/photos/nagaon/4394582833',
    description: ''
  },
  {
    name: 'Meerkat',
    health: 6,
    attack: 3,
    cost: 3,
    art: '/images/cards/meerkat.jpg',
    artistname: 'wwarby',
    artistlink: 'https://www.flickr.com/photos/wwarby/4915195123',
    description: '<span data-tooltip="Defensive creatures cannot attack, but enemy characters cannot attack your other characters while you have a defensive creature alive.">Defensive</span>.',
    defensive: true
  },
  {
    name: 'Hamster',
    health: 1,
    attack: 2,
    cost: 1,
    art: '/images/cards/hamster.jpg',
    artistname: 'Phillip Roberts',
    artistlink: 'https://www.flickr.com/photos/skullycollins/3480810004',
    description: ''
  },
  {
    name: 'Rabbit',
    health: 4,
    attack: 2,
    cost: 2,
    art: '/images/cards/rabbit.jpg',
    artistname: 'Yuri Levchenko',
    artistlink: 'https://www.flickr.com/photos/i8ipod/9028050858',
    description: ''
  },
  {
    name: 'Toad',
    health: 5,
    attack: 1,
    cost: 2,
    art: '/images/cards/toad.jpg',
    artistname: 'Jonathan Kriz',
    artistlink: 'https://www.flickr.com/photos/27587002@N07/10008770704',
    description: '<span data-tooltip="Defensive creatures cannot attack, but enemy characters cannot attack your other characters while you have a defensive creature alive.">Defensive</span>.',
    defensive: true
  },
  {
    name: 'Field Mouse',
    health: 5,
    attack: 4,
    cost: 3,
    art: '/images/cards/mouse.jpg',
    artistname: 'Mark Bray',
    artistlink: 'https://www.flickr.com/photos/braydawg/185092747',
    description: ''
  },
  {
    name: 'Jackrabbit',
    health: 6,
    attack: 3,
    cost: 3,
    art: '/images/cards/jackrabbit.jpg',
    artistname: 'Larry Smith',
    artistlink: 'https://www.flickr.com/photos/lsmith2010/14442393440',
    description: ''
  },
  {
    name: 'Scottish Wildcat',
    health: 8,
    attack: 4,
    cost: 4,
    art: '/images/cards/wildcat.jpg',
    artistname: 'Linda Stanley',
    artistlink: 'https://www.flickr.com/photos/68732830@N06/8545959528',
    description: ''
  },
  {
    name: 'Indian Cobra',
    health: 9,
    attack: 3,
    cost: 4,
    art: '/images/cards/cobra.jpg',
    artistname: 'Gopal Venkatesan',
    artistlink: 'https://www.flickr.com/photos/gopalarathnam_v/3806051189',
    description: 'Can attack twice each turn.',
    maxAttacks: 2
  },
  {
    name: 'Lazy Hyena',
    health: 11,
    attack: 5,
    cost: 5,
    art: '/images/cards/hyena.jpg',
    artistname: 'Nathan Bittinger',
    artistlink: 'https://www.flickr.com/photos/nate_kate/5703998760',
    description: '<span data-tooltip="Defensive creatures cannot attack, but enemy characters cannot attack your other characters while you have a defensive creature alive.">Defensive</span>.',
    defensive: true
  },
  {
    name: 'Baird\'s Tapir',
    health: 9,
    attack: 6,
    cost: 5,
    art: '/images/cards/tapir.jpg',
    artistname: 'Miguel Vieira',
    artistlink: 'https://www.flickr.com/photos/miguelvieira/5533409357',
    description: ''
  },
  {
    name: 'Wild Boar',
    health: 12,
    attack: 6,
    cost: 6,
    art: '/images/cards/boar.jpg',
    artistname: 'C. and S. Northway',
    artistlink: 'https://www.flickr.com/photos/apes_abroad/4596032528',
    description: ''
  },
  {
    name: 'Leopard',
    health: 13,
    attack: 5,
    cost: 6,
    art: '/images/cards/leopard.jpg',
    artistname: 'Roger Blackwell',
    artistlink: 'https://www.flickr.com/photos/rogerblackwell/11823377466',
    description: 'Can attack twice each turn.',
    maxAttacks: 2
  },
  {
    name: 'Chimpanzee',
    health: 16,
    attack: 7,
    cost: 7,
    art: '/images/cards/chimp.jpg',
    artistname: 'Leszek Leszczynski',
    artistlink: 'https://www.flickr.com/photos/leszekleszczynski/5132579500',
    description: '<span data-tooltip="Defensive creatures cannot attack, but enemy characters cannot attack your other characters while you have a defensive creature alive.">Defensive</span>.',
    defensive: true
  },
  {
    name: 'Flamingo Troupe',
    health: 18,
    attack: 3,
    cost: 7,
    art: '/images/cards/flamingos.jpg',
    artistname: 'Taiwai Yun',
    artistlink: 'https://www.flickr.com/photos/javasquid/1712684359',
    description: 'Can attack four times each turn.',
    maxAttacks: 4
  },
  {
    name: 'Kangaroo',
    health: 13,
    attack: 9,
    cost: 8,
    art: '/images/cards/kangaroo.jpg',
    artistname: 'Glen Wright',
    artistlink: 'https://www.flickr.com/photos/28974995@N04/5174494350',
    description: ''
  },
  {
    name: 'Mandrill',
    health: 16,
    attack: 8,
    cost: 8,
    art: '/images/cards/mandrill.jpg',
    artistname: 'Michael Fraley',
    artistlink: 'https://www.flickr.com/photos/mrfraley/5338198148/in/photostream/',
    description: ''
  },
  {
    name: 'Hippopotamus',
    health: 10,
    attack: 12,
    cost: 9,
    art: '/images/cards/hippo.jpg',
    artistname: 'William Warby',
    artistlink: 'https://www.flickr.com/photos/wwarby/4915772994',
    description: ''
  },
  {
    name: 'Zebra',
    health: 18,
    attack: 9,
    cost: 9,
    art: '/images/cards/zebra.jpg',
    artistname: 'Barbara Eckstein',
    artistlink: 'https://www.flickr.com/photos/beckstei/6359841113',
    description: ''
  },
];

Cards.forEach(function(card, i) {
  card.id = i;
  if (!card.maxAttacks) {
    card.maxAttacks = 1;
  }
  if (!card.defensive) {
    card.defensive = false;
  }
})