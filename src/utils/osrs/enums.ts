// OSRS and TempleOSRS command names
export enum OsrsCommands {
  GAINS = 'gains',
  RECORD = 'record',
}
// Command cooldowns
export enum CommandCooldowns {
  COMMAND_LIST = 60,
  BH = 30,
  CLUES = 30,
  KC = 30,
  LEAGUEPOINTS = 30,
  LMS = 30,
  LVL = 30,
  OSRSFETCH = 600,
  SOULWARS = 30,
  DATAPOINTS = 1800,
  GAINS = 30,
  RECORD = 30,
  TEMPLEFETCH = 600,
  TOPBOSS = 30,
  TOPSKILL = 30,
  GP_EARNED = 30,
  GP_SPENT = 30,
}

// TempleOSRS Player Overview Time Field Names
export enum TempleOverviewTimes {
  FIVEMIN = '5min',
  DAY = '1day',
  WEEK = '7days',
  MONTH = '31days',
  HALFYEAR = '186days',
  YEAR = '365days',
  ALLTIME = 'alltime',
}
// TempleOSRS Player Overview Time Field Aliases
export enum TempleOverviewTimeAliases {
  FIVEMIN = '5min',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  HALFYEAR = '6months',
  YEAR = 'year',
  ALLTIME = 'alltime',
}
// Valid cases for inputValidator
export enum ValidInputCases {
  CLUES = 'clues',
  BOSS = 'boss',
  SKILL = 'skill',
  OTHER = 'other',
}
// Types of TempleOSRS cache
export enum TempleCacheType {
  PLAYER_STATS = 'stats',
  PLAYER_NAMES = 'names',
  PLAYER_RECORDS = 'records',
  PLAYER_OVERVIEW_SKILL = 'skillgains',
  PLAYER_OVERVIEW_OTHER = 'othergains',
}
// Aliases for types of TempleOSRS cache
export enum TempleCacheTypeAliases {
  PLAYER_OVERVIEW_SKILL = 'skill gains',
  PLAYER_OVERVIEW_OTHER = 'other gains',
}
// TempleOSRS game modes
export enum TempleGameMode {
  MAIN = 0,
  IM = 1,
  UIM = 2,
  HCIM = 3,
}
// TempleOSRS game mode formatted
export enum TempleGameModeFormatted {
  IM = 'IM',
  UIM = 'UIM',
  HCIM = 'HCIM',
  NORMAL = '',
}
// TempleOSRS skiller or f2p check
export enum SkillerOrF2p {
  BOTH = 'Skiller and F2P',
  SKILLER = 'Level 3 skiller',
  F2P = 'F2P',
  NONE = 'None',
}

// Temple OSRS true or false values e.g if field F2P has 0 as value then this means that player isn't F2P
export enum TempleTrueOrFalse {
  TRUE = 1,
  FALSE = 0,
}
// Temple OSRS indexes - used in Player Overview data, each index represents a skill or boss/minigame
export enum TempleIndex {
  TOTAL = 0,
  ATT = 1,
  DEF = 2,
  STR = 3,
  HP = 4,
  RANGED = 5,
  PRAY = 6,
  MAGIC = 7,
  COOK = 8,
  WC = 9,
  FLETCH = 10,
  FISH = 11,
  FM = 12,
  CRAFT = 13,
  SMITH = 14,
  MINING = 15,
  HERB = 16,
  AGIL = 17,
  THIEV = 18,
  SLAYER = 19,
  FARM = 20,
  RC = 21,
  HUNT = 22,
  CON = 23,
  EHP = 24,
  CLUES_ALL = 25,
  CLUES_BEGINNER = 26,
  CLUES_EASY = 27,
  CLUES_MEDIUM = 28,
  CLUES_HARD = 29,
  CLUES_ELITE = 30,
  CLUES_MASTER = 31,
  LMS = 32,
  SIRE = 33,
  HYDRA = 34,
  BARROWS = 35,
  BRYOPHYTA = 36,
  CALLISTO = 37,
  CERBERUS = 38,
  COX = 39,
  COXCM = 40,
  CHAOS_ELE = 41,
  CHAOS_FANATIC = 42,
  ZILYANA = 43,
  CORP = 44,
  CRAZY_ARCH = 45,
  PRIME = 46,
  REX = 47,
  SUPREME = 48,
  DER_ARCH = 49,
  GRAARDOR = 50,
  MOLE = 51,
  GUARDIANS = 52,
  HESPORI = 53,
  KQ = 54,
  KBD = 55,
  KRAKEN = 56,
  KREE = 57,
  KRIL = 58,
  MIMIC = 59,
  OBOR = 60,
  SARACHNIS = 61,
  SCORPIA = 62,
  SKOTIZO = 63,
  GAUNTLET = 64,
  CORR_GAUNTLET = 65,
  TOB = 66,
  THERMY = 67,
  ZUK = 68,
  JAD = 69,
  VENE = 70,
  VETION = 71,
  VORKATH = 72,
  WT = 73,
  ZALCANO = 74,
  ZULRAH = 75,
  EHB = 76,
  IM_EHP = 79,
  NIGHTMARE = 82,
}
// OSRS other key names
export enum OsrsOther {
  BH_ROGUE = 'BH Rogue',
  BH_HUNTER = 'BH Hunter',
  LEAGUE = 'League Points',
  SOULWARS = 'Soul Wars Zeals',
}

