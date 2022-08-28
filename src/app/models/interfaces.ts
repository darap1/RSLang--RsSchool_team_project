interface IApiWords {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord: IUserWord;
}

interface IUserAuth {
  isAuth?: boolean;
  name?: string;
  token?: string;
  userId?: string;
  refreshToken?: string;
  message?: string;
  email?: string;
  password?: string;
}

interface IUserWord {
  difficulty: string;
  id: string;
  wordId: string;
  optional: {
    study: boolean;
  };
}

type TotalCount = {
  count: number;
};

interface IPaginatedResults {
  _id: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  userWord: {
    difficulty: string;
    optional: {
      study: boolean;
    };
  };
  word: string;
  wordTranslate: string;
}

interface IUserAggregatedWords {
  paginatedResults: Array<IPaginatedResults>;
  sources: Array<TotalCount>;
}

export { IApiWords, IUserAuth, IUserWord, IUserAggregatedWords, IPaginatedResults };