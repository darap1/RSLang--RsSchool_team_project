import { IGameStatistics, IStatistics, ICommonShortStat, IGameShortStat } from '../../models/interfaces';
import { GameType, EMPTY_GAME_DATA } from '../constants';

const longestStreak = (statuses: boolean[]) => {
  let i = 0;
  let j = 0;
  let maxLength = 0;
  statuses.forEach((status, k) => {
    if (status === true) {
      j += 1;
      if (j - i > maxLength) {
        maxLength = j - i;
      }
    } else {
      i = k;
      j = k;
    }
  });
  return maxLength;
};

const createEmptyStatistics = (): IStatistics => {
  return {
    learnedWords: 0,
    optional: {
      games: {},
      deltaComplete: {},
    },
  };
};

const dateToString = (date: Date): string => {
  return date.toJSON().slice(0, 10);
};

const iterLastNDays = (n: number, d = new Date()) => {
  d.setDate(d.getDate() - n);
  const lastNDays: string[] = [];
  for (let i = 0; i < n; i += 1) {
    d.setDate(d.getDate() + 1);
    lastNDays.push(dateToString(d));
  }
  return lastNDays;
};

const getDayShortStat = (stat: IStatistics): ICommonShortStat => {
  let newWords = 0;
  let correctAnswers = 0;
  let total = 0;
  const date = dateToString(new Date());
  if (stat && 'optional' in stat && 'games' in stat.optional) {
    for (const gameName in stat.optional.games) {
      if (date in stat.optional.games[gameName]) {
        const obj: IGameStatistics = stat.optional.games[gameName][date];
        newWords += obj.nNew;
        correctAnswers += obj.nCorrect;
        total += obj.nTotal;
      }
    }
  }

  return {
    nNew: newWords,
    nStudy: stat.optional.deltaComplete[date] || 0,
    correctAnswers: Math.round((correctAnswers / total) * 100),
  };
};

const getGameShortStat = (stat: IStatistics, gameName: GameType): IGameShortStat => {
  const date = dateToString(new Date());
  if (stat && 'optional' in stat && gameName in stat.optional.games && date in stat.optional.games[gameName]) {
    const gameStat = stat?.optional?.games[gameName][date];
    console.log(gameStat);
    const correctAnswers = gameStat?.nCorrect || 0;
    const total = gameStat?.nTotal || 1;
    return {
      nNew: gameStat.nNew || 0,
      correctAnswers: correctAnswers ? Math.round((correctAnswers / total) * 100) : -1,
      streak: gameStat?.streak || 0,
    };
  }
  return {
    nNew: 0,
    correctAnswers: EMPTY_GAME_DATA,
    streak: 0,
  };
};

export { longestStreak, createEmptyStatistics, dateToString, iterLastNDays, getDayShortStat, getGameShortStat };