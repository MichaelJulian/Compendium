////////////////////////////////////////////////////////////
///  Class Constructors
////////////////////////////////////////////////////////////

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};

var Skill = function(data) {
  var skill = {};
  skill.ap = 0;
  skill.hp = 0;
  skill.cd = 0;
  skill.dur = 1;
  skill.apmod = 1;
  skill.hpmod = 1;
  skill.name = '';
  skill.dot = 0;
  skill.hot = 0;
  extend(skill, data);
  return skill;
};

var Hero = function(data) {
  var hero = {};

  hero.cds = {
    primary: 0,
    secondary: 0,
    special: 0
  };

  hero.buffs = [];
  hero.debuffs = [];

  hero.cast = function(target, skill) {
    if (hero.cds[skill] === 0) {
      var spell = skills[hero[skill]];

      // basic damage
      target.hp -= spell.ap;
      hero.hp += spell.hp;

      // debuffs
      target.debuffs.push([spell, spell.dur]);
    } else {
    // don't let hero cast spell
    }
  };

  hero.tick = function() {
    for (var i = 0; i < hero.debuffs.length; i++) {
      if (hero.debuffs[i][1] > 0) {
        hero.hp -= hero.debuffs[i][0].dot;
        hero.debuffs[i][1]--;
      } else {
        hero.debuffs.splice(i,1);
      }
    }
    // for ( var i = 0; i < hero.buffs.length; i++) {
    //   if (hero.buffs[i][1] > 0) {
    //     hero.hp += hero.buffs[i][0].hot;
    //   }
    // }
  };



  extend(hero, gods[data]);
  return hero;
};

////////////////////////////////////////////////////////////
///  Data Definitions
////////////////////////////////////////////////////////////

// Gods
var zeus = {
  god: 'Zeus',
  hp: 1000,
  haste: 700,
  primary: 'lightning_strike',
  secondary: 'multibolt_strike',
  special: 'conjure_storm'
};

var hades = {
  god: 'Hades',
  hp: 1000,
  haste: 1000,
  primary: 'scythe_swipe',
  secondary: 'multibolt_strike',
  special: 'curse_of_affliction'
};

var isis = {
  god: 'Isis',
  hp: 750,
  haste: 750,
  primary: 'cobra_bite',
  secondary: 'restoration',
  special: 'entangle'
}

var gods = {
  zeus: zeus,
  hades: hades,
  isis: isis
};

var skills = {
  // Zeus
  lightning_strike: Skill({ap: 100, name: 'Lightning Strike'}),
  multibolt_strike: Skill({ap: 150, cd: 1, name: 'MultiBolt Strike'}),
  conjure_storm: Skill({ dot: 100, dur: 3, cd: 10, name: "Conjure Storm"}),
  // Hades
  scythe_swipe: Skill({ap: 100, name: "Scythe Swipe" }),
  cerberus_bite: Skill({ ap: 150, cd: 1, name: "Cerberus\' Bite" }),
  curse_of_affliction: Skill({ dot: 100, dur: 3, cd: 10, name: "Curse of Affliction"}),
  // Isis
  cobra_bite: Skill({ ap: 150, dur: 1, cd: 0, name: "Cobra Bite"}),
  restoration: Skill({ hp: 200, dur: 1, cd: 3, name: "Restoration"}),
  // Thor
  hammer_smash: Skill({ ap: 100, cd: 0, name: "Hammer Smash"}),
  thunder_charge: Skill({ apmod: 2, dur: 3, name: "Thunder Charge"})

};

////////////////////////////////////////////////////////////
///  Game Loop
////////////////////////////////////////////////////////////

var choice = prompt('pick hero');
document.getElementById('myP').innerHTML =
  ('You picked ' + choice + '!');

var hero = Hero(choice.toLowerCase());
var enemy = Hero('hades');
console.log(enemy.hp);
hero.cast(enemy, 'special');
enemy.tick();
console.log(enemy.hp);