// OSRS other key aliases
export enum OsrsOtherAliases {
  BH_ROGUE = 'rogue',
  BH_HUNTER = 'hunter',
}
// Temple OSRS other key names
export enum TempleOther {
  INFO = 'info',
  TABLE = 'table',
  DATE = 'Date',
  DATE_LOWERCASE = 'date',
  EHB = 'Ehb',
  EHP = 'Ehp',
  EHP_LOWERCASE = 'ehp',
  EHB_LOWERCASE = 'ehb',
  LMS = 'LMS',
  LMS_LOWERCASE = 'lms',
  IM_EHP = 'im_ehp',
  IM_EHP_JOINED = 'imehp',
  IM_EHP_CAPITAL = 'Im_ehp',
  IM_EHB = 'Im_ehb',
  F2P_EHP = 'F2p_ehp',
  LVL3_EHP = 'Lvl3_ehp',
  LAST_CHECKED = 'Last checked',
  LAST_CHANGED = 'Last changed',
  USERNAME = 'Username',
  COUNTRY = 'Country',
  GAME_MODE = 'Game mode',
  CB3 = 'Cb-3',
  F2P = 'F2p',
  CLAN_PREF = 'Clan preference',
  BANNED = 'Banned',
  DISQUALIFIED = 'Disqualified',
  LAST_CHECK_TEXT = 'last_check_text',
  HOURS_PLAYED = 'hours_played',
  HOURS_PER_DAY = 'hours_per_day',
  XP_GAINED = 'xp_gained',
  XP_PER_DAY = 'xp_per_day',
  AVR_XPH = 'avr_xph',
  TOP_SKILL = 'top_skill',
  GP_SPENT = 'gp_spent',
  BOSS_KILLS = 'boss_kills',
  KC_PER_DAY = 'kc_per_day',
  AVR_KCH = 'avr_kch',
  TOP_BOSS = 'top_boss',
  GP_EARNED = 'gp_earned',
  XP = 'xp',
  RANK = 'rank',
  LEVEL = 'level',
  NAME = 'name',
  LATS_DATE = 'last_date',
  FIRST_DATE = 'first_date',
  SECONDS = 'seconds',
  LAST_USED = 'last_used',
  LAST_USED_SECONDS = 'last_used_seconds',
  EHP_GAINED = 'ehp_gained',
  TIME_USED = 'time_used',
  HISTORY = 'history',
  HISTORY_SECONDS = 'total_history_seconds',
  ALIASES = 'aliases',
  SCORE = 'score',
  EXP = 'exp',
  SIX_HOURS = '6h',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}
