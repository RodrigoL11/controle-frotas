interface IHistoric{
  id: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      SignIn: undefined;
      Historic: IHistoric;
    }
  }
}