// Clue names
export enum Clues {
  ALL = 'Clue_all',
  BEGINNER = 'Clue_beginner',
  EASY = 'Clue_easy',
  MEDIUM = 'Clue_medium',
  HARD = 'Clue_hard',
  ELITE = 'Clue_elite',
  MASTER = 'Clue_master',
}
// Clue aliases
export enum ClueAliases {
  ALL = 'all',
  BEGINNER = 'beginner',
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  ELITE = 'elite',
  MASTER = 'master',
}
// Formatted clue names
export enum ClueNamesFormatted {
  ALL = 'All Clues',
  BEGINNER = 'Beginner Clues',
  EASY = 'Easy Clues',
  MEDIUM = 'Medium Clues',
  HARD = 'Hard Clues',
  ELITE = 'Elite Clues',
  MASTER = 'Master Clues',
}
// OSRS boss names
export enum Bosses {
  SIRE = 'Abyssal Sire',
  HYDRA = 'Alchemical Hydra',
  BARROWS = 'Barrows Chests',
  BRYOPHYTA = 'Bryophyta',
  CALLISTO = 'Callisto',
  CERBERUS = 'Cerberus',
  COX = 'Chambers of Xeric',
  COXCM = 'Chambers of Xeric Challenge Mode',
  CHAOS_ELE = 'Chaos Elemental',
  CHAOS_FANATIC = 'Chaos Fanatic',
  ZILYANA = 'Commander Zilyana',
  CORP = 'Corporeal Beast',
  CRAZY_ARCH = 'Crazy Archaeologist',
  PRIME = 'Dagannoth Prime',
  REX = 'Dagannoth Rex',
  SUPREME = 'Dagannoth Supreme',
  DER_ARCH = 'Deranged Archaeologist',
  GRAARDOR = 'General Graardor',
  MOLE = 'Giant Mole',
  GUARDIANS = 'Grotesque Guardians',
  HESPORI = 'Hespori',
  KQ = 'Kalphite Queen',
  KBD = 'King Black Dragon',
  KRAKEN = 'Kraken',
  KREE = 'KreeArra',
  KRIL = 'Kril Tsutsaroth',
  MIMIC = 'Mimic',
  NIGHTMARE = 'The Nightmare',
  OBOR = 'Obor',
  SARACHNIS = 'Sarachnis',
  SCORPIA = 'Scorpia',
  SKOTIZO = 'Skotizo',
  TEMPO = 'Tempoross',
  GAUNTLET = 'The Gauntlet',
  CORR_GAUNTLET = 'The Corrupted Gauntlet',
  TOB = 'Theatre of Blood',
  THERMY = 'Thermonuclear Smoke Devil',
  ZUK = 'TzKal-Zuk',
  JAD = 'TzTok-Jad',
  VENE = 'Venenatis',
  VETION = 'Vetion',
  VORKATH = 'Vorkath',
  WT = 'Wintertodt',
  ZALCANO = 'Zalcano',
  ZULRAH = 'Zulrah',
}
// OSRS boss aliases
export enum BossAliases {
  SIRE_ALIAS1 = 'abyssalsire',
  SIRE_ALIAS2 = 'sire',
  HYDRA_ALIAS1 = 'alchemicalhydra',
  HYDRA_ALIAS2 = 'hydra',
  BARROWS_ALIAS1 = 'barrows',
  BRYOPHYTA_ALIAS1 = 'bryo',
  BRYOPHYTA_ALIAS2 = 'bryophyta',
  CALLISTO_ALIAS1 = 'callisto',
  CERBERUS_ALIAS1 = 'cerberus',
  CERBERUS_ALIAS2 = 'cerb',
  COX_ALIAS1 = 'cox',
  COX_ALIAS2 = 'chambersofxeric',
  COX_ALIAS3 = 'chambers',
  COXCM_ALIAS1 = 'cm',
  COXCM_ALIAS2 = 'coxcm',
  COXCM_ALIAS3 = 'challengemode',
  CHAOS_ELE_ALIAS1 = 'ele',
  CHAOS_ELE_ALIAS2 = 'chaosele',
  CHAOS_ELE_ALIAS3 = 'chaoselemental',
  CHAOS_FANATIC_ALIAS1 = 'chaosfanatic',
  CHAOS_FANATIC_ALIAS2 = 'fanatic',
  SARADOMIN_ALIAS1 = 'sara',
  SARADOMIN_ALIAS2 = 'saradomin',
  SARADOMIN_ALIAS3 = 'zilyana',
  SARADOMIN_ALIAS4 = 'zilly',
  CORP_ALIAS1 = 'corp',
  CORP_ALIAS2 = 'corporealbeast',
  CRAZY_ARCH_ALIAS1 = 'crazyarch',
  CRAZY_ARCH_ALIAS2 = 'crazyarcheologist',
  PRIME_ALIAS1 = 'prime',
  PRIME_ALIAS2 = 'dagannothprime',
  REX_ALIAS1 = 'rex',
  REX_ALIAS2 = 'dagannothrex',
  SUPREME_ALIAS1 = 'supreme',
  SUPREME_ALIAS2 = 'dagannothsupreme',
  DERANGED_ALIAS1 = 'derangedarcheologist',
  DERANGED_ALIAS2 = 'derangedarch',
  DERANGED_ALIAS3 = 'deranged',
  BANDOS_ALIAS1 = 'graardor',
  BANDOS_ALIAS2 = 'bandos',
  BANDOS_ALIAS3 = 'generalgraardor',
  MOLE_ALIAS1 = 'mole',
  MOLE_ALIAS2 = 'giantmole',
  GUARDIANS_ALIAS1 = 'guardians',
  GUARDIANS_ALIAS2 = 'gg',
  GUARDIANS_ALIAS3 = 'grotesque',
  GUARDIANS_ALIAS4 = 'noon',
  GUARDIANS_ALIAS5 = 'dusk',
  HESPORI_ALIAS1 = 'hespori',
  KQ_ALIAS1 = 'kq',
  KQ_ALIAS2 = 'kalphite',
  KQ_ALIAS3 = 'kalphitequeen',
  KBD_ALIAS1 = 'kbd',
  KBD_ALIAS2 = 'kingblackdragon',
  KRAKEN_ALIAS1 = 'kraken',
  ARMA_ALIAS1 = 'kree',
  ARMA_ALIAS2 = `kree'arra`,
  ARMA_ALIAS3 = 'kreearra',
  ARMA_ALIAS4 = 'arma',
  ARMA_ALIAS5 = 'armadyl',
  ZAMMY_ALIAS1 = `k'ril`,
  ZAMMY_ALIAS2 = 'kril',
  ZAMMY_ALIAS3 = 'kriltsutsaroth',
  ZAMMY_ALIAS4 = 'zamorak',
  ZAMMY_ALIAS5 = 'zammy',
  MIMIC_ALIAS1 = 'mimic',
  NIGHTMARE_ALIAS1 = 'nightmare',
  OBOR_ALIAS1 = 'obor',
  SARACHNIS_ALIAS1 = 'sarachnis',
  SCORPIA_ALIAS1 = 'scorpia',
  SKOTIZO_ALIAS1 = 'skotizo',
  TEMPOROSS_ALIAS1 = 'tempoross',
  TEMPOROSS_ALIAS2 = 'temp',
  GAUNTLET_ALIAS1 = 'gauntlet',
  GAUNTLET_ALIAS2 = 'hunllef',
  CORR_GAUNTLET_ALIAS1 = 'corrgauntlet',
  CORR_GAUNTLET_ALIAS2 = 'corruptedgauntlet',
  CORR_GAUNTLET_ALIAS3 = 'corr',
  CORR_GAUNTLET_ALIAS4 = 'corrupted',
  CORR_GAUNTLET_ALIAS5 = 'corrhunllef',
  TOB_ALIAS1 = 'tob',
  TOB_ALIAS2 = 'theatre',
  TOB_ALIAS3 = 'theatreofblood',
  THERMY_ALIAS1 = 'thermy',
  THERMY_ALIAS2 = 'thermonuclear',
  THERMY_ALIAS3 = 'thermonuclearsmokedevil',
  ZUK_ALIAS1 = 'zuk',
  ZUK_ALIAS2 = 'inferno',
  JAD_ALIAS1 = 'jad',
  JAD_ALIAS2 = 'fightcaves',
  VENE_ALIAS1 = 'vene',
  VENE_ALIAS2 = 'venenatis',
  VETION_ALIAS1 = 'vetion',
  VORK_ALIAS1 = 'vork',
  VORK_ALIAS2 = 'vorkath',
  WT_ALIAS1 = 'wt',
  WT_ALIAS2 = 'wintertodt',
  ZALC_ALIAS1 = 'zalc',
  ZALC_ALIAS2 = 'zalcano',
  ZULRAH_ALIAS1 = 'zulrah',
}
// BossCases used in bossValidator
export enum BossCases {
  INVALID = 0,
  ONE_WORD = 1,
  TWO_WORD = 2,
  THREE_WORDS = 3,
  EDGE_CASE = 4,
}
// OSRS sKill names
export enum Skills {
  TOTAL = 'Overall',
  ATT = 'Attack',
  DEF = 'Defence',
  STR = 'Strength',
  HP = 'Hitpoints',
  RANGED = 'Ranged',
  PRAY = 'Prayer',
  MAGIC = 'Magic',
  COOK = 'Cooking',
  WC = 'Woodcutting',
  FLETCH = 'Fletching',
  FISH = 'Fishing',
  FM = 'Firemaking',
  CRAFT = 'Crafting',
  SMITH = 'Smithing',
  MINING = 'Mining',
  HERB = 'Herblore',
  AGIL = 'Agility',
  THIEV = 'Thieving',
  SLAYER = 'Slayer',
  FARM = 'Farming',
  RC = 'Runecraft',
  HUNT = 'Hunter',
  CON = 'Construction',
}
// OSRS skill aliases
export enum SkillAliases {
  TOTAL_ALIAS1 = 'total',
  TOTAL_ALIAS2 = 'overall',
  ATTACK_ALIAS1 = 'attack',
  ATTACK_ALIAS2 = 'att',
  DEFENCE_ALIAS1 = 'defence',
  DEFENCE_ALIAS2 = 'def',
  STRENGTH_ALIAS1 = 'strength',
  STRENGTH_ALIAS2 = 'str',
  HP_ALIAS1 = 'hitpoints',
  HP_ALIAS2 = 'hp',
  RANGED_ALIAS1 = 'ranged',
  RANGED_ALIAS2 = 'range',
  PRAYER_ALIAS1 = 'prayer',
  PRAYER_ALIAS2 = 'pray',
  MAGIC_ALIAS1 = 'magic',
  MAGIC_ALIAS2 = 'mage',
  COOKING_ALIAS1 = 'cooking',
  COOKING_ALIAS2 = 'cook',
  WC_ALIAS1 = 'woodcutting',
  WC_ALIAS2 = 'wc',
  FLETCH_ALIAS1 = 'fletching',
  FLETCH_ALIAS2 = 'fletch',
  FISH_ALIAS1 = 'fishing',
  FISH_ALIAS2 = 'fish',
  FM_ALIAS1 = 'firemaking',
  FM_ALIAS2 = 'firemake',
  FM_ALIAS3 = 'fm',
  CRAFT_ALIAS1 = 'crafting',
  CRAFT_ALIAS2 = 'craft',
  SMITH_ALIAS1 = 'smithing',
  SMITH_ALIAS2 = 'smith',
  MINING_ALIAS1 = 'mining',
  MINING_ALIAS2 = 'mine',
  HERB_ALIAS1 = 'herblore',
  HERB_ALIAS2 = 'herb',
  AGIL_ALIAS1 = 'agility',
  AGIL_ALIAS2 = 'agil',
  THIEV_ALIAS1 = 'thieving',
  THIEV_ALIAS2 = 'thiev',
  SLAY_ALIAS1 = 'slayer',
  SLAY_ALIAS2 = 'slay',
  FARM_ALIAS1 = 'farming',
  FARM_ALIAS2 = 'farm',
  RC_ALIAS1 = 'runecrafting',
  RC_ALIAS2 = 'runecraft',
  RC_ALIAS3 = 'rc',
  HUNT_ALIAS1 = 'hunter',
  HUNT_ALIAS2 = 'hunt',
  CONSTR_ALIAS1 = 'construction',
  CONSTR_ALIAS2 = 'const',
  CONSTR_ALIAS3 = 'con',
  CONSTR_ALIAS4 = 'constr',
}
// Random OSRS enums
export enum OsrsRandom {
  RUNECRAFTING = 'Runecrafting',
  EXP_LONG = 'Experience',
  LVL_SHORT = 'lvl',
  KILLS = 'kills',
  SKILL = 'skill',
  BOSS = 'boss',
  GP_EARNED = 'Estimated GP earned',
  GP_SPENT = 'Estimated GP spent',
  TIME_PERIOD = 'TIME PERIOD',
  NO_DATA = 'NO DATA',
}
